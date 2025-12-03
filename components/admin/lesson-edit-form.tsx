"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";

type Lesson = {
  id: string;
  title?: string;
  description?: string;
  image_url?: string | null;
  video_url?: string | null;
  created_at?: string | null;
};

export default function LessonEditForm({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson?.title ?? "");
  const [description, setDescription] = useState(lesson?.description ?? "");
  const [imageUrl, setImageUrl] = useState(lesson?.image_url ?? "");
  const [videoUrl, setVideoUrl] = useState(lesson?.video_url ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!title.trim()) {
        setError("Title is required");
        toast.error("Title is required");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/portfolio/lessons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lesson.id,
          title,
          description,
          image_url: imageUrl,
          video_url: videoUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || "Failed to update lesson";
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      toast.success("Lesson updated");
      // Refresh server data for this page
      router.refresh();
    } catch (err) {
      console.error(err);
      const msg = "An unexpected error occurred";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const ok = confirm("Are you sure you want to delete this lesson?");
    if (!ok) return;
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio/lessons", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lesson.id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || "Failed to delete lesson";
        toast.error(msg);
        setLoading(false);
        return;
      }

      toast.success("Lesson deleted");
      router.push("/admin/portfolio/lessons");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <ImageUpload
            value={imageUrl ?? ""}
            onChange={setImageUrl}
            bucket="images"
            onError={setError}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="lesson"
              className="mt-2 max-h-48 rounded object-cover"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Video URL</label>
          <Input
            value={videoUrl ?? ""}
            onChange={(e) => setVideoUrl(e.target.value)}
            disabled={loading}
          />
        </div>

        {lesson.created_at && (
          <div className="text-sm text-muted-foreground">
            Created: {new Date(lesson.created_at).toLocaleString()}
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700">
            {loading ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}>
            Delete Lesson
          </Button>
        </div>
      </div>
    </form>
  );
}
