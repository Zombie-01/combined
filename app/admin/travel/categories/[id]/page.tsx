import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateCategory, deleteCategory } from "@/lib/supabase/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = { id, name: "Sample Category" };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit {item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Input name="name" defaultValue={item.name} />
              </div>
              <div className="flex gap-2">
                <Button type="button">Update</Button>
                <Button type="button" variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
