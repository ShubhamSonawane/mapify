"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-[#f3f4f6] text-slate-800">
        {/* Radial glow / background accent */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[480px] w-[480px] rounded-full blur-3xl transition-colors duration-500 bg-indigo-500/10" />
        </div>
        {/* Theme toggle placeholder */}
        <div className="relative z-20 flex justify-end px-6 pt-6">
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] bg-indigo-500 text-white transition-colors">☀</span>
            <span className="hidden sm:inline">Light</span>
          </button>
        </div>
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-10 pt-4">
          <main className={`w-full max-w-5xl mx-auto ${className ?? ""}`}>
            {children}
          </main>
        </div>
      </div>
    );
  }

  const isDark = theme !== "light"; // default to dark when undefined

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden ${
        isDark
          ? "bg-slate-950 text-slate-100"
          : "bg-[#f3f4f6] text-slate-800"
      }`}
    >
      {/* Radial glow / background accent */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`h-[480px] w-[480px] rounded-full blur-3xl transition-colors duration-500 ${
            isDark ? "bg-violet-600/20" : "bg-indigo-500/10"
          }`}
        />
      </div>

      {/* Theme toggle */}
      <div className="relative z-20 flex justify-end px-6 pt-6">
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/15 dark:bg-slate-900/80 dark:text-slate-100"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] transition-colors ${
              isDark
                ? "bg-indigo-500/80 text-white"
                : "bg-indigo-500 text-white"
            }`}
          >
            {isDark ? "☾" : "☀"}
          </span>
          <span className="hidden sm:inline">
            {isDark ? "Dark" : "Light"}
          </span>
        </button>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-10 pt-4">
        <main className={`w-full max-w-5xl mx-auto ${className ?? ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

