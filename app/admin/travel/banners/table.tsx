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

interface Banner {
  id?: string;
  text?: string;
  image_url?: string;
  link?: string;
  created_at?: string;
}

export default function BannersTable({ banners }: { banners: Banner[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Text</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6">
              No banners
            </TableCell>
          </TableRow>
        ) : (
          banners.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.text}</TableCell>
              <TableCell>
                {b.image_url ? (
                  <img
                    src={b.image_url}
                    alt={b.text}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {b.link || "-"}
              </TableCell>
              <TableCell>
                {b.created_at
                  ? new Date(b.created_at).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/travel/banners/${b.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <DeleteButton id={b.id || ""} apiPath="/api/travel/banners" />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
