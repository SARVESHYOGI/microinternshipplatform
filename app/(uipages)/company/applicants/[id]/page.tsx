"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApplicantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [rating, setRating] = useState(4.5);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("REVIEWING");

  const applicant = {
    id: params.id,
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    jobApplied: "Frontend Developer",
    appliedAt: "2025-01-02",
    resumeUrl: "https://example.com/resume.pdf",
    linkedinUrl: "https://linkedin.com/in/alexjohnson",
    profileSummary:
      "Experienced frontend developer with 3+ years of React expertise. Passionate about building beautiful and performant user interfaces.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "REST APIs"],
    previousExperience: [
      {
        company: "Tech Company A",
        position: "Frontend Developer",
        duration: "2 years",
      },
      {
        company: "Startup B",
        position: "Junior Developer",
        duration: "1 year",
      },
    ],
    submission: {
      url: "https://example.com/submission",
      submittedAt: "2025-01-03",
      feedback: "Great work on the UI implementation!",
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "REVIEWING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="COMPANY" userName="TechCorp" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-lg">
                  {applicant.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {applicant.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {applicant.jobApplied}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Applied {applicant.appliedAt}
              </p>
            </div>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-lg">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-background dark:data-[state=active]:bg-zinc-800"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="submission"
                  className="data-[state=active]:bg-background dark:data-[state=active]:bg-zinc-800"
                >
                  Submission
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-background dark:data-[state=active]:bg-zinc-800"
                >
                  Notes
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                {/* Contact Information */}
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${applicant.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {applicant.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${applicant.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {applicant.phone}
                      </a>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border/40 bg-transparent"
                        asChild
                      >
                        <a
                          href={applicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Resume
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border/40 bg-transparent"
                        asChild
                      >
                        <a
                          href={applicant.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* About */}
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">
                      {applicant.profileSummary}
                    </p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-zinc-100 dark:bg-zinc-800"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {applicant.previousExperience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="pb-4 border-b border-border/40 last:border-0 last:pb-0"
                      >
                        <h4 className="font-semibold text-foreground">
                          {exp.position}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {exp.duration}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Submission Tab */}
              <TabsContent value="submission" className="space-y-6">
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>Work Submission</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Submission Link
                      </p>
                      <a
                        href={applicant.submission.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {applicant.submission.url}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Submitted On
                      </p>
                      <p className="text-foreground">
                        {applicant.submission.submittedAt}
                      </p>
                    </div>
                    {applicant.submission.feedback && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your Feedback
                        </p>
                        <p className="bg-secondary/50 p-3 rounded text-foreground">
                          {applicant.submission.feedback}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>Internal Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Add your internal notes about this applicant..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="bg-background border-border/40 min-h-32"
                    />
                    <Button className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900">
                      Save Notes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Card */}
            <Card className="border-border/40 bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-lg">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-3xl cursor-pointer transition-transform hover:scale-110"
                      >
                        {star <= rating ? "⭐" : "☆"}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {rating} / 5.0
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setStatus("SHORTLISTED")}
                  className={`w-full ${
                    status === "SHORTLISTED"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900"
                  }`}
                >
                  Shortlist
                </Button>
                <Button
                  onClick={() => setStatus("REJECTED")}
                  variant="outline"
                  className={`w-full border-border/40 ${
                    status === "REJECTED" ? "bg-red-50 dark:bg-red-900/20" : ""
                  }`}
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-border/40 bg-transparent"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium">Applied</p>
                      <p className="text-xs text-muted-foreground">
                        {applicant.appliedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                    <div>
                      <p className="text-sm font-medium">Under Review</p>
                      <p className="text-xs text-muted-foreground">
                        In progress
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
