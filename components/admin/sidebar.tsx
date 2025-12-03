"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/portfolio/lessons", label: "Portfolio → Lessons" },
    {
      href: "/admin/portfolio/registrations",
      label: "Portfolio → Registrations",
    },
    { href: "/admin/travel/categories", label: "Travel → Categories" },
    { href: "/admin/travel/items", label: "Travel → Items" },
    { href: "/admin/travel/bookings", label: "Travel → Bookings" },
    { href: "/admin/travel/banners", label: "Travel → Banners" },
    { href: "/admin/yoga/courses", label: "Yoga → Courses" },
    { href: "/admin/yoga/bookings", label: "Yoga → Bookings" },
  ];

  return (
    <aside
      className={`transition-all duration-200 flex-shrink-0 bg-background border-r px-2 py-4 ${
        collapsed ? "w-16" : "w-64"
      }`}>
      <div className="flex items-center justify-between px-2 pb-4">
        <div
          className={`flex items-center gap-2 ${
            collapsed ? "justify-center w-full" : ""
          }`}>
          <h2
            className={`text-lg font-semibold truncate ${
              collapsed ? "sr-only" : ""
            }`}>
            Admin
          </h2>
          {!collapsed && (
            <span className="text-sm text-muted-foreground">Unified</span>
          )}
        </div>

        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((s) => !s)}
          className="-mr-2 rounded p-1 text-sm text-gray-600 hover:bg-gray-100">
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex flex-col space-y-1 px-1">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="block">
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              className={`w-full justify-start ${collapsed ? "px-0" : ""}`}
              title={l.label}
              aria-label={l.label}>
              {collapsed ? (
                <span className="inline-block w-6 text-center font-semibold">
                  {l.label.charAt(0)}
                </span>
              ) : (
                <span className="truncate">{l.label}</span>
              )}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
