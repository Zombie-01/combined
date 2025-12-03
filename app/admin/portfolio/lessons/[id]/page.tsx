import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LessonEditForm from "@/components/admin/lesson-edit-form";
import { getLesson } from "@/lib/supabase/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const lesson = await getLesson(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Lesson</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit {lesson?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {lesson ? (
            <LessonEditForm lesson={lesson} />
          ) : (
            <div>Lesson not found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
