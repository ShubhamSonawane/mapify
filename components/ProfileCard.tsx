import type { Profile } from "@/lib/mockData";

type ProfileCardProps = {
  profile: Profile;
  matchScore?: number;
  aiExplanation?: string;
};

export default function ProfileCard({
  profile,
  matchScore,
  aiExplanation,
}: ProfileCardProps) {
  return (
  <article className="glass-panel relative flex h-full flex-col gap-3 p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10 dark:hover:bg-white/10">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm md:text-base font-semibold tracking-wide text-slate-900 dark:text-slate-50">
            {profile.name}
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
            {profile.role}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {profile.location}
            {profile.team ? ` • ${profile.team}` : ""}
          </p>
        </div>
        {typeof matchScore === "number" && (
          <span className="tag-pill border text-[11px] bg-indigo-50 text-indigo-700 border-indigo-300/80 dark:bg-indigo-500/15 dark:text-indigo-200 dark:border-indigo-400/70">
            Match {matchScore}%
          </span>
        )}
      </header>

      <div className="flex flex-wrap gap-1.5">
      <div className="flex flex-wrap gap-1.5">
        {profile.skills.map((skill: string) => (
          <span
            key={skill}
            className="tag-pill border bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-sky-500/10 dark:text-sky-200/90 dark:border-sky-500/25"
          >
            {skill}
          </span>
        ))}
      </div>
      </div>

      {profile.certifications.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {profile.certifications.map((cert: string) => (
            <span
              key={cert}
              className="tag-pill border bg-amber-50 text-amber-800 border-amber-300/80 dark:bg-fuchsia-500/10 dark:text-fuchsia-200/90 dark:border-fuchsia-500/30"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      <p className="mt-1 text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {profile.bio}
      </p>

      {aiExplanation && (
        <p className="mt-2 border-t border-slate-200 pt-2 text-[11px] leading-relaxed text-slate-500 italic dark:border-slate-700/60 dark:text-slate-400">
          {aiExplanation}
        </p>
      )}
    </article>
  );
}
