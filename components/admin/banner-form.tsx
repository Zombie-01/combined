"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";

export default function BannerForm() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!imageUrl.trim()) {
        setError("Banner image is required");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/travel/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          image_url: imageUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to create banner");
        setLoading(false);
        return;
      }

      router.push("/admin/travel/banners");
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the banner");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Create Banner</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Banner Image *
                </label>
                <ImageUpload
                  value={imageUrl}
                  onChange={setImageUrl}
                  bucket="images"
                  onError={setError}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Banner Text
                </label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Banner text or description"
                  disabled={loading}
                  rows={3}
                />
              </div>

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
                  {loading ? "Creating..." : "Create Banner"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => router.push("/admin/travel/banners")}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
