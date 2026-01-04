import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ApplicantsPage() {
  const applicants = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      jobApplied: "Frontend Developer",
      status: "SHORTLISTED",
      rating: 4.5,
      appliedAt: "2 days ago",
      resume: true,
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      jobApplied: "Backend Engineer",
      status: "REVIEWING",
      rating: 4.2,
      appliedAt: "3 days ago",
      resume: true,
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@example.com",
      jobApplied: "Frontend Developer",
      status: "NEW",
      rating: 0,
      appliedAt: "1 day ago",
      resume: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      jobApplied: "Full Stack Developer",
      status: "REJECTED",
      rating: 3.8,
      appliedAt: "5 days ago",
      resume: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-green-100 text-green-800";
      case "REVIEWING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="COMPANY" userName="TechCorp" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Applicants
          </h1>
          <p className="text-muted-foreground">
            Review and manage your job applicants
          </p>
        </div>

        {/* Filter */}
        <Card className="border-border/40 mb-8">
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Status</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-background border-border/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all">All Applications</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Job</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-background border-border/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Engineer</SelectItem>
                    <SelectItem value="fullstack">
                      Full Stack Developer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applicants List */}
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <Card
              key={applicant.id}
              className="border-border/40 hover:border-border/80 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-foreground">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {applicant.email}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {applicant.jobApplied}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Applied</p>
                    <p className="text-sm font-semibold text-foreground">
                      {applicant.appliedAt}
                    </p>
                  </div>

                  <div>
                    {applicant.rating > 0 ? (
                      <>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="text-sm font-semibold text-foreground">
                          ⭐ {applicant.rating}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className={getStatusColor(applicant.status)}>
                          {applicant.status}
                        </Badge>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(applicant.status)}>
                      {applicant.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border/40 bg-transparent"
                    >
                      Review
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
