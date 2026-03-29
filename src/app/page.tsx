'use client'

import { DotScreenShader } from "@/components/ui/dot-shader-background";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon, Diamond } from "lucide-react";

export default function Home() {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="h-svh w-screen flex flex-col gap-8 items-center justify-center relative bg-black selection:bg-white selection:text-black">
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>

      <div className="z-10 flex flex-col items-center gap-6 px-4">
        {user && (
          <div className="absolute top-8 right-8 flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm mix-blend-exclusion">
            <div className="flex items-center gap-2">
              <UserIcon size={16} className="text-white/60" />
              <span className="text-sm font-light text-white">{user.fullName}</span>
            </div>
            <button
              onClick={logout}
              className="p-1 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}

        <div className="relative flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-700">
          <div className="w-16 h-16 border-[1.5px] border-white/20 rotate-45 rounded-[4px] absolute animate-[spin_10s_linear_infinite]" />
          <div className="w-12 h-12 border-[1.5px] border-white/10 rotate-[30deg] rounded-[4px] absolute animate-[spin_15s_linear_infinite_reverse]" />
          <Diamond size={28} className="text-white fill-white mix-blend-exclusion" />
        </div>
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter mix-blend-exclusion text-white whitespace-nowrap pointer-events-none">
          Qualtrim Folio
        </h1>
        <p className="text-lg md:text-2xl font-light text-center text-white/80 mix-blend-exclusion max-w-2xl leading-relaxed pointer-events-none">
          {user ? `Welcome back, ${user.fullName.split(' ')[0]}. Manage your digital assets.` : 'Start Your Journey with Qualtrim Folio'}
        </p>

        {!isLoading && (
          <div className="flex gap-4 mt-8 pointer-events-auto">
            {user ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-white text-black rounded-sm font-medium hover:bg-gray-200 transition-all active:scale-95 duration-200"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-white text-black rounded-sm font-medium hover:bg-gray-200 transition-all active:scale-95 duration-200"
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="px-8 py-3 border border-white text-white rounded-sm font-medium hover:bg-white/10 transition-all active:scale-95 duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-8 z-10 hidden md:block">
        <p className="text-xs tracking-widest text-white/40 uppercase">
          Est. 2026 — Qualtrim Folio
        </p>
      </div>
    </div>
  );
}
