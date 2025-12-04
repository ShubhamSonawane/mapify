"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultsList from "@/components/ResultsList";
import type { SearchResult } from "@/lib/mockData";
import SiriWaveLoader from "@/components/SiriWaveLoader";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSubmitted(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setResults(data.results ?? []);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const cardTransform = hasSubmitted && results.length > 0;

  return (
    <div className="space-y-8">
      <section
        className={`glass-panel mx-auto max-w-3xl px-5 py-7 md:px-8 md:py-9 transition-all duration-500 ease-out ${
          cardTransform ? "-translate-y-3 scale-[0.98]" : "translate-y-0 scale-100"
        }`}
      >
        <div className="flex flex-col gap-4 text-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-sky-300/80">
              Internal Talent Copilot
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-wide text-slate-50">
              Mapify
            </h1>
          </div>
          <p className="mx-auto max-w-xl text-xs md:text-sm text-slate-300">
            Describe the skills or project you need, and we&apos;ll surface the
            people across your org who can help you move faster.
          </p>
        </div>

        <div className="mt-6">
          <SearchBar
            query={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="mt-3 flex justify-center">
            <SiriWaveLoader
              active={isLoading}
              className="mt-1"
              lightMode={theme === "light"}
            />
          </div>
        </div>
      </section>

      <ResultsList results={results} isVisible={hasSubmitted && !isLoading} />
    </div>
  );
}
