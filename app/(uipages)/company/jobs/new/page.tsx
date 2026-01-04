"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { type FormEvent, useState } from "react";

export default function PostJobPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    payAmount: "",
    skillsRequired: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Submit job posting
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="COMPANY" userName="TechCorp" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="mb-4 border-border/40 bg-transparent"
          >
            <Link href="/company/jobs">← Back to Jobs</Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Post a New Job
          </h1>
          <p className="text-muted-foreground">
            Create a job posting to attract talented candidates
          </p>
        </div>

        <div className="max-w-2xl">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill in the information about your job opening
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Job Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior React Developer"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    disabled={isLoading}
                    required
                    className="bg-background border-border/40"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Job Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    disabled={isLoading}
                    required
                    className="bg-background border-border/40 resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium">
                      Duration (weeks)
                    </label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) =>
                        setFormData({ ...formData, duration: value })
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger
                        id="duration"
                        className="bg-background border-border/40"
                      >
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border/40">
                        <SelectItem value="2">2 weeks</SelectItem>
                        <SelectItem value="4">4 weeks</SelectItem>
                        <SelectItem value="6">6 weeks</SelectItem>
                        <SelectItem value="8">8 weeks</SelectItem>
                        <SelectItem value="12">12 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pay" className="text-sm font-medium">
                      Payment Amount ($)
                    </label>
                    <Input
                      id="pay"
                      type="number"
                      placeholder="e.g., 2000"
                      value={formData.payAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, payAmount: e.target.value })
                      }
                      disabled={isLoading}
                      required
                      className="bg-background border-border/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="skills" className="text-sm font-medium">
                    Required Skills (comma-separated)
                  </label>
                  <Input
                    id="skills"
                    placeholder="e.g., React, TypeScript, Node.js, PostgreSQL"
                    value={formData.skillsRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        skillsRequired: e.target.value,
                      })
                    }
                    disabled={isLoading}
                    required
                    className="bg-background border-border/40"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Posting..." : "Post Job"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
