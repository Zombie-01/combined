"use client";

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

interface YogaCourse {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  image_url?: string;
  created_at?: string;
}

export default function YogaCoursesTable({
  courses,
}: {
  courses: YogaCourse[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              No courses
            </TableCell>
          </TableRow>
        ) : (
          courses.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.title}</TableCell>
              <TableCell className="max-w-xs truncate">
                {c.description}
              </TableCell>
              <TableCell>{c.price ? `$${c.price}` : "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/yoga/courses/${c.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <DeleteButton id={c.id || ""} apiPath="/api/yoga/courses" />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
