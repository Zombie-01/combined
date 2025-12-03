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
import { listPortfolioRegistrations } from "@/lib/supabase/actions";

export default async function Page() {
  const regs = await listPortfolioRegistrations();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Portfolio Registrations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Registered Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      No registrations
                    </TableCell>
                  </TableRow>
                ) : (
                  regs.map((r: any) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {r.users?.name || "N/A"}
                      </TableCell>
                      <TableCell>{r.users?.email || "N/A"}</TableCell>
                      <TableCell>
                        {r.portfolio_lessons?.title || "N/A"}
                      </TableCell>
                      <TableCell>
                        {r.created_at
                          ? new Date(r.created_at).toLocaleDateString()
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
