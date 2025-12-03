import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getStats } from "@/lib/supabase/actions";

export default async function Page() {
  const stats = await getStats();

  const cards = [
    { title: "Lessons", value: stats.lessons },
    { title: "Portfolio Registrations", value: stats.portfolioRegs },
    { title: "Travel Items", value: stats.travelItems },
    { title: "Travel Bookings", value: stats.travelBookings },
    { title: "Yoga Courses", value: stats.yogaCourses },
    { title: "Yoga Bookings", value: stats.yogaBookings },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Card key={c.title}>
          <CardHeader>
            <CardTitle>{c.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{c.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
