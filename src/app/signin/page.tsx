"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign-in logic
  };

  return (
    <div className="flex min-h-svh bg-[#0a1a0a] overflow-hidden">
      {/* Left — Branding panel */}
      <div className="relative hidden flex-1 flex-col justify-between p-12 lg:flex">
        {/* Background Image/Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 grayscale contrast-125"
          style={{ 
            backgroundImage: "url('/hero_1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-bg-dark/95 via-bg-dark/80 to-transparent" />

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20"
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-[1.8rem] uppercase text-[#ffffff] font-bold tracking-tighter"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            <div className="bg-primary p-1.5 rounded-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="24" height="24" className="text-bg-dark">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10" />
                <path d="M12 2v20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            COURTLY
          </Link>
        </motion.div>

        <div className="relative z-20">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-[4.5rem] leading-[1] font-bold text-[#ffffff]"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            PLAY
            <br />
            WITHOUT
            <br />
            <span className="text-primary">LIMITS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-[460px] text-[1.1rem] leading-relaxed text-text-muted/80 font-medium"
          >
            Access the city&apos;s best courts, join competitive matches, and elevate your game with Courtly.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-20 flex items-center justify-between"
        >
          <p className="text-[0.9rem] font-medium text-text-muted/60">
            &copy; {new Date().getFullYear()} Courtly. Premium Court Booking.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-text-muted/60 hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-text-muted/60 hover:text-primary transition-colors">Terms</Link>
          </div>
        </motion.div>
      </div>

      {/* Right — Sign-in form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-12 bg-bg-dark relative overflow-y-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] z-10"
        >
          {/* Mobile logo */}
          <Link
            href="/"
            className="mb-12 flex items-center gap-3 text-[1.6rem] uppercase text-[#ffffff] font-bold tracking-tighter lg:hidden"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            <div className="bg-primary p-1 rounded-md">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="20" height="20" className="text-bg-dark">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            COURTLY
          </Link>

          <div className="mb-10">
            <h2
              className="mb-3 text-[1.8rem] font-bold text-[#ffffff] tracking-tight sm:text-[2.5rem]"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Welcome back
            </h2>
            <p className="text-[1.05rem] text-text-muted/70">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-text-muted/50 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-12 py-4 text-[1rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/5"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-text-muted/50">
                  Password
                </label>
                <Link href="#" className="text-[0.85rem] font-semibold text-primary/80 hover:text-primary transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-12 py-4 text-[1rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 transition-colors hover:text-[#ffffff]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-[1.05rem] font-bold text-bg-dark shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary-hover hover:shadow-primary/20"
            >
              Sign In
              <ArrowRight size={20} />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-text-muted/30">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Social sign-in grid */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] py-3.5 text-[0.95rem] font-bold text-[#ffffff] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] group">
              <svg width="20" height="20" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] py-3.5 text-[0.95rem] font-bold text-[#ffffff] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] group">
              <Github size={20} className="group-hover:scale-110 transition-transform" />
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-10 text-center text-[1rem] text-text-muted/60">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-primary transition-all hover:text-primary-hover border-b border-primary/20 hover:border-primary pb-0.5">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
