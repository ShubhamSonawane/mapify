import { NextResponse } from "next/server";
import { addProfile, getProfiles, type NewProfileInput } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ profiles: getProfiles() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<NewProfileInput>;

  if (!body.name || !body.email || !body.role || !body.location) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const profile = addProfile({
    name: body.name,
    email: body.email,
    role: body.role,
    team: body.team ?? "",
    location: body.location,
    yearsExperience: body.yearsExperience ?? 1,
    skills: body.skills ?? [],
    certifications: body.certifications ?? [],
    bio: body.bio ?? "",
  });

  return NextResponse.json({ profile }, { status: 201 });
}
