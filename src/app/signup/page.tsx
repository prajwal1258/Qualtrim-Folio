'use client'

import { DotScreenShader } from "@/components/ui/dot-shader-background";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const success = await signup(fullName, email, password);
            if (success) {
                router.push("/dashboard");
            } else {
                setError("An account with this email already exists.");
            }
        } catch (err) {
            setError("An error occurred during registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-svh w-screen flex items-center justify-center relative bg-black selection:bg-white selection:text-black font-light text-white">
            <div className="absolute inset-0 z-0">
                <DotScreenShader />
            </div>

            <Link
                href="/"
                className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors mix-blend-exclusion"
            >
                <ArrowLeft size={20} />
                <span className="text-sm tracking-widest uppercase">Back</span>
            </Link>

            <div className="z-10 w-full max-w-md px-8 py-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-sm">
                <div className="mb-8">
                    <h1 className="text-3xl tracking-tighter mb-2">Create Account</h1>
                    <p className="text-white/60 text-sm">Join Qualtrim Folio to begin your journey.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs tracking-widest uppercase text-white/40">Full Name</label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs tracking-widest uppercase text-white/40">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs tracking-widest uppercase text-white/40">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider">
                        By creating an account, you agree to our terms of service and privacy policy.
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black font-medium hover:bg-white/90 transition-all active:scale-[0.98] rounded-sm mt-2 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Creating Folio</span>
                            </>
                        ) : (
                            "Create Folio"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-white/40">Already have an account? </span>
                    <Link href="/signin" className="text-white hover:underline decoration-white/30 underline-offset-4">Sign In</Link>
                </div>
            </div>

            <div className="absolute bottom-8 right-8 z-10 hidden md:block">
                <p className="text-xs tracking-widest text-white/20 uppercase">
                    Qualtrim Folio — Secure Registration
                </p>
            </div>
        </div>
    );
}
