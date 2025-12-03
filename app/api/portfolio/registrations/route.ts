import { NextResponse } from "next/server";
import { listPortfolioRegistrations } from "@/lib/supabase/actions";

export async function GET() {
  const data = await listPortfolioRegistrations();
  return NextResponse.json({ data });
}

// Optionally support listing only for now; create/delete can be added later.
