import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import YogaCoursesTable from "./table";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  let courses = [];
  let loading = true;

  try {
    const res = await fetch(`/api/yoga/courses`, {
      cache: "no-store",
    });
    if (res.ok) {
      const { data } = await res.json();
      courses = data || [];
    }
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  } finally {
    loading = false;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Yoga Courses</h1>
        <Link href="/admin/yoga/courses/create">
          <Button>Create Course</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <YogaCoursesTable courses={courses} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
