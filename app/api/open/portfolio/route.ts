import { NextResponse } from "next/server";
import {
  listLessons,
  listPortfolioRegistrations,
} from "@/lib/supabase/actions";

export async function GET() {
  try {
    const lessons = await listLessons();
    const registrations = await listPortfolioRegistrations();

    return NextResponse.json({
      success: true,
      data: {
        lessons: lessons.map((l: any) => ({
          id: l.id,
          title: l.title,
          description: l.description,
          image_url: l.image_url,
          video_url: l.video_url,
          created_at: l.created_at,
        })),
        stats: {
          total_lessons: lessons.length,
          total_registrations: registrations.length,
        },
      },
    });
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}
