import { NextResponse } from "next/server";
import { listYogaBookings } from "@/lib/supabase/actions";

export async function GET() {
  const data = await listYogaBookings();
  return NextResponse.json({ data });
}

// Booking create/update/delete left to your existing booking flow.
