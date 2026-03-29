'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    fullName: string
    email: string
    notificationEnabled?: boolean
    twoFactorEnabled?: boolean
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<boolean>
    signup: (fullName: string, email: string, password: string) => Promise<boolean>
    logout: () => void
    updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for existing session in localStorage
        const savedUser = localStorage.getItem('auth_user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const users = JSON.parse(localStorage.getItem('registered_users') || '[]')
        const foundUser = users.find((u: any) => u.email === email && u.password === password)

        if (foundUser) {
            const userData = { fullName: foundUser.fullName, email: foundUser.email }
            localStorage.setItem('auth_user', JSON.stringify(userData))
            setUser(userData)
            return true
        }
        return false
    }

    const signup = async (fullName: string, email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const users = JSON.parse(localStorage.getItem('registered_users') || '[]')

        if (users.some((u: any) => u.email === email)) {
            return false // User already exists
        }

        const newUser = { fullName, email, password }
        users.push(newUser)
        localStorage.setItem('registered_users', JSON.stringify(users))

        // Automatically log in after signup
        const userData = { fullName, email }
        localStorage.setItem('auth_user', JSON.stringify(userData))
        setUser(userData)

        return true
    }

    const logout = () => {
        localStorage.removeItem('auth_user')
        setUser(null)
        router.push('/')
    }

    const updateUser = (updates: Partial<User>) => {
        const currentUser = user || { fullName: '', email: '' }
        const updatedUser = { ...currentUser, ...updates }
        // Update auth session
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
        // Also update the password in the registered_users list if email changed
        const users = JSON.parse(localStorage.getItem('registered_users') || '[]')
        const idx = users.findIndex((u: any) => u.email === currentUser.email)
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...updates }
            localStorage.setItem('registered_users', JSON.stringify(users))
        }
        setUser(updatedUser)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
