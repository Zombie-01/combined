import { supabaseAdmin } from "./server";

export async function authenticateUser(formData: FormData) {
  // Placeholder: implement auth flow as needed (client sign-in or server verify)
  return null;
}

export async function getStats() {
  const tables = {
    lessons: "portfolio_lessons",
    portfolioRegs: "portfolio_registrations",
    travelItems: "travel_items",
    travelBookings: "travel_bookings",
    yogaCourses: "yoga_courses",
    yogaBookings: "yoga_bookings",
  } as const;

  const result: Record<string, number> = {};

  for (const [key, table] of Object.entries(tables)) {
    try {
      const { count } = await supabaseAdmin
        .from(table)
        .select({ count: "exact", head: true });
      result[key] = typeof count === "number" ? count : 0;
    } catch (e) {
      result[key] = 0;
    }
  }

  return {
    lessons: result.lessons ?? 0,
    portfolioRegs: result.portfolioRegs ?? 0,
    travelItems: result.travelItems ?? 0,
    travelBookings: result.travelBookings ?? 0,
    yogaCourses: result.yogaCourses ?? 0,
    yogaBookings: result.yogaBookings ?? 0,
  };
}

// Lessons
export async function listLessons() {
  const { data } = await supabaseAdmin
    .from("portfolio_lessons")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getLesson(id: string) {
  const { data } = await supabaseAdmin
    .from("portfolio_lessons")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function createLesson(payload: any) {
  const { data } = await supabaseAdmin
    .from("portfolio_lessons")
    .insert(payload)
    .select()
    .single();
  return data ?? null;
}

export async function updateLesson(id: string, payload: any) {
  const { data } = await supabaseAdmin
    .from("portfolio_lessons")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function deleteLesson(id: string) {
  const { data } = await supabaseAdmin
    .from("portfolio_lessons")
    .delete()
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function listPortfolioRegistrations() {
  const { data } = await supabaseAdmin
    .from("portfolio_registrations")
    .select("id,created_at,user_id,lesson_id,portfolio_lessons(title)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

// Travel categories
export async function listCategories() {
  const { data } = await supabaseAdmin
    .from("travel_categories")
    .select("*")
    .order("name");
  return data ?? [];
}

export async function createCategory(payload: any) {
  const { data } = await supabaseAdmin
    .from("travel_categories")
    .insert(payload)
    .select()
    .single();
  return data ?? null;
}

export async function updateCategory(id: string, payload: any) {
  const { data } = await supabaseAdmin
    .from("travel_categories")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function deleteCategory(id: string) {
  const { data } = await supabaseAdmin
    .from("travel_categories")
    .delete()
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

// Travel items
export async function listTravelItems() {
  const { data } = await supabaseAdmin
    .from("travel_items")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getTravelItem(id: string) {
  const { data } = await supabaseAdmin
    .from("travel_items")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function createTravelItem(payload: any) {
  const { data } = await supabaseAdmin
    .from("travel_items")
    .insert(payload)
    .select()
    .single();
  return data ?? null;
}

export async function updateTravelItem(id: string, payload: any) {
  const { data } = await supabaseAdmin
    .from("travel_items")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function deleteTravelItem(id: string) {
  const { data } = await supabaseAdmin
    .from("travel_items")
    .delete()
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function listTravelBookings() {
  const { data } = await supabaseAdmin
    .from("travel_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

// Banners
export async function listBanners() {
  const { data } = await supabaseAdmin
    .from("travel_banners")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getBanner(id: string) {
  const { data } = await supabaseAdmin
    .from("travel_banners")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function createBanner(payload: any) {
  const { data } = await supabaseAdmin
    .from("travel_banners")
    .insert(payload)
    .select()
    .single();
  return data ?? null;
}

export async function updateBanner(id: string, payload: any) {
  const { data } = await supabaseAdmin
    .from("travel_banners")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function deleteBanner(id: string) {
  const { data } = await supabaseAdmin
    .from("travel_banners")
    .delete()
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

// Yoga
export async function listYogaCourses() {
  const { data } = await supabaseAdmin
    .from("yoga_courses")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getYogaCourse(id: string) {
  const { data } = await supabaseAdmin
    .from("yoga_courses")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function createYogaCourse(payload: any) {
  const { data } = await supabaseAdmin
    .from("yoga_courses")
    .insert(payload)
    .select()
    .single();
  return data ?? null;
}

export async function updateYogaCourse(id: string, payload: any) {
  const { data } = await supabaseAdmin
    .from("yoga_courses")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function deleteYogaCourse(id: string) {
  const { data } = await supabaseAdmin
    .from("yoga_courses")
    .delete()
    .eq("id", id)
    .select()
    .single();
  return data ?? null;
}

export async function listYogaBookings() {
  const { data } = await supabaseAdmin
    .from("yoga_bookings")
    .select("id,created_at,user_id,course_id,yoga_courses(title)")
    .order("created_at", { ascending: false });
  return data ?? [];
}
