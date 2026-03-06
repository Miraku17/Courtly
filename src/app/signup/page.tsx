"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, ChevronRight } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"player" | "owner">("player");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign-up logic
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
            BE PART
            <br />
            OF THE
            <br />
            <span className="text-primary">ELITE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-[460px] text-[1.1rem] leading-relaxed text-text-muted/80 font-medium"
          >
            Join thousands of players and venue owners who are changing the way the world plays.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-20 flex items-center justify-between"
        >
          <p className="text-[0.9rem] font-medium text-text-muted/60">
            &copy; {new Date().getFullYear()} Courtly. Join the revolution.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-text-muted/60 hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-text-muted/60 hover:text-primary transition-colors">Terms</Link>
          </div>
        </motion.div>
      </div>

      {/* Right — Sign-up form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12 bg-bg-dark relative overflow-y-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] z-10 py-8"
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

          <div className="mb-8">
            <h2
              className="mb-3 text-[2.5rem] font-bold text-[#ffffff] tracking-tight"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              Create account
            </h2>
            <p className="text-[1.05rem] text-text-muted/70">
              Join Courtly and start booking courts today
            </p>
          </div>

          {/* Role selection toggle */}
          <div className="mb-8 flex p-1.5 bg-white/[0.03] rounded-2xl border border-white/5 relative">
            <motion.div 
              className="absolute bg-primary rounded-xl"
              initial={false}
              animate={{ 
                x: role === "player" ? "0%" : "100%",
                width: "50%",
                height: "calc(100% - 12px)",
                top: "6px"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              type="button"
              onClick={() => setRole("player")}
              className={`relative z-10 flex-1 py-3 text-[0.9rem] font-bold transition-colors duration-300 ${
                role === "player" ? "text-bg-dark" : "text-text-muted/60 hover:text-white"
              }`}
            >
              Player
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`relative z-10 flex-1 py-3 text-[0.9rem] font-bold transition-colors duration-300 ${
                role === "owner" ? "text-bg-dark" : "text-text-muted/60 hover:text-white"
              }`}
            >
              Venue Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-text-muted/50 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-12 py-4 text-[1rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/5"
                />
              </div>
            </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-text-muted/50 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-11 py-3.5 text-[0.95rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/5"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-text-muted/50 ml-1">
                  Confirm
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-11 py-3.5 text-[0.95rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 transition-colors hover:text-[#ffffff]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms check */}
            <p className="text-[0.85rem] text-text-muted/50 leading-relaxed px-1">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-primary/70 hover:text-primary transition-colors underline underline-offset-4">Terms of Service</Link> and{" "}
              <Link href="#" className="text-primary/70 hover:text-primary transition-colors underline underline-offset-4">Privacy Policy</Link>.
            </p>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-[1.05rem] font-bold text-bg-dark shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary-hover hover:shadow-primary/20 mt-2"
            >
              Create Account
              <ArrowRight size={20} />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-text-muted/30">OR SIGN UP WITH</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Social sign-up grid */}
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

          {/* Sign in link */}
          <p className="mt-10 text-center text-[1rem] text-text-muted/60">
            Already have an account?{" "}
            <Link href="/signin" className="font-bold text-primary transition-all hover:text-primary-hover border-b border-primary/20 hover:border-primary pb-0.5 inline-flex items-center gap-1 group">
              Sign in
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
