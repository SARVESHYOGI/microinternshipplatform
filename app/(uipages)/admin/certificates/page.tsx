"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

export default function CertificatesPage() {
  const [filterStatus, setFilterStatus] = useState("all");

  const certRequests = [
    {
      id: 1,
      studentName: "John Doe",
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      completedAt: "2025-01-01",
      status: "VERIFIED",
      hoursCompleted: 120,
    },
    {
      id: 2,
      studentName: "Sarah Smith",
      jobTitle: "Backend Engineer",
      company: "CloudServices",
      completedAt: "2024-12-28",
      status: "PENDING",
      hoursCompleted: 180,
    },
    {
      id: 3,
      studentName: "Alex Johnson",
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      completedAt: "2024-12-25",
      status: "ISSUED",
      hoursCompleted: 150,
    },
    {
      id: 4,
      studentName: "Emma Wilson",
      jobTitle: "UI/UX Designer",
      company: "DesignStudio",
      completedAt: "2024-12-20",
      status: "ISSUED",
      hoursCompleted: 100,
    },
  ];

  const filteredCerts = certRequests.filter(
    (cert) =>
      filterStatus === "all" ||
      cert.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ISSUED":
        return "bg-green-100 text-green-800";
      case "VERIFIED":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ISSUED":
        return "✅";
      case "VERIFIED":
        return "✔️";
      case "PENDING":
        return "⏳";
      default:
        return "❌";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="ADMIN" userName="Admin" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Certificate Management
          </h1>
          <p className="text-muted-foreground">
            Issue and verify completion certificates
          </p>
        </div>

        {/* Filter */}
        <Card className="border-border/40 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-3 flex-wrap">
              {["all", "pending", "verified", "issued"].map((status) => (
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

        {/* Certificates List */}
        <div className="space-y-4">
          {filteredCerts.map((cert) => (
            <Card
              key={cert.id}
              className="border-border/40 hover:border-border/80 transition-all"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {getStatusIcon(cert.status)}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {cert.studentName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.jobTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cert.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="font-semibold text-foreground">
                      {cert.hoursCompleted}h
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-sm text-foreground">
                      {cert.completedAt}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(cert.status)}>
                      {cert.status}
                    </Badge>
                    {cert.status === "VERIFIED" && (
                      <Button size="sm" asChild>
                        <Link href={`/admin/certificates/${cert.id}/issue`}>
                          Issue Certificate
                        </Link>
                      </Button>
                    )}
                    {cert.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border/40 bg-transparent"
                      >
                        Verify
                      </Button>
                    )}
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
