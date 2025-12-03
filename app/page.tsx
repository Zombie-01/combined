"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // disable Next.js caching

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          Unified Admin
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-700">
          Manage Portfolio, Travel, and Yoga sites from a single dashboard.
          Quick links below take you to a site preview and admin login for
          management.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/admin/login">
            <Button variant="default">Admin Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Websites</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">Portfolio</h3>
            <p className="mb-4 text-sm text-gray-600">
              Showcase lessons and registrations.
            </p>
            <div className="flex gap-2">
              <Link href="/portfolio">
                <Button variant="ghost">Preview</Button>
              </Link>
              <Link href="/admin/portfolio/lessons">
                <Button variant="outline">Manage</Button>
              </Link>
            </div>
          </article>

          <article className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">Travel</h3>
            <p className="mb-4 text-sm text-gray-600">
              Manage items, bookings and banners.
            </p>
            <div className="flex gap-2">
              <Link href="/travel">
                <Button variant="ghost">Preview</Button>
              </Link>
              <Link href="/admin/travel/items">
                <Button variant="outline">Manage</Button>
              </Link>
            </div>
          </article>

          <article className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">Yoga</h3>
            <p className="mb-4 text-sm text-gray-600">
              Courses and bookings administration.
            </p>
            <div className="flex gap-2">
              <Link href="/yoga">
                <Button variant="ghost">Preview</Button>
              </Link>
              <Link href="/admin/yoga/courses">
                <Button variant="outline">Manage</Button>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
