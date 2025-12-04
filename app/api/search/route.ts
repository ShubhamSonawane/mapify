import { NextResponse } from "next/server";
import { searchProfiles } from "@/lib/mockData";

export async function POST(request: Request) {
  const { query } = (await request.json()) as { query?: string };
  const results = searchProfiles(query ?? "");
  return NextResponse.json({ results });
}
