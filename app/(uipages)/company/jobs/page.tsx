"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

export default function CompanyJobsPage() {
  const [filterStatus, setFilterStatus] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      status: "OPEN",
      applications: 18,
      shortlisted: 4,
      createdAt: "5 days ago",
      duration: 4,
    },
    {
      id: 2,
      title: "Backend Engineer",
      status: "OPEN",
      applications: 12,
      shortlisted: 3,
      createdAt: "3 days ago",
      duration: 6,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      status: "OPEN",
      applications: 8,
      shortlisted: 2,
      createdAt: "1 day ago",
      duration: 8,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      status: "CLOSED",
      applications: 15,
      shortlisted: 5,
      createdAt: "20 days ago",
      duration: 6,
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      filterStatus === "all" ||
      job.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="COMPANY" userName="TechCorp" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Job Postings
            </h1>
            <p className="text-muted-foreground">
              Manage and track all your job postings
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/company/jobs/new">Post New Job</Link>
          </Button>
        </div>

        {/* Filter */}
        <Card className="border-border/40 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-3 flex-wrap">
              {["all", "open", "closed"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  className={
                    filterStatus !== status
                      ? "border-border/40 bg-transparent"
                      : ""
                  }
                  size="sm"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="border-border/40 hover:border-border/80 transition-all"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.duration} weeks • Posted {job.createdAt}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Applications
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {job.applications}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Shortlisted
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {job.shortlisted}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge
                      className={
                        job.status === "OPEN"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {job.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-border/40 bg-transparent"
                    >
                      <Link href={`/company/jobs/${job.id}`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
