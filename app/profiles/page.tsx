"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import AddProfileModal from "@/components/AddProfileModal";
import type { NewProfileInput, Profile } from "@/lib/mockData";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/profiles");
        if (!res.ok) throw new Error("Failed to load profiles");
        const data = await res.json();
        setProfiles(data.profiles ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleSaveProfile = async (input: NewProfileInput) => {
    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      throw new Error("Failed to save profile");
    }

    const data = await res.json();
    if (data.profile) {
      setProfiles((prev) => [data.profile as Profile, ...prev]);
    }
  };

  return (
    <div className="relative space-y-6">
      <section className="glass-panel mx-auto max-w-5xl px-5 py-6 md:px-7 md:py-7">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-sky-300/80">
              Talent map
            </p>
            <h1 className="mt-1 text-xl md:text-2xl font-semibold tracking-wide text-slate-50">
              Profiles
            </h1>
            <p className="mt-1 max-w-xl text-xs md:text-sm text-slate-300">
              A living map of people, skills, and certifications across your
              organisation.
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            {isLoading
              ? "Loading profiles…"
              : `${profiles.length} profile${profiles.length === 1 ? "" : "s"} indexed`}
          </p>
        </header>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {!isLoading && profiles.length === 0 && (
          <p className="mt-4 text-xs text-slate-400">
            No profiles yet. Use “Add profile” to seed Mapify with your first
            few experts.
          </p>
        )}
      </section>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-xs md:text-sm font-medium text-slate-950 shadow-xl shadow-sky-500/40 transition-all hover:-translate-y-1 hover:bg-sky-400"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-950/20 text-slate-950">
          +
        </span>
        Add profile
      </button>

      <AddProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
