"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function JobsListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDuration, setFilterDuration] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      description: "Build responsive web interfaces using React and TypeScript",
      duration: 4,
      pay: 2000,
      skills: ["React", "TypeScript", "CSS"],
      level: "Intermediate",
      status: "OPEN",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CloudServices",
      description: "Develop scalable APIs and database solutions",
      duration: 6,
      pay: 2500,
      skills: ["Python", "Django", "PostgreSQL"],
      level: "Intermediate",
      status: "OPEN",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      description: "Work on the entire stack of our SaaS product",
      duration: 8,
      pay: 3000,
      skills: ["React", "Node.js", "MongoDB"],
      level: "Advanced",
      status: "OPEN",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "DesignStudio",
      description: "Design beautiful and intuitive user interfaces",
      duration: 4,
      pay: 1800,
      skills: ["Figma", "Design Systems", "Prototyping"],
      level: "Intermediate",
      status: "OPEN",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration =
      filterDuration === "all" || job.duration.toString() === filterDuration;
    return matchesSearch && matchesDuration;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="STUDENT" userName="John Doe" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Available Opportunities
          </h1>
          <p className="text-muted-foreground">
            Find and apply to jobs that match your skills
          </p>
        </div>

        {/* Filters */}
        <Card className="border-border/40 mb-8">
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Jobs</label>
                <Input
                  placeholder="Search by title or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background border-border/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select
                  value={filterDuration}
                  onValueChange={setFilterDuration}
                >
                  <SelectTrigger className="bg-background border-border/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="4">4 Weeks</SelectItem>
                    <SelectItem value="6">6 Weeks</SelectItem>
                    <SelectItem value="8">8 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="border-border/40 hover:border-border/80 hover:shadow-md transition-all"
              >
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary"
                        >
                          {job.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span>⏱️ {job.duration} weeks</span>
                        <span>💰 ${job.pay.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div></div>
                      <Button asChild className="w-full">
                        <Link href={`/student/jobs/${job.id}`}>
                          View & Apply
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-border/40">
              <CardContent className="pt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No jobs found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="border-border/40 bg-transparent"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
