import { NextResponse } from "next/server";
import { listLessons } from "@/lib/supabase/actions";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lessons = await listLessons();
    const lesson = lessons.find((l: any) => l.id === params.id);

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        image_url: lesson.image_url,
        video_url: lesson.video_url,
        created_at: lesson.created_at,
      },
    });
  } catch (error) {
    console.error("Portfolio lesson API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch lesson data" },
      { status: 500 }
    );
  }
}
