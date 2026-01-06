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
export default async function CompanyDashboard() {
  const token = (await cookies()).get("token")?.value;

  let userName = "Company";
  let userRole = "COMPANY";

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
    { label: "Active Jobs", value: "5", icon: "📢", color: "text-blue-600" },
    {
      label: "Total Applications",
      value: "42",
      icon: "📥",
      color: "text-purple-600",
    },
    { label: "Shortlisted", value: "12", icon: "⭐", color: "text-yellow-600" },
    { label: "Hired", value: "3", icon: "✅", color: "text-green-600" },
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      applicants: 18,
      shortlisted: 4,
      status: "OPEN",
      createdAt: "5 days ago",
    },
    {
      id: 2,
      title: "Backend Engineer",
      applicants: 12,
      shortlisted: 3,
      status: "OPEN",
      createdAt: "3 days ago",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      applicants: 8,
      shortlisted: 2,
      status: "OPEN",
      createdAt: "1 day ago",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: "Alex Johnson",
      jobTitle: "Frontend Developer",
      appliedAt: "2 hours ago",
      status: "NEW",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Sarah Smith",
      jobTitle: "Backend Engineer",
      appliedAt: "1 day ago",
      status: "REVIEWING",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Mike Brown",
      jobTitle: "Full Stack Developer",
      appliedAt: "2 days ago",
      status: "SHORTLISTED",
      rating: 4.8,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="COMPANY" userName={userName} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Company Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your job postings and review applicants
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/company/jobs/new">Post New Job</Link>
          </Button>
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
                  <span className={`text-3xl ${stat.color}`}>{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Jobs and Applications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Jobs */}
            <Card className="border-border/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Jobs</CardTitle>
                    <CardDescription>
                      Your currently open job postings
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-border/40 bg-transparent"
                  >
                    <Link href="/company/jobs">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-lg border border-border/40 hover:border-border/80"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Posted {job.createdAt}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Total Applications
                          </p>
                          <p className="font-semibold text-foreground">
                            {job.applicants}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Shortlisted</p>
                          <p className="font-semibold text-foreground">
                            {job.shortlisted}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-3 border-border/40 bg-transparent"
                      >
                        Review Applicants
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card className="border-border/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      Latest applicants across all your jobs
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-border/40 bg-transparent"
                  >
                    <Link href="/company/applicants">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-lg border border-border/40 hover:border-border/80"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {app.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {app.jobTitle}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <span className="text-sm text-yellow-600">⭐</span>
                            <span className="font-semibold text-foreground">
                              {app.rating}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {app.appliedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          className={
                            app.status === "NEW"
                              ? "bg-blue-100 text-blue-800"
                              : app.status === "SHORTLISTED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {app.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 border-border/40 bg-transparent text-xs"
                        >
                          View Resume
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
                  <Link href="/company/jobs/new">Post a New Job</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/company/applicants">Review Applicants</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/company/profile">Company Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Company Stats */}
            <Card className="border-border/40 mt-6">
              <CardHeader>
                <CardTitle className="text-base">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Company Name</p>
                  <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">
                    Verification Status
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Subscription Plan</p>
                  <p className="text-sm text-muted-foreground">Premium Plan</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/company/profile">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
