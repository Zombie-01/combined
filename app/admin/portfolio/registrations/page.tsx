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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Lesson</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6">
                    No registrations
                  </TableCell>
                </TableRow>
              ) : (
                regs.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.user_id}</TableCell>
                    <TableCell>{r.lesson_id}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
