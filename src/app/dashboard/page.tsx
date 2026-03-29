'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { usePortfolio, Stock } from '@/context/PortfolioContext'
import {
    TrendingUp, TrendingDown, Plus, Edit2, Trash2,
    Search, Eye, X, RefreshCcw, Newspaper,
    ExternalLink, Calendar
} from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'

interface NewsItem {
    id: number;
    headline: string;
    summary: string;
    url: string;
    image: string;
    datetime: number;
    source: string;
}

export default function Dashboard() {
    const { user, logout } = useAuth()
    const {
        holdings, totalValue, totalGain, dayChange,
        deleteStock, addStock, editStock, watchlist,
        refreshPrices, lastUpdated, isRefreshing
    } = usePortfolio()

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [editingStock, setEditingStock] = useState<Stock | null>(null)

    const [formData, setFormData] = useState({ symbol: '', name: '', quantity: 0, avgPrice: 0 })
    const [news, setNews] = useState<NewsItem[]>([])
    const [isNewsLoading, setIsNewsLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();
                setNews(data);
            } catch (err) {
                console.error('News error:', err);
            } finally {
                setIsNewsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addStock({ ...formData, quantity: Number(formData.quantity), avgPrice: Number(formData.avgPrice) })
        setFormData({ symbol: '', name: '', quantity: 0, avgPrice: 0 })
        setIsAddModalOpen(false)
    }

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingStock) {
            editStock(editingStock.id, {
                ...formData,
                quantity: Number(formData.quantity),
                avgPrice: Number(formData.avgPrice)
            })
            setEditingStock(null)
        }
    }

    const openEditModal = (stock: Stock) => {
        setEditingStock(stock)
        setFormData({
            symbol: stock.symbol,
            name: stock.name,
            quantity: stock.quantity,
            avgPrice: stock.avgPrice
        })
    }

    return (
        <div className="flex h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-light selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl tracking-tighter mb-1">Portfolio Overview</h2>
                        <div className="flex items-center gap-4 text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest">
                            <span className="italic">"Intelligence is the ability to adapt to change." — Qualtrim AI</span>
                            {lastUpdated && (
                                <div className="flex items-center gap-2 border-l border-black/10 dark:border-white/10 pl-4">
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                    <span>Last Live sync: {lastUpdated.toLocaleTimeString()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => refreshPrices()}
                            disabled={isRefreshing}
                            className={`p-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${isRefreshing ? 'opacity-50' : ''}`}
                            title="Sync market prices"
                        >
                            <RefreshCcw size={16} className={`${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/20" size={16} />
                            <input
                                type="text"
                                placeholder="Search symbol..."
                                className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 w-64 transition-colors"
                            />
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm">
                        <p className="text-xs uppercase tracking-widest text-black/20 dark:text-white/20 mb-2">Total Value</p>
                        <h3 className="text-4xl tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                        <div className="flex items-center gap-1 text-emerald-400 mt-2 text-xs">
                            <TrendingUp size={14} />
                            <span>+{dayChange.toFixed(2)}% ($1,240.50 Today)</span>
                        </div>
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm">
                        <p className="text-xs uppercase tracking-widest text-black/20 dark:text-white/20 mb-2">Total Returns</p>
                        <h3 className={`text-4xl tracking-tighter ${totalGain >= 0 ? '' : 'text-red-400'}`}>
                            ${Math.abs(totalGain).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h3>
                        <p className="text-black/40 dark:text-white/40 mt-2 text-xs uppercase tracking-widest">Since Inception</p>
                    </div>
                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm">
                        <p className="text-xs uppercase tracking-widest text-black/20 dark:text-white/20 mb-2">Buying Power</p>
                        <h3 className="text-4xl tracking-tighter">$4,250.00</h3>
                        <p className="text-black/40 dark:text-white/40 mt-2 text-xs uppercase tracking-widest underline decoration-black/20 dark:decoration-white/20 underline-offset-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors">Deposit Funds</p>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {/* Holdings Section */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl tracking-tighter">Your Holdings</h3>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-sm hover:opacity-90 transition-all active:scale-95"
                            >
                                <Plus size={16} />
                                Add Stock
                            </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-[#0D0D0D] border border-black/10 dark:border-white/10 rounded-sm overflow-hidden transition-colors">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-black/10 dark:border-white/10 text-black/20 dark:text-white/20 text-[10px] uppercase tracking-widest">
                                        <th className="px-6 py-4 font-medium">Asset</th>
                                        <th className="px-6 py-4 font-medium">Qty</th>
                                        <th className="px-6 py-4 font-medium">Avg Price</th>
                                        <th className="px-6 py-4 font-medium">Market Price</th>
                                        <th className="px-6 py-4 font-medium">P&L</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holdings.map((stock) => {
                                        const pl = (stock.currentPrice - stock.avgPrice) * stock.quantity
                                        const plPercent = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100
                                        const currency = stock.currency || 'USD'
                                        const format = (val: number) => new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
                                            style: 'currency', currency
                                        }).format(val)

                                        return (
                                            <tr key={stock.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] group transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <p className="font-medium tracking-tight">{stock.symbol}</p>
                                                            <p className="text-[10px] text-black/40 dark:text-white/40 uppercase">{stock.name}</p>
                                                        </div>
                                                        {stock.isDelayed && (
                                                            <span className="text-[8px] bg-yellow-500/10 text-yellow-500/60 px-1 rounded" title="Delayed Data">15m+</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 font-light text-black/60 dark:text-white/60">{stock.quantity}</td>
                                                <td className="px-6 py-5 font-light text-black/60 dark:text-white/60">{format(stock.avgPrice)}</td>
                                                <td className="px-6 py-5 font-light text-black/60 dark:text-white/60">
                                                    <div className="flex flex-col">
                                                        <span>{format(stock.currentPrice)}</span>
                                                        <span className="text-[8px] text-black/20 dark:text-white/20 uppercase tracking-tighter">{stock.source || 'Syncing...'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className={pl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                                                        {pl >= 0 ? '+' : ''}{format(pl)}
                                                    </p>
                                                    <p className={`text-[10px] ${pl >= 0 ? 'text-emerald-400/50' : 'text-red-400/50'}`}>
                                                        {pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="inline-flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => openEditModal(stock)}
                                                            className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteStock(stock.id)}
                                                            className="p-1.5 hover:bg-red-500/10 rounded-sm text-red-500/40 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Market News & Watchlist */}
                    <div className="space-y-10">
                        {/* Watchlist Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl tracking-tighter px-1">Watchlist</h3>
                            <div className="space-y-4">
                                {watchlist.map((item) => {
                                    const currency = item.currency || 'USD'
                                    const format = (val: number) => new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
                                        style: 'currency', currency
                                    }).format(val)

                                    return (
                                        <div key={item.symbol} className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer group">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="font-medium tracking-tight group-hover:underline underline-offset-4 decoration-black/20 dark:decoration-white/20">{item.symbol}</p>
                                                <p className="font-medium tracking-tight">{format(item.price)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] text-black/40 dark:text-white/40 uppercase text-xs">{item.name}</p>
                                                    <span className="text-[8px] text-black/20 dark:text-white/20 uppercase">{item.source}</span>
                                                </div>
                                                <p className={`text-[10px] ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="p-4 border border-dashed border-black/10 dark:border-white/10 rounded-sm flex items-center justify-center text-black/20 dark:text-white/20 hover:text-black/40 dark:hover:text-white/40 transition-colors cursor-pointer group">
                                    <div className="flex flex-col items-center gap-2">
                                        <Plus size={20} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] uppercase tracking-widest">Explore More Assets</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* News Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 px-1">
                                <Newspaper size={18} className="text-black/40 dark:text-white/40" />
                                <h3 className="text-xl tracking-tighter">Market Pulse</h3>
                            </div>

                            <div className="space-y-4">
                                {isNewsLoading ? (
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm animate-pulse">
                                            <div className="h-3 bg-black/10 dark:bg-white/10 w-3/4 mb-3 rounded-full" />
                                            <div className="h-2 bg-black/5 dark:bg-white/5 w-1/2 rounded-full" />
                                        </div>
                                    ))
                                ) : (
                                    news.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all group"
                                        >
                                            <p className="text-xs font-medium leading-relaxed mb-2 line-clamp-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                                                {item.headline}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] uppercase tracking-widest text-black/30 dark:text-white/30">{item.source}</span>
                                                <ExternalLink size={10} className="text-black/20 dark:text-white/20 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors" />
                                            </div>
                                        </a>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            {(isAddModalOpen || editingStock) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-white dark:bg-[#0D0D0D] border border-black/10 dark:border-white/10 p-8 rounded-sm animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl tracking-tighter">
                                {editingStock ? 'Edit Holding' : 'Add New Asset'}
                            </h3>
                            <button
                                onClick={() => { setIsAddModalOpen(false); setEditingStock(null); }}
                                className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={editingStock ? handleEditSubmit : handleAddSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Symbol</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.symbol}
                                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                                    placeholder="AAPL"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Asset Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                                    placeholder="Apple Inc."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        step="any"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Avg Price</label>
                                    <input
                                        type="number"
                                        required
                                        step="any"
                                        value={formData.avgPrice}
                                        onChange={(e) => setFormData({ ...formData, avgPrice: Number(e.target.value) })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-all active:scale-[0.98] rounded-sm mt-4"
                            >
                                {editingStock ? 'Save Changes' : 'Add to Portfolio'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
