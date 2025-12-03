import { NextResponse } from "next/server";
import { listTravelBookings } from "@/lib/supabase/actions";

export async function GET() {
  const data = await listTravelBookings();
  return NextResponse.json({ data });
}

// Create/update/delete travel bookings are intentionally left to your existing booking flow.
