"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { toast } from "sonner";

type Props = {
  id: string;
  apiPath: string; // e.g. /api/portfolio/lessons
  confirmMessage?: string;
};

export default function DeleteButton({ id, apiPath, confirmMessage }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm(
      confirmMessage || "Are you sure you want to delete this item?"
    );
    if (!ok) return;

    try {
      const res = await fetch(apiPath, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = data?.error || "Failed to delete item";
        toast.error(message);
        return;
      }

      toast.success("Deleted successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred while deleting");
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} className="ml-2">
      Delete
    </Button>
  );
}
