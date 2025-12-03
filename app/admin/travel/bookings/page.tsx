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
import { listTravelBookings } from "@/lib/supabase/actions";

export default async function Page() {
  const bookings = await listTravelBookings();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-50 text-green-800";
      case "pending":
        return "bg-yellow-50 text-yellow-800";
      case "cancelled":
        return "bg-red-50 text-red-800";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Travel Bookings</h1>
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
                  <TableHead>Destination</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>From Date</TableHead>
                  <TableHead>To Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booked Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6">
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
                        {b.travel_items?.title || "N/A"}
                      </TableCell>
                      <TableCell>{b.travel_items?.location || "N/A"}</TableCell>
                      <TableCell>{b.travel_items?.country || "N/A"}</TableCell>
                      <TableCell>
                        {b.date_from
                          ? new Date(b.date_from).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {b.date_to
                          ? new Date(b.date_to).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                            b.status
                          )}`}>
                          {b.status || "N/A"}
                        </span>
                      </TableCell>
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
