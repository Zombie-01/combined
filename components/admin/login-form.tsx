"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        setSuccess("Login successful — redirecting...");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await register(name, email, password);
      if (!res.success) {
        setError(res.error ?? (res as any).message ?? "Registration failed");
        setLoading(false);
      } else {
        setSuccess("Registration successful — signing in...");
        // attempt auto-login
        const ok = await login(email, password);
        if (ok) {
          router.push("/admin/dashboard");
        } else {
          setError("Registration succeeded but auto-login failed");
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {mode === "login" ? "Sign in" : "Register"}
        </h3>
        <button
          type="button"
          className="text-sm text-muted-foreground underline"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
            setSuccess(null);
          }}>
          {mode === "login" ? "Create account" : "Have an account? Sign in"}
        </button>
      </div>

      <form
        onSubmit={mode === "login" ? handleLogin : handleRegister}
        className="flex flex-col space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error ? <div className="text-sm text-destructive">{error}</div> : null}
        {success ? <div className="text-sm text-success">{success}</div> : null}

        <div className="pt-2">
          <Button type="submit" disabled={loading}>
            {loading
              ? mode === "login"
                ? "Signing in…"
                : "Creating…"
              : mode === "login"
              ? "Login"
              : "Create account"}
          </Button>
        </div>
      </form>
    </div>
  );
}
