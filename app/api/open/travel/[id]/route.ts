import { NextResponse } from "next/server";
import { listTravelItems } from "@/lib/supabase/actions";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const items = await listTravelItems();
    const item = items.find((i: any) => i.id === params.id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Travel item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: item.id,
        title: item.title,
        description: item.description,
        category_id: item.category_id,
        location: item.location,
        country: item.country,
        price: item.price,
        image_url: item.image_url,
        created_at: item.created_at,
      },
    });
  } catch (error) {
    console.error("Travel item API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch travel item data" },
      { status: 500 }
    );
  }
}
