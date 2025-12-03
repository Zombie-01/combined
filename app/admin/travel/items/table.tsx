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
  id?: string;
  title?: string;
  description?: string;
  category_id?: string;
  country?: string;
  location?: string;
  price?: number;
  image_url?: string;
  created_at?: string;
}

export default function TravelItemsTable({ items }: { items: TravelItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6">
              No items
            </TableCell>
          </TableRow>
        ) : (
          items.map((it) => (
            <TableRow key={it.id}>
              <TableCell>{it.title}</TableCell>
              <TableCell className="max-w-xs truncate">
                {it.description}
              </TableCell>
              <TableCell>{it.country}</TableCell>
              <TableCell>{it.location}</TableCell>
              <TableCell>{it.price ? `$${it.price}` : "-"}</TableCell>
              <TableCell>
                {it.created_at
                  ? new Date(it.created_at).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/travel/items/${it.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <DeleteButton id={it.id || ""} apiPath="/api/travel/items" />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
