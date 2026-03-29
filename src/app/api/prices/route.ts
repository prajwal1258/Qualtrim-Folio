import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbolsString = searchParams.get('symbols');

    if (!symbolsString) {
        return NextResponse.json({ error: 'No symbols provided' }, { status: 400 });
    }

    const symbols = symbolsString.split(',');

    try {
        console.log(`[API] Syncing live data for: ${symbols.join(', ')}`);

        // Fetch each symbol individually since v8/chart doesn't support batching
        const priceData = await Promise.all(symbols.map(async (symbol) => {
            const cleanSymbol = symbol.trim().toUpperCase();
            try {
                // Try Yahoo first with suffixes if needed
                const symbolAttempts = [cleanSymbol];
                // If it looks like an Indian stock and has no suffix, try .NS
                if (!cleanSymbol.includes('.') && cleanSymbol.length >= 3) {
                    symbolAttempts.push(`${cleanSymbol}.NS`);
                }

                for (const currentSymbol of symbolAttempts) {
                    const yahooEndpoints = [
                        `https://query1.finance.yahoo.com/v8/finance/chart/${currentSymbol}?interval=1m&range=1d&t=${Date.now()}`,
                        `https://query2.finance.yahoo.com/v8/finance/chart/${currentSymbol}?interval=1m&range=1d&t=${Date.now()}`
                    ];

                    for (const url of yahooEndpoints) {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 3000);

                        try {
                            const response = await fetch(url, {
                                headers: {
                                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                                    'Cache-Control': 'no-cache',
                                },
                                signal: controller.signal,
                                next: { revalidate: 0 },
                            });

                            clearTimeout(timeoutId);

                            if (response.ok) {
                                const data = await response.json();
                                const meta = data.chart?.result?.[0]?.meta;

                                if (meta && (meta.regularMarketPrice || meta.chartPreviousClose)) {
                                    const price = meta.regularMarketPrice || meta.chartPreviousClose;
                                    const prevClose = meta.previousClose || meta.chartPreviousClose;
                                    const changePcnt = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

                                    return {
                                        symbol: cleanSymbol,
                                        actualSymbol: currentSymbol,
                                        price: Number(price),
                                        change: Number(changePcnt),
                                        name: meta.longName || meta.shortName || cleanSymbol,
                                        currency: meta.currency || 'USD',
                                        source: 'yahoo',
                                        isDelayed: meta.dataGranularity !== '1m'
                                    };
                                }
                            }
                        } catch (e: any) {
                            clearTimeout(timeoutId);
                        }
                    }
                }

                // Final Fallback: Finnhub (US stocks only typically)
                const FINNHUB_KEY = 'd2i31g1r01qucbnmt8ugd2i31g1r01qucbnmt8v0';
                try {
                    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${cleanSymbol}&token=${FINNHUB_KEY}`, {
                        cache: 'no-store'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data.c && data.c !== 0) {
                            return {
                                symbol: cleanSymbol,
                                price: Number(data.c),
                                change: Number(data.dp || 0),
                                name: cleanSymbol,
                                currency: 'USD',
                                source: 'finnhub'
                            };
                        }
                    }
                } catch (e) {
                    console.error(`[API] Finnhub fallback failed for ${cleanSymbol}`);
                }

                return null;
            } catch (err) {
                console.error(`[API] Error processing ${cleanSymbol}:`, err);
                return null;
            }
        }));

        const priceMap = priceData.reduce((acc: any, data) => {
            if (data) {
                acc[data.symbol] = data;
            }
            return acc;
        }, {});

        return NextResponse.json(priceMap);
    } catch (error) {
        console.error('[API] Core sync error:', error);
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
