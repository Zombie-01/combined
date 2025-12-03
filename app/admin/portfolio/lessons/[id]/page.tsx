import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { getLesson, updateLesson, deleteLesson } from "@/lib/supabase/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const lesson = await getLesson(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Lesson</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit {lesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Input name="title" defaultValue={lesson.title} />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <Input
                  name="date"
                  type="date"
                  defaultValue={lesson.date ?? undefined}
                />
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
