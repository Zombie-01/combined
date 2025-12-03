import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/lib/supabase/actions";

export default async function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Create Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Input name="name" />
              </div>
              <div>
                <Button type="button">Create</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
