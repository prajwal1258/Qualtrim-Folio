'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
    Shield, Bell,
    CreditCard, Camera, ChevronRight, User as UserIcon
} from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

export default function Account() {
    const { user, updateUser } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    // Initialize with empty strings to match SSR (user is null server-side)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        notificationEnabled: true,
        twoFactorEnabled: false
    })

    // Keep a ref to always read the latest formData inside async handlers
    const formDataRef = React.useRef(formData)
    formDataRef.current = formData

    // Populate form ONCE when the user first loads from AuthContext — never overwrite after that
    const initializedRef = React.useRef(false)
    useEffect(() => {
        if (user && !initializedRef.current) {
            initializedRef.current = true
            setFormData(prev => ({
                ...prev,
                fullName: user.fullName || '',
                email: user.email || '',
                notificationEnabled: user.notificationEnabled ?? true,
                twoFactorEnabled: user.twoFactorEnabled ?? false,
            }))
        }
    }, [user])

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 600))
        const latest = formDataRef.current
        updateUser({ 
            fullName: latest.fullName, 
            email: latest.email,
            notificationEnabled: latest.notificationEnabled,
            twoFactorEnabled: latest.twoFactorEnabled
        })
        setIsSaving(false)
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
    }

    return (
        <div className="flex h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-light selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10">
                <header className="mb-10">
                    <h2 className="text-3xl tracking-tighter mb-1">Account Settings</h2>
                    <p className="text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest italic">Manage your profile and security preferences.</p>
                </header>

                <div className="max-w-4xl space-y-10">
                    {/* Profile Section */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl tracking-tighter">Profile Information</h3>
                            <div className="flex items-center gap-3">
                                {saveSuccess && (
                                    <span className="text-emerald-500 text-xs uppercase tracking-widest animate-in fade-in duration-300">
                                        ✓ Saved
                                    </span>
                                )}
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || saveSuccess}
                                    className={`px-6 py-2 text-xs font-medium rounded-sm transition-all active:scale-95 disabled:opacity-50 ${
                                        saveSuccess
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90'
                                    }`}
                                >
                                    {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                        <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center border border-black/10 dark:border-white/10 border-dashed overflow-hidden">
                                        <UserIcon size={32} className="text-black/20 dark:text-white/20" />
                                    </div>
                                    <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                        <Camera size={20} />
                                    </button>
                                </div>
                                <div>
                                    <h4 className="font-medium tracking-tight">Profile Photo</h4>
                                    <p className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest mt-1">PNG, JPG or WEBP. Max 2MB.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security & Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="space-y-6">
                            <h3 className="text-xl tracking-tighter">Security</h3>
                            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm divide-y divide-black/5 dark:divide-white/5">
                                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                            <Shield size={16} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Two-Factor Authentication</p>
                                            <p className="text-[10px] text-yellow-500/60 uppercase tracking-widest">Recommended</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-black/10 dark:text-white/10 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors" />
                                </div>
                                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                            <Shield size={16} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Change Password</p>
                                            <p className="text-[10px] text-black/20 dark:text-white/20 uppercase tracking-widest">Last changed 3mo ago</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-black/10 dark:text-white/10 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors" />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-xl tracking-tighter">Preferences</h3>
                            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm divide-y divide-black/5 dark:divide-white/5">
                                <div className="p-4 flex items-center justify-between transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                            <Bell size={16} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Push Notifications</p>
                                            <p className="text-[10px] text-black/20 dark:text-white/20 uppercase tracking-widest">Market alerts and updates</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`w-10 h-5 rounded-full transition-colors relative ${formData.notificationEnabled ? 'bg-black dark:bg-white' : 'bg-black/10 dark:bg-white/10'}`}
                                        onClick={() => setFormData({ ...formData, notificationEnabled: !formData.notificationEnabled })}
                                    >
                                        <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${formData.notificationEnabled ? 'right-1 bg-white dark:bg-black' : 'left-1 bg-black/40 dark:bg-white/40'}`} />
                                    </button>
                                </div>
                                <div className="p-4 flex items-center justify-between transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                            <CreditCard size={16} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Currency Display</p>
                                            <p className="text-[10px] text-black/20 dark:text-white/20 uppercase tracking-widest">Primary: USD ($)</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-black/10 dark:text-white/10" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Danger Zone */}
                    <section className="pt-6 border-t border-black/5 dark:border-white/5">
                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-sm flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-red-500/80">Delete Account</h4>
                                <p className="text-xs text-black/20 dark:text-white/20 mt-1">Permanently remove your folio data and access. This action is irreversible.</p>
                            </div>
                            <button className="px-4 py-2 bg-red-500/10 text-red-500 text-xs font-medium rounded-sm hover:bg-red-500/20 transition-colors uppercase tracking-widest">
                                Terminate
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
