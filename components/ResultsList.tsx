import type { SearchResult } from "@/lib/mockData";
import ProfileCard from "@/components/ProfileCard";

type ResultsListProps = {
  results: SearchResult[];
  isVisible?: boolean;
};

export default function ResultsList({ results, isVisible }: ResultsListProps) {
  if (!results.length) return null;

  return (
    <section
      aria-label="Search results"
      className={`mt-8 space-y-4 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
        Top matches
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((result) => (
          <ProfileCard
            key={result.profile.id}
            profile={result.profile}
            matchScore={result.matchScore}
            aiExplanation={result.aiExplanation}
          />
        ))}
      </div>
    </section>
  );
}
