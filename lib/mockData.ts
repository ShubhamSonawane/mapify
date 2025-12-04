export type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  location: string;
  yearsExperience: number;
  skills: string[];
  certifications: string[];
  bio: string;
};

export type NewProfileInput = Omit<Profile, "id">;

export type SearchResult = {
  profile: Profile;
  matchScore: number;
  aiExplanation: string;
};

let profiles: Profile[] = [
  {
    id: "1",
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    role: "Senior Frontend Engineer",
    team: "Digital Experience",
    location: "London",
    yearsExperience: 7,
    skills: ["React", "TypeScript", "Next.js", "Azure DevOps", "Design Systems"],
    certifications: ["Azure Developer Associate"],
    bio: "Leads front-end architecture for customer portals with a focus on performance, accessibility, and design systems.",
  },
  {
    id: "2",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    role: "Lead Data Engineer",
    team: "Risk & Fraud Analytics",
    location: "Bengaluru",
    yearsExperience: 9,
    skills: ["Data Engineering", "Python", "Spark", "Fraud Analytics", "Azure Data Factory"],
    certifications: ["Databricks Data Engineer", "Azure Data Engineer Associate"],
    bio: "Designs scalable data platforms and real-time fraud detection pipelines across card and payments businesses.",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    role: "AI Solutions Architect",
    team: "Applied AI Guild",
    location: "New York",
    yearsExperience: 11,
    skills: ["GenAI", "Prompt Engineering", "Azure OpenAI", "MLOps", "Solution Architecture"],
    certifications: ["Azure AI Engineer", "TOGAF"],
    bio: "Helps internal teams design responsible GenAI copilots and integrates LLMs into existing products.",
  },
  {
    id: "4",
    name: "Liam Chen",
    email: "liam.chen@example.com",
    role: "Senior Salesforce Engineer",
    team: "Customer Platforms",
    location: "Singapore",
    yearsExperience: 8,
    skills: ["Salesforce", "Apex", "Integration", "REST APIs", "Solution Design"],
    certifications: ["Salesforce Platform Developer II"],
    bio: "Owns complex Salesforce integrations across CRM, billing, and support tooling for multiple markets.",
  },
];

export function getProfiles(): Profile[] {
  return profiles;
}

export function addProfile(input: NewProfileInput): Profile {
  const profile: Profile = {
    id: crypto.randomUUID(),
    ...input,
  };
  profiles = [profile, ...profiles];
  return profile;
}

function buildAiExplanation(profile: Profile, query: string): string {
  const skillsSnippet = profile.skills.slice(0, 3).join(" + ");
  const years = profile.yearsExperience;
  const domain = profile.team || profile.role;
  return `Strong ${skillsSnippet} background with about ${years} years of experience in ${domain}, well aligned to "${query}".`;
}

export function searchProfiles(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: SearchResult[] = [];

  for (const profile of profiles) {
    const haystack = [
      profile.name,
      profile.role,
      profile.location,
      profile.team,
      profile.bio,
      ...profile.skills,
      ...profile.certifications,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matches = tokens.filter((token) => haystack.includes(token));
    if (!matches.length) continue;

    const base = 60;
    const scoreBoost = Math.min(matches.length * 10, 35);
    const jitter = Math.floor(Math.random() * 6); // 0-5
    const matchScore = Math.min(base + scoreBoost + jitter, 99);

    scored.push({
      profile,
      matchScore,
      aiExplanation: buildAiExplanation(profile, query),
    });
  }

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 5);
}
