import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TravelItemsTable from "./table";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let items = [];
  let loading = true;

  try {
    const res = await fetch(`${baseUrl}/api/travel/items`, {
      cache: "no-store",
    });
    if (res.ok) {
      const { data } = await res.json();
      items = data || [];
    }
  } catch (error) {
    console.error("Failed to fetch items:", error);
  } finally {
    loading = false;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Travel Items</h1>
        <Link href="/admin/travel/items/create">
          <Button>Create Item</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <TravelItemsTable items={items} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
