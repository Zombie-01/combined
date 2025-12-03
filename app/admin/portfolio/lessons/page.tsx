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
import { listLessons } from "@/lib/supabase/actions";

export default async function Page() {
  const lessons = await listLessons();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Lessons</h1>
        <Link href="/admin/portfolio/lessons/create">
          <Button>Create Lesson</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No lessons yet
                  </TableCell>
                </TableRow>
              ) : (
                lessons.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <img src={l.image_url} className="w-10 h-10" />
                    </TableCell>
                    <TableCell>{l.title}</TableCell>
                    <TableCell>{l.description.split(0, 10)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Link href={`/admin/portfolio/lessons/${l.id}`}>
                          <Button variant="ghost">Edit</Button>
                        </Link>
                        <DeleteButton
                          id={l.id}
                          apiPath="/api/portfolio/lessons"
                        />
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
