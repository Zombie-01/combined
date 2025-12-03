import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { listYogaBookings } from "@/lib/supabase/actions";

export default async function Page() {
  const bookings = await listYogaBookings();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Yoga Bookings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Booked Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No bookings
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((b: any) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {b.users?.name || "N/A"}
                      </TableCell>
                      <TableCell>{b.users?.email || "N/A"}</TableCell>
                      <TableCell className="font-medium">
                        {b.yoga_courses?.title || "N/A"}
                      </TableCell>
                      <TableCell>{b.yoga_courses?.type || "N/A"}</TableCell>
                      <TableCell>{b.schedule || "N/A"}</TableCell>
                      <TableCell>
                        {b.created_at
                          ? new Date(b.created_at).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
