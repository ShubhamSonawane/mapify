"use client";

import { useState } from "react";
import type { NewProfileInput } from "@/lib/mockData";

type AddProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: NewProfileInput) => Promise<void> | void;
};

type FormState = {
  name: string;
  email: string;
  role: string;
  team: string;
  location: string;
  yearsExperience: string;
  skills: string;
  certifications: string;
  bio: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  role: "",
  team: "",
  location: "",
  yearsExperience: "3",
  skills: "React, TypeScript, Azure DevOps",
  certifications: "",
  bio: "",
};

export default function AddProfileModal({
  isOpen,
  onClose,
  onSave,
}: AddProfileModalProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!form.role.trim()) nextErrors.role = "Role is required";
    if (!form.location.trim()) nextErrors.location = "Location is required";
    if (!form.yearsExperience.trim())
      nextErrors.yearsExperience = "Experience is required";
    if (!form.skills.trim()) nextErrors.skills = "Add at least one skill";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const payload: NewProfileInput = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      team: form.team.trim(),
      location: form.location.trim(),
      yearsExperience: Number(form.yearsExperience) || 1,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      certifications: form.certifications
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bio: form.bio.trim(),
    };

    try {
      await onSave(payload);
      setForm(initialState);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg px-6 py-5 md:px-7 md:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm md:text-base font-semibold tracking-wide text-slate-900 dark:text-slate-50">
              Add profile
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Capture enough detail so Mapify can match them to the right work.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-200 px-2 py-1 text-[11px] text-slate-700 hover:bg-slate-300 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/90"
          >
            Esc
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 text-xs md:text-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field
              label="Name"
              required
              error={errors.name}
              value={form.name}
              onChange={(v) => handleChange("name", v)}
            />
            <Field
              label="Email"
              required
              error={errors.email}
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field
              label="Role"
              required
              error={errors.role}
              value={form.role}
              onChange={(v) => handleChange("role", v)}
            />
            <Field
              label="Team"
              value={form.team}
              onChange={(v) => handleChange("team", v)}
            />
          </div>

          <div className="grid grid-cols-[2fr,1fr] gap-3">
            <Field
              label="Location"
              required
              error={errors.location}
              value={form.location}
              onChange={(v) => handleChange("location", v)}
            />
            <Field
              label="Years experience"
              required
              error={errors.yearsExperience}
              value={form.yearsExperience}
              onChange={(v) => handleChange("yearsExperience", v)}
              inputMode="numeric"
            />
          </div>

          <Field
            label="Skills"
            required
            hint="Comma-separated (React, Azure DevOps, Design systems)"
            error={errors.skills}
            value={form.skills}
            onChange={(v) => handleChange("skills", v)}
          />

          <Field
            label="Certifications"
            hint="Comma-separated (Azure Developer Associate, AWS SA Pro)"
            value={form.certifications}
            onChange={(v) => handleChange("certifications", v)}
          />

          <div className="grid gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Short bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-slate-300 bg-white/80 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50 dark:focus:border-sky-500/70 dark:focus:ring-sky-500/60"
              placeholder="What kind of work do they enjoy and what are they known for?"
            />
          </div>

          <div className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-white/90 dark:border-slate-600/70 dark:text-slate-200 dark:hover:bg-slate-800/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/40 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-indigo-400 dark:bg-indigo-500 dark:text-slate-50 dark:shadow-indigo-500/40 dark:hover:bg-indigo-400"
            >
              {isSubmitting ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function Field({
  label,
  value,
  onChange,
  required,
  hint,
  error,
  inputMode,
}: FieldProps) {
  return (
    <div className="grid gap-1.5">
  <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
        {label}
        {required && <span className="ml-1 text-sky-300">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
  className="w-full rounded-2xl border border-slate-300 bg-white/80 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50 dark:focus:border-sky-500/70 dark:focus:ring-sky-500/60"
      />
      {hint && !error && (
        <p className="text-[10px] text-slate-500">{hint}</p>
      )}
      {error && <p className="text-[10px] text-rose-400">{error}</p>}
    </div>
  );
}
