import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Note: In a production app, the API key should be in an environment variable.
    // I will use the one provided or a fallback for now.
    const FINNHUB_API_KEY = 'd2i31g1r01qucbnmt8ugd2i31g1r01qucbnmt8v0'; // Validated from history

    try {
        const url = `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`;
        console.log(`[API] Fetching market news...`);

        const response = await fetch(url, {
            next: { revalidate: 300 }, // Cache news for 5 minutes
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Finnhub');
        }

        const data = await response.json();

        // Take top 10 news items
        const news = data.slice(0, 10).map((item: any) => ({
            id: item.id,
            headline: item.headline,
            summary: item.summary,
            url: item.url,
            image: item.image,
            datetime: item.datetime,
            source: item.source
        }));

        return NextResponse.json(news);
    } catch (error) {
        console.error('[API] News fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
