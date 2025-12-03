import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  getYogaCourse,
  updateYogaCourse,
  deleteYogaCourse,
} from "@/lib/supabase/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = await getYogaCourse(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Course</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit {course?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Input name="title" defaultValue={course?.title} />
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
