"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { signIn } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => signIn(data),
    onSuccess: (data) => {
      setUser({ userId: data.user.id, email: data.user.email, role: data.user.role });
      toast.success("Welcome back!");
      let destination = "/player/bookings";
      if (data.user.role === "ADMIN") {
        destination = "/admin";
      } else if (data.user.role === "VENUE_OWNER") {
        destination = data.user.onboardingCompleted ? "/venue-owner" : "/onboarding/venue-owner";
      }
      setTimeout(() => router.push(destination), 1000);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    mutation.mutate({ email, password });
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

          >
            <Image src="/logo_final.png" alt="Courtify" width={64} height={64} className="size-16 rounded-full object-cover" />
            <span className="font-panchang">COURTIFY</span>
          </Link>
        </motion.div>

        <div className="relative z-20">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-[4.5rem] leading-[1] font-bold text-[#ffffff]"

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
            Access the city&apos;s best courts, join competitive matches, and elevate your game with Courtify.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-20 flex items-center justify-between"
        >
          <p className="text-[0.9rem] font-medium text-text-muted/60">
            &copy; {new Date().getFullYear()} Courtify. Premium Court Booking.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-text-muted/60 hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-text-muted/60 hover:text-primary transition-colors">Terms</Link>
          </div>
        </motion.div>
      </div>

      {/* Right — Sign-in form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-12 bg-bg-dark relative overflow-y-auto overflow-x-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] z-10"
        >
          {/* Mobile logo */}
          <Link
            href="/"
            className="mb-10 flex items-center gap-2 text-[1.4rem] uppercase text-[#ffffff] font-bold tracking-tighter lg:hidden"

          >
            <Image src="/logo_final.png" alt="Courtify" width={56} height={56} className="size-14 rounded-full object-cover" />
            <span className="font-panchang">COURTIFY</span>
          </Link>

          <div className="mb-8">
            <h2
              className="mb-2 text-[1.6rem] font-bold text-[#ffffff] tracking-tight sm:text-[2.2rem]"

            >
              Welcome back
            </h2>
            <p className="text-[0.95rem] text-text-muted/70">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-text-muted/50 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-10 py-3 text-[0.9rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-text-muted/50">
                  Password
                </label>
                <Link href="#" className="text-[0.75rem] font-semibold text-primary/80 hover:text-primary transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-10 py-3 text-[0.9rem] text-[#ffffff] placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted/40 transition-colors hover:text-[#ffffff]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={mutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[0.95rem] font-bold text-bg-dark shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary-hover hover:shadow-primary/20 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Signing in..." : "Sign In"}
              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-[0.9rem] text-text-muted/60">
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
