'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from 'next-themes'
import {
    LayoutDashboard, LineChart, Wallet, Settings as SettingsIcon,
    LogOut, User as UserIcon, Moon, Sun,
    Monitor, Globe, Lock, Cpu, Database,
    Zap, RefreshCcw, BellRing, Diamond
} from 'lucide-react'
import Link from 'next/link'

export default function Settings() {
    const { user, logout } = useAuth()
    const [activeTab, setActiveTab] = useState('general')
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const [settings, setSettings] = useState({
        refreshInterval: '30s',
        dataSaving: true,
        aiInsights: true,
        experimentalFeatures: false,
        apiLatency: 'optimized'
    })

    const tabs = [
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'appearance', label: 'Appearance', icon: Moon },
        { id: 'network', label: 'Data & Sync', icon: RefreshCcw },
        { id: 'advanced', label: 'Engine', icon: Cpu },
    ]

    return (
        <div className="flex h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-light selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 border-r border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#0D0D0D] flex flex-col p-6 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                        <div className="w-8 h-8 border-[1.5px] border-black/20 dark:border-white/20 rotate-45 rounded-[2px] absolute group-hover:rotate-90 group-hover:border-black/40 dark:group-hover:border-white/40 transition-all duration-500" />
                        <Diamond size={14} className="text-black dark:text-white fill-black dark:fill-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="font-medium tracking-tighter text-xl ml-1">Qualtrim</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-sm transition-colors">
                        <LayoutDashboard size={18} />
                        <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link href="/analytics" className="w-full flex items-center gap-3 px-3 py-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-sm transition-colors">
                        <LineChart size={18} />
                        <span className="text-sm">Analytics</span>
                    </Link>
                    <Link href="/account" className="w-full flex items-center gap-3 px-3 py-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-sm transition-colors">
                        <Wallet size={18} />
                        <span className="text-sm">Account</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-sm transition-colors">
                        <SettingsIcon size={18} className="text-black/60 dark:text-white/60" />
                        <span className="text-sm">Settings</span>
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
                    <div className="flex items-center gap-3 px-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center transition-colors">
                            <UserIcon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{user?.fullName || 'Guest'}</p>
                            <p className="text-[10px] text-black/40 dark:text-white/40 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-sm transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10">
                <header className="mb-10">
                    <h2 className="text-3xl tracking-tighter mb-1">System Preferences</h2>
                    <p className="text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest italic transition-colors">Configure your workspace environment.</p>
                </header>

                <div className="max-w-4xl">
                    <div className="flex gap-10">
                        {/* Internal Nav */}
                        <div className="w-48 shrink-0 flex flex-col gap-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all ${activeTab === tab.id
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <tab.icon size={16} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Settings Panels */}
                        <div className="flex-1 space-y-8">
                            {activeTab === 'general' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <h3 className="text-xl tracking-tighter border-b border-black/5 dark:border-white/5 pb-4 transition-colors">Application Environment</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center transition-colors">
                                                    <Zap size={20} className="text-black/40 dark:text-white/40" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">AI Smart Insights</p>
                                                    <p className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest transition-colors">Powered by Qualtrim Engine</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`w-12 h-6 rounded-full transition-colors relative ${settings.aiInsights ? 'bg-black dark:bg-white' : 'bg-black/10 dark:bg-white/10'}`}
                                                onClick={() => setSettings({ ...settings, aiInsights: !settings.aiInsights })}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${settings.aiInsights ? 'right-1 bg-white dark:bg-black' : 'left-1 bg-black/40 dark:bg-white/40'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm opacity-50 cursor-not-allowed transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center transition-colors">
                                                    <Lock size={20} className="text-black/20 dark:text-white/20" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium italic">Advanced Encryption Mode</p>
                                                    <p className="text-[10px] text-black/20 dark:text-white/20 uppercase tracking-widest transition-colors">Enterprise Feature</p>
                                                </div>
                                            </div>
                                            <div className="text-[10px] uppercase border border-black/10 dark:border-white/10 px-2 py-1 rounded-sm text-black/20 dark:text-white/20 transition-colors">Upgrade</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'appearance' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <h3 className="text-xl tracking-tighter border-b border-black/5 dark:border-white/5 pb-4 transition-colors">Visual Interface</h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        {mounted && ['light', 'dark', 'system'].map(mode => (
                                            <button
                                                key={mode}
                                                onClick={() => setTheme(mode)}
                                                className={`p-6 border rounded-sm flex flex-col items-center gap-3 transition-all ${theme === mode
                                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                                    : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:border-black/30 dark:hover:border-white/30'
                                                    }`}
                                            >
                                                {mode === 'light' && <Sun size={24} />}
                                                {mode === 'dark' && <Moon size={24} />}
                                                {mode === 'system' && <Monitor size={24} />}
                                                <span className="text-[10px] uppercase tracking-widest font-medium">{mode}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'network' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <h3 className="text-xl tracking-tighter border-b border-black/5 dark:border-white/5 pb-4 transition-colors">Market Synchronization</h3>

                                    <div className="space-y-2">
                                        <label className="text-[10px] tracking-widest uppercase text-black/40 dark:text-white/40 transition-colors">Market Heartbeat Interval</label>
                                        <select
                                            value={settings.refreshInterval}
                                            onChange={(e) => setSettings({ ...settings, refreshInterval: e.target.value })}
                                            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-4 rounded-sm appearance-none focus:outline-none focus:border-black/30 dark:focus:border-white/30 text-sm transition-colors"
                                        >
                                            <option value="15s">15 Seconds (Real-time Plus)</option>
                                            <option value="30s">30 Seconds (Standard Balanced)</option>
                                            <option value="1m">1 Minute (Data Saver)</option>
                                            <option value="manual">Manual Only</option>
                                        </select>
                                    </div>

                                    <div className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">Automatic Backups</p>
                                                <p className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest mt-1 transition-colors">Sync to local storage every session</p>
                                            </div>
                                            <div className="text-emerald-400 text-[10px] uppercase tracking-tighter">Active</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'advanced' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="p-6 bg-red-500/[0.03] border border-red-500/10 rounded-sm transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Cpu size={20} className="text-red-500/60" />
                                            <h3 className="text-lg tracking-tight text-red-500/80">Kernel Override</h3>
                                        </div>
                                        <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed mb-6 transition-colors">
                                            Modifying these settings can destabilize the application container. Enable with absolute caution.
                                        </p>

                                        <div className="flex items-center justify-between py-4 border-t border-red-500/10">
                                            <span className="text-xs uppercase tracking-widest text-black/60 dark:text-white/60 transition-colors">Experimental Features</span>
                                            <button
                                                className={`w-10 h-5 rounded-full transition-colors relative ${settings.experimentalFeatures ? 'bg-red-500' : 'bg-black/10 dark:bg-white/10'}`}
                                                onClick={() => setSettings({ ...settings, experimentalFeatures: !settings.experimentalFeatures })}
                                            >
                                                <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${settings.experimentalFeatures ? 'right-1 bg-white' : 'left-1 bg-black/40 dark:bg-white/40'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
