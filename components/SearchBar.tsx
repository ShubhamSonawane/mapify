"use client";

import { useCallback } from "react";

type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  examples?: string[];
};

const DEFAULT_EXAMPLES = [
  "React + Azure DevOps",
  "Data engineer for fraud analytics",
  "GenAI + prompt engineering",
  "Salesforce integration specialist",
];

export default function SearchBar({
  query,
  onChange,
  onSubmit,
  isLoading,
  examples = DEFAULT_EXAMPLES,
}: SearchBarProps) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <div className="space-y-5">
      <div className="glass-panel flex items-center gap-3 rounded-full px-5 py-3 border border-slate-300/50 bg-white/70 backdrop-blur-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.25)] dark:border-white/10 dark:bg-white/5 dark:focus-within:ring-sky-400/70">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-sky-500/15 dark:text-sky-300">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
          >
            <path
              fill="currentColor"
              d="m20.53 19.47-3.89-3.89A7.46 7.46 0 0 0 18 10.5 7.5 7.5 0 1 0 10.5 18a7.46 7.46 0 0 0 5.08-1.36l3.89 3.89a.75.75 0 0 0 1.06-1.06ZM5 10.5a5.5 5.5 0 1 1 5.5 5.5A5.51 5.51 0 0 1 5 10.5Z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the skills or project you need..."
          className="flex-1 bg-transparent text-sm md:text-base text-slate-800 placeholder:text-slate-500 outline-none dark:text-slate-50"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="hidden sm:inline-flex items-center rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/40 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 dark:bg-indigo-500 dark:text-slate-50 dark:shadow-indigo-500/40 dark:hover:bg-indigo-400"
        >
          Search
        </button>
      </div>

  <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onChange(example)}
            className="tag-pill bg-white/80 text-slate-800 hover:bg-white dark:bg-slate-800/70 dark:text-slate-200/90 dark:hover:bg-slate-700/80 transition-colors duration-200 border border-slate-300/50 dark:border-slate-700/80"
          >
            {example}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
          <div className="flex items-end gap-1 h-4">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-400 animate-ping [animation-duration:900ms]" />
            <span className="inline-block h-3 w-3 rounded-full bg-sky-300/80 animate-pulse [animation-duration:700ms]" />
            <span className="inline-block h-2 w-2 rounded-full bg-sky-500/90 animate-pulse [animation-duration:1100ms]" />
          </div>
          <span>Thinking…</span>
        </div>
      )}
    </div>
  );
}
