import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { listTravelItems } from "@/lib/supabase/actions";
import TravelItemsTable from "./table";

export default async function Page() {
  const items = await listTravelItems();

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
          <TravelItemsTable items={items} />
        </CardContent>
      </Card>
    </div>
  );
}
