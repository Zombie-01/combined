import React from "react";
import AdminSidebar from "@/components/admin/sidebar";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen w-screen bg-surface text-foreground">
          <AdminSidebar />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
