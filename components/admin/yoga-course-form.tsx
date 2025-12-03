"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";

export default function YogaCourseForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const yogaTypes = [
    "Hatha",
    "Vinyasa",
    "Power Yoga",
    "Ashtanga",
    "Yin Yoga",
    "Restorative",
    "Hot Yoga",
    "Prenatal",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }
      if (!type) {
        setError("Yoga type is required");
        setLoading(false);
        return;
      }
      if (!imageUrl.trim()) {
        setError("Course image is required");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/yoga/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          type,
          price: price ? parseFloat(price) : 0,
          image_url: imageUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to create yoga course");
        setLoading(false);
        return;
      }

      router.push("/admin/yoga/courses");
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the yoga course");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Create Yoga Course</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Course title"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Yoga Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={loading}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-100"
                  required>
                  <option value="">Select yoga type</option>
                  {yogaTypes.map((yType) => (
                    <option key={yType} value={yType}>
                      {yType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Course description"
                  disabled={loading}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price in currency"
                  type="number"
                  step="0.01"
                  min="0"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Image *
                </label>
                <ImageUpload
                  value={imageUrl}
                  onChange={setImageUrl}
                  bucket="yoga-courses"
                  onError={setError}
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
                  {loading ? "Creating..." : "Create Course"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => router.push("/admin/yoga/courses")}>
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
