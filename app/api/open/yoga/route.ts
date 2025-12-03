import { NextResponse } from "next/server";
import { listYogaCourses } from "@/lib/supabase/actions";

export async function GET() {
  try {
    const courses = await listYogaCourses();

    return NextResponse.json({
      success: true,
      data: {
        courses: courses.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          type: c.type,
          price: c.price,
          image_url: c.image_url,
          created_at: c.created_at,
        })),
        stats: {
          total_courses: courses.length,
        },
      },
    });
  } catch (error) {
    console.error("Yoga API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch yoga data" },
      { status: 500 }
    );
  }
}
