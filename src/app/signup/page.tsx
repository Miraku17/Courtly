"use client";

import Link from "next/link";
import { useState } from "react";

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
    <div className="flex min-h-svh bg-bg-dark">
      {/* Left — Branding panel */}
      <div className="hidden flex-1 flex-col justify-between p-12 lg:flex">
        <Link
          href="/"
          className="flex items-center gap-3 text-[1.8rem] uppercase text-[#ffffff]"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" className="text-primary">
            <path d="M12 2C9.5 2 8 4 8 6.5C8 9 10.5 11 12 11C13.5 11 16 9 16 6.5C16 4 14.5 2 12 2ZM12 22C14.5 22 16 20 16 17.5C16 15 13.5 13 12 13C10.5 13 8 15 8 17.5C8 20 9.5 22 12 22ZM2 12C2 14.5 4 16 6.5 16C9 16 11 13.5 11 12C11 10.5 9 8 6.5 8C4 8 2 9.5 2 12ZM22 12C22 9.5 20 8 17.5 8C15 8 13 10.5 13 12C13 13.5 15 16 17.5 16C20 16 22 14.5 22 12Z" />
          </svg>
          COURTLY
        </Link>

        <div>
          <h1
            className="mb-4 text-[3.5rem] leading-[1.1] text-[#ffffff]"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            JOIN THE
            <br />
            <span className="text-primary">COURTLY</span> COMMUNITY
          </h1>
          <p className="max-w-[400px] text-[1.05rem] leading-relaxed text-text-muted">
            Whether you&apos;re a player looking for courts or a venue owner ready to grow — your journey starts here.
          </p>
        </div>

        <p className="text-[0.85rem] text-text-muted">
          &copy; {new Date().getFullYear()} Courtly. All Rights Reserved.
        </p>
      </div>

      {/* Right — Sign-up form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[440px]">
          {/* Mobile logo */}
          <Link
            href="/"
            className="mb-10 flex items-center gap-3 text-[1.6rem] uppercase text-[#ffffff] lg:hidden"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className="text-primary">
              <path d="M12 2C9.5 2 8 4 8 6.5C8 9 10.5 11 12 11C13.5 11 16 9 16 6.5C16 4 14.5 2 12 2ZM12 22C14.5 22 16 20 16 17.5C16 15 13.5 13 12 13C10.5 13 8 15 8 17.5C8 20 9.5 22 12 22ZM2 12C2 14.5 4 16 6.5 16C9 16 11 13.5 11 12C11 10.5 9 8 6.5 8C4 8 2 9.5 2 12ZM22 12C22 9.5 20 8 17.5 8C15 8 13 10.5 13 12C13 13.5 15 16 17.5 16C20 16 22 14.5 22 12Z" />
            </svg>
            COURTLY
          </Link>

          <h2
            className="mb-2 text-[2rem] text-[#ffffff]"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Create Account
          </h2>
          <p className="mb-8 text-[0.95rem] text-text-muted">
            Get started with Courtly in just a few steps.
          </p>

          {/* Role toggle */}
          <div className="mb-6 flex rounded-xl border-2 border-white/10 p-1">
            <button
              type="button"
              onClick={() => setRole("player")}
              className={`flex-1 rounded-lg py-2.5 text-[0.85rem] font-semibold uppercase tracking-[0.06em] transition-all duration-300 ${
                role === "player"
                  ? "bg-primary text-text-dark"
                  : "text-text-muted hover:text-[#ffffff]"
              }`}
            >
              Player
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 rounded-lg py-2.5 text-[0.85rem] font-semibold uppercase tracking-[0.06em] transition-all duration-300 ${
                role === "owner"
                  ? "bg-primary text-text-dark"
                  : "text-text-muted hover:text-[#ffffff]"
              }`}
            >
              Venue Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] px-4 py-3.5 text-[0.95rem] text-[#ffffff] placeholder-white/30 outline-none transition-all duration-300 focus:border-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] px-4 py-3.5 text-[0.95rem] text-[#ffffff] placeholder-white/30 outline-none transition-all duration-300 focus:border-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] px-4 py-3.5 pr-12 text-[0.95rem] text-[#ffffff] placeholder-white/30 outline-none transition-all duration-300 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-[#ffffff]"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] px-4 py-3.5 text-[0.95rem] text-[#ffffff] placeholder-white/30 outline-none transition-all duration-300 focus:border-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-[0.95rem] font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Create Account
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[0.8rem] uppercase tracking-wider text-text-muted">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google sign-up */}
          <button className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-white/10 bg-transparent py-3.5 text-[0.95rem] font-medium text-[#ffffff] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Sign in link */}
          <p className="mt-8 text-center text-[0.9rem] text-text-muted">
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold text-primary transition-colors hover:text-primary-hover">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
