'use client'

import React, { useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { usePortfolio } from '@/context/PortfolioContext'
import {
    TrendingUp, TrendingDown,
    PieChart as PieChartIcon, BarChart3, Globe, AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'
import Sidebar from '@/components/Sidebar'

const COLORS = ['#FFFFFF', '#A1A1AA', '#52525B', '#27272A', '#18181B']

export default function Analytics() {
    const { user, logout } = useAuth()
    const { holdings, totalValue, totalGain, dayChange } = usePortfolio()

    // Mock Historical Data for Performance Chart
    const performanceData = useMemo(() => [
        { name: 'Jan', value: totalValue * 0.85 },
        { name: 'Feb', value: totalValue * 0.88 },
        { name: 'Mar', value: totalValue * 0.92 },
        { name: 'Apr', value: totalValue * 0.90 },
        { name: 'May', value: totalValue * 0.95 },
        { name: 'Jun', value: totalValue },
    ], [totalValue])

    // Calculate Sector Allocation (Mock categories for now)
    const sectorData = useMemo(() => {
        const sectors: Record<string, number> = {}
        holdings.forEach(h => {
            // Assigning mock sectors based on common symbols
            let sector = 'Others'
            if (['AAPL', 'MSFT', 'NVDA', 'TSLA', 'GOOGL'].includes(h.symbol)) sector = 'Technology'
            else if (['RELIANCE.NS', 'HINDALCO.NS'].includes(h.symbol)) sector = 'Manufacturing'

            sectors[sector] = (sectors[sector] || 0) + (h.quantity * h.currentPrice)
        })
        return Object.entries(sectors).map(([name, value]) => ({ name, value }))
    }, [holdings])

    // Concentration Risk calculation
    const concentrationRisk = useMemo(() => {
        if (holdings.length === 0) return []
        return holdings
            .map(h => ({
                symbol: h.symbol,
                weight: ((h.quantity * h.currentPrice) / totalValue) * 100
            }))
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 3)
    }, [holdings, totalValue])

    return (
        <div className="flex h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-light selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10">
                <header className="mb-10">
                    <h2 className="text-3xl tracking-tighter mb-1">Portfolio Analytics</h2>
                    <p className="text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest italic">"In God we trust, all others must bring data." — Qualtrim AI</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                    {/* Performance History Chart */}
                    <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl tracking-tighter">Growth Trajectory</h3>
                                <p className="text-xs text-black/40 dark:text-white/40 uppercase tracking-widest">Global Performance Trend (6M)</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                <p className="text-[10px] text-emerald-400">+{dayChange.toFixed(2)}% Active</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#ffffff30"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#ffffff30"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0D0D0D', border: '1px solid #ffffff10', borderRadius: '4px' }}
                                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                                        labelStyle={{ color: '#ffffff40', fontSize: '10px', marginBottom: '4px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#FFFFFF"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sector Allocation */}
                    <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl tracking-tighter">Asset Distribution</h3>
                            <p className="text-xs text-black/40 dark:text-white/40 uppercase tracking-widest">Diversification by Industry</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-full h-[250px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={sectorData}
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {sectorData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0D0D0D', border: '1px solid #ffffff10', borderRadius: '4px' }}
                                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Total</span>
                                    <span className="text-lg tracking-tighter">${(totalValue / 1000).toFixed(1)}k</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {sectorData.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-[10px] uppercase tracking-wider text-black/60 dark:text-white/60">{item.name}</span>
                                    <span className="text-[10px] ml-auto font-medium">
                                        {((item.value / totalValue) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Concentration Risk */}
                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle size={18} className="text-black/40 dark:text-white/40" />
                            <h4 className="text-sm uppercase tracking-widest font-medium">Concentration Risk</h4>
                        </div>
                        <div className="space-y-4">
                            {concentrationRisk.map(item => (
                                <div key={item.symbol} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-black/60 dark:text-white/60">{item.symbol}</span>
                                        <span>{item.weight.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-black/40 dark:bg-white/40 rounded-full"
                                            style={{ width: `${item.weight}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-[10px] text-black/30 dark:text-white/30 uppercase leading-relaxed">
                            A highly concentrated portfolio can increase volatility and systemic risk.
                        </p>
                    </div>

                    {/* Efficiency Metric */}
                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp size={18} className="text-black/40 dark:text-white/40" />
                                <h4 className="text-sm uppercase tracking-widest font-medium">Sharpe Ratio</h4>
                            </div>
                            <h5 className="text-4xl tracking-tighter mb-2">2.41</h5>
                            <p className="text-[10px] text-emerald-400 uppercase tracking-widest">Excellent Efficiency</p>
                        </div>
                        <p className="mt-6 text-[10px] text-black/30 dark:text-white/30 uppercase leading-relaxed">
                            Measures the risk-adjusted return of an investment portfolio.
                        </p>
                    </div>

                    {/* Global Footprint */}
                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe size={18} className="text-black/40 dark:text-white/40" />
                            <h4 className="text-sm uppercase tracking-widest font-medium">Regional Exposure</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-black/60 dark:text-white/60 uppercase tracking-wider">North America</span>
                                <span className="font-medium">65%</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-black/60 dark:text-white/60 uppercase tracking-wider">Asia Pacific</span>
                                <span className="font-medium">35%</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-black/20 dark:text-white/20">
                                <span className="uppercase tracking-wider">Europe</span>
                                <span>0%</span>
                            </div>
                        </div>
                        <p className="mt-6 text-[10px] text-black/30 dark:text-white/30 uppercase leading-relaxed">
                            Diversifying across regions protects your capital from localized downturns.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
