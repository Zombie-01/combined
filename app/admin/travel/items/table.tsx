"use client";

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

interface TravelItem {
  id: string;
  title: string;
}

export default function TravelItemsTable({ items }: { items: TravelItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center py-6">
              No items
            </TableCell>
          </TableRow>
        ) : (
          items.map((it) => (
            <TableRow key={it.id}>
              <TableCell>{it.title}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Link href={`/admin/travel/items/${it.id}`}>
                    <Button variant="ghost">Edit</Button>
                  </Link>
                  <DeleteButton id={it.id} apiPath="/api/travel/items" />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
