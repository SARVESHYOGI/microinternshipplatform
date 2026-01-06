"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole =
    searchParams.get("role") === "company" ? "COMPANY" : "STUDENT";

  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(e);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });
      const data = await response.json();
      console.log("Signup response:", data);
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    // await new Promise((r) => setTimeout(r, 1000));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-2xl text-foreground">WorkHub</span>
          </div>
        </div>

        {/* Signup Card */}
        <Card className="border border-border/40">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join our platform in a few steps</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-foreground"
                >
                  I am a
                </label>
                <Select
                  value={role}
                  onValueChange={setRole}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    id="role"
                    className="bg-background border-border/40"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="COMPANY">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  {role === "COMPANY" ? "Company Name" : "Full Name"}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder={role === "COMPANY" ? "Acme Inc." : "John Doe"}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isLoading}
                  required
                  className="bg-background border-border/40"
                />
              </div>

              {role === "COMPANY" && (
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-foreground"
                  >
                    Your Email
                  </label>
                  <Input
                    id="company"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isLoading}
                    required
                    className="bg-background border-border/40"
                  />
                </div>
              )}

              {role === "STUDENT" && (
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isLoading}
                    required
                    className="bg-background border-border/40"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={isLoading}
                  required
                  className="bg-background border-border/40"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  disabled={isLoading}
                  required
                  className="bg-background border-border/40"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/" className="hover:text-foreground transition">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
