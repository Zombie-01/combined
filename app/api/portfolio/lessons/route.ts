import { NextResponse } from "next/server";
import {
  listLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/lib/supabase/actions";

const EXTERNAL = process.env.EXTERNAL_INTEGRATION_URL;

export async function GET() {
  const data = await listLessons();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await createLesson(body);

  if (EXTERNAL) {
    try {
      await fetch(new URL("/portfolio/lessons", EXTERNAL).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(created ?? body),
      });
    } catch (err) {
      console.error("external integration failed", err);
    }
  }

  return NextResponse.json({ data: created });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...payload } = body;
  if (!id)
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
    });
  const updated = await updateLesson(id, payload);
  return NextResponse.json({ data: updated });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  if (!id)
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
    });
  const deleted = await deleteLesson(id);
  return NextResponse.json({ data: deleted });
}
