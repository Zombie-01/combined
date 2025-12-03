import { NextResponse } from "next/server";
import { listYogaCourses } from "@/lib/supabase/actions";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courses = await listYogaCourses();
    const course = courses.find((c: any) => c.id === params.id);

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Yoga course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: course.id,
        title: course.title,
        description: course.description,
        type: course.type,
        price: course.price,
        image_url: course.image_url,
        created_at: course.created_at,
      },
    });
  } catch (error) {
    console.error("Yoga course API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch yoga course data" },
      { status: 500 }
    );
  }
}
