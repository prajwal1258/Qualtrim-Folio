'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import {
    LayoutDashboard, LineChart, Wallet, Settings as SettingsIcon,
    LogOut, User as UserIcon, Diamond
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const { user, logout } = useAuth()
    const pathname = usePathname()

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/analytics', label: 'Analytics', icon: LineChart },
        { href: '/account', label: 'Account', icon: Wallet },
        { href: '/settings', label: 'Settings', icon: SettingsIcon },
    ]

    return (
        <aside className="w-64 border-r border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#0D0D0D] flex flex-col p-6 transition-colors duration-300 shrink-0">
            <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 border-[1.5px] border-black/20 dark:border-white/20 rotate-45 rounded-[2px] absolute group-hover:rotate-90 group-hover:border-black/40 dark:group-hover:border-white/40 transition-all duration-500" />
                    <Diamond size={14} className="text-black dark:text-white fill-black dark:fill-white group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-medium tracking-tighter text-xl ml-1">Qualtrim</span>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href
                    return isActive ? (
                        <button
                            key={href}
                            className="w-full flex items-center gap-3 px-3 py-2 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-sm transition-colors"
                        >
                            <Icon size={18} className="text-black/60 dark:text-white/60" />
                            <span className="text-sm">{label}</span>
                        </button>
                    ) : (
                        <Link
                            key={href}
                            href={href}
                            className="w-full flex items-center gap-3 px-3 py-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-sm transition-colors"
                        >
                            <Icon size={18} />
                            <span className="text-sm">{label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 transition-colors">
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
    )
}
