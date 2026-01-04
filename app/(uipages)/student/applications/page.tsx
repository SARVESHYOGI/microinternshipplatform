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

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      status: "SHORTLISTED",
      appliedAt: "2025-01-02",
      feedback: "We loved your portfolio! Moving to next round.",
    },
    {
      id: 2,
      jobTitle: "UI/UX Designer",
      company: "DesignStudio",
      status: "APPLIED",
      appliedAt: "2025-01-01",
      feedback: undefined,
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      status: "COMPLETED",
      appliedAt: "2024-12-15",
      feedback:
        "Congratulations! You've been hired. Check your email for details.",
    },
    {
      id: 4,
      jobTitle: "Backend Engineer",
      company: "CloudServices",
      status: "REJECTED",
      appliedAt: "2024-12-10",
      feedback:
        "Thank you for applying. We've decided to move forward with another candidate.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return "📋";
      case "COMPLETED":
        return "✅";
      case "REJECTED":
        return "❌";
      default:
        return "⏳";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="STUDENT" userName="John Doe" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Applications
          </h1>
          <p className="text-muted-foreground">
            Track the status of your job applications
          </p>
        </div>

        {/* Filter */}
        <Card className="border-border/40 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Filter by Status</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-background border-border/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all">All Applications</SelectItem>
                    <SelectItem value="APPLIED">Applied</SelectItem>
                    <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="border-border/40 hover:border-border/80 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">
                        {getStatusIcon(app.status)}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {app.jobTitle}
                        </h3>
                        <p className="text-muted-foreground">{app.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Applied on {app.appliedAt}
                    </p>
                    {app.feedback && (
                      <p className="text-sm bg-secondary/50 p-3 rounded italic">
                        {app.feedback}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                    <Button
                      variant="outline"
                      className="border-border/40 bg-transparent"
                    >
                      View Job
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
