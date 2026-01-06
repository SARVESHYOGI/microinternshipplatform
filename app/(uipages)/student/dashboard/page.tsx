import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function StudentDashboard() {
  const token = (await cookies()).get("token")?.value;

  let userName = "Student";
  let userRole = "STUDENT";

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      userName = payload.name as string;
      userRole = payload.role as string;
    } catch (error) {
      console.error("Invalid JWT", error);
    }
  }
  const stats = [
    { label: "Total Applications", value: "8", icon: "📝" },
    { label: "In Review", value: "2", icon: "⏳" },
    { label: "Completed Jobs", value: "3", icon: "✅" },
    { label: "Certificates", value: "3", icon: "🎓" },
  ];

  const recentApplications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      status: "SHORTLISTED",
      appliedAt: "2 days ago",
    },
    {
      id: 2,
      jobTitle: "UI/UX Designer",
      company: "DesignStudio",
      status: "APPLIED",
      appliedAt: "1 week ago",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      status: "COMPLETED",
      appliedAt: "2 weeks ago",
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "React Developer",
      company: "WebAgency",
      duration: "4 weeks",
      pay: "$2,000",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CloudServices",
      duration: "6 weeks",
      pay: "$2,500",
      skills: ["Python", "Django", "PostgreSQL"],
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="STUDENT" userName={userName} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome Back, {userName}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your job hunting journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border/40">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="border-border/40 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      Your latest job applications and their status
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-border/40 bg-transparent"
                  >
                    <Link href="/student/applications">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:border-border/80 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {app.jobTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {app.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {app.appliedAt}
                        </p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>
                  Jobs matching your skills and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-lg border border-border/40 hover:border-border/80 hover:bg-secondary/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>⏱️ {job.duration}</span>
                            <span>💰 {job.pay}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
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
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/student/jobs/${job.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Quick Actions */}
          <div>
            <Card className="border-border/40 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/student/jobs">Browse All Jobs</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/student/profile">Update Profile</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/student/profile">View Certificates</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Profile Progress */}
            <Card className="border-border/40 mt-6">
              <CardHeader>
                <CardTitle className="text-base">Profile Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Completion</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add a resume to increase your chances of getting hired.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/student/profile/resume">Upload Resume</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
