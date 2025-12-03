import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/admin/login-form";

export default async function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
