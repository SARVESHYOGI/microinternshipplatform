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

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "1,245",
      icon: "👥",
      color: "text-blue-600",
    },
    { label: "Active Jobs", value: "87", icon: "📢", color: "text-purple-600" },
    {
      label: "Completed Jobs",
      value: "234",
      icon: "✅",
      color: "text-green-600",
    },
    {
      label: "Certificates Issued",
      value: "198",
      icon: "🎓",
      color: "text-yellow-600",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "STUDENT",
      joinedAt: "2 hours ago",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "TechCorp Inc.",
      email: "recruit@techcorp.com",
      role: "COMPANY",
      joinedAt: "1 day ago",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "STUDENT",
      joinedAt: "3 days ago",
      status: "ACTIVE",
    },
  ];

  const pendingVerifications = [
    {
      id: 1,
      companyName: "StartupXYZ",
      type: "COMPANY_VERIFICATION",
      submittedAt: "2 days ago",
    },
    {
      id: 2,
      companyName: "CloudServices",
      type: "COMPANY_VERIFICATION",
      submittedAt: "1 day ago",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      type: "JOB_APPROVAL",
      submittedAt: "5 hours ago",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="ADMIN" userName="Admin" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor platform activity and manage users
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
                  <span className={`text-3xl ${stat.color}`}>{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Users and Verifications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Users */}
            <Card className="border-border/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Signups</CardTitle>
                    <CardDescription>Latest registered users</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-border/40 bg-transparent"
                  >
                    <Link href="/admin/users">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 rounded-lg border border-border/40 hover:border-border/80"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {user.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className={
                                user.role === "STUDENT"
                                  ? "text-blue-600 border-blue-200"
                                  : "text-purple-600 border-purple-200"
                              }
                            >
                              {user.role}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {user.joinedAt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Verifications */}
            <Card className="border-border/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending Verifications</CardTitle>
                    <CardDescription>Items awaiting approval</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-border/40 bg-transparent"
                  >
                    <Link href="/admin/verifications">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-border/40 hover:border-border/80"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {item.type === "COMPANY_VERIFICATION"
                              ? item.companyName
                              : item.jobTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.type === "COMPANY_VERIFICATION"
                              ? "Company Verification"
                              : "Job Approval"}{" "}
                            • {item.submittedAt}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border/40 bg-transparent"
                          >
                            Review
                          </Button>
                        </div>
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
                <CardTitle className="text-lg">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-transparent border-border/40 bg-transparent"
                  variant="outline"
                >
                  <Link href="/admin/users">Manage Users</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-transparent border-border/40 bg-transparent"
                  variant="outline"
                >
                  <Link href="/admin/jobs">Manage Jobs</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-transparent border-border/40 bg-transparent"
                  variant="outline"
                >
                  <Link href="/admin/verifications">Verify Submissions</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-transparent border-border/40 bg-transparent"
                  variant="outline"
                >
                  <Link href="/admin/certificates">Issue Certificates</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Platform Health */}
            <Card className="border-border/40 mt-6">
              <CardHeader>
                <CardTitle className="text-base">Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">System Status</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Operational
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Database Usage</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    65% of quota
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">API Calls (24h)</p>
                  <p className="text-lg font-bold text-foreground">12,451</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
