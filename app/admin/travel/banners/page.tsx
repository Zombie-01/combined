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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { listBanners } from "@/lib/supabase/actions";

export default async function Page() {
  const banners = await listBanners();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Banners</h1>
        <Link href="/admin/travel/banners/create">
          <Button>Create Banner</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Banners</CardTitle>
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
              {banners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6">
                    No banners
                  </TableCell>
                </TableRow>
              ) : (
                banners.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.text}</TableCell>
                    <TableCell>
                      <Link href={`/admin/travel/banners/${b.id}`}>
                        <Button variant="ghost">Edit</Button>
                      </Link>
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
