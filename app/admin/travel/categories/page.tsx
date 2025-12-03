import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { listCategories } from "@/lib/supabase/actions";
import CategoriesTable from "./table";

export default async function Page() {
  const cats = await listCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Travel Categories</h1>
        <Link href="/admin/travel/categories/create">
          <Button>Create Category</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesTable cats={cats} />
        </CardContent>
      </Card>
    </div>
  );
}
