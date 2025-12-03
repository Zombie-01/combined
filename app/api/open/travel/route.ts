import { NextResponse } from "next/server";
import {
  listTravelItems,
  listCategories,
  listBanners,
} from "@/lib/supabase/actions";

export async function GET() {
  try {
    const items = await listTravelItems();
    const categories = await listCategories();
    const banners = await listBanners();

    return NextResponse.json({
      success: true,
      data: {
        categories: categories.map((c: any) => ({
          id: c.id,
          name: c.name,
          icon: c.icon,
        })),
        items: items.map((i: any) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          category_id: i.category_id,
          location: i.location,
          country: i.country,
          price: i.price,
          image_url: i.image_url,
          created_at: i.created_at,
        })),
        banners: banners.map((b: any) => ({
          id: b.id,
          text: b.text,
          image_url: b.image_url,
        })),
        stats: {
          total_items: items.length,
          total_categories: categories.length,
          total_banners: banners.length,
        },
      },
    });
  } catch (error) {
    console.error("Travel API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch travel data" },
      { status: 500 }
    );
  }
}
