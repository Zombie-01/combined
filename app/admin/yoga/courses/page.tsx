import React from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/ui/delete-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { listYogaCourses } from "@/lib/supabase/actions";

export default async function Page() {
  const courses = await listYogaCourses();

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6">
                    No courses
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Link href={`/admin/yoga/courses/${c.id}`}>
                          <Button variant="ghost">Edit</Button>
                        </Link>
                        <DeleteButton id={c.id} apiPath="/api/yoga/courses" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
