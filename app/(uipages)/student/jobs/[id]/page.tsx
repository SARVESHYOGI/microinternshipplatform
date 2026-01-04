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

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = {
    id: params.id,
    title: "Frontend Developer",
    company: "TechCorp",
    description: "Build responsive web interfaces using React and TypeScript",
    fullDescription: `
We're looking for an experienced Frontend Developer to join our team at TechCorp. You'll be working on our flagship product,
building modern web applications using React and TypeScript.

As a Frontend Developer, you'll:
- Develop and maintain responsive web interfaces
- Work with our design team to implement pixel-perfect designs
- Collaborate with backend engineers to integrate APIs
- Write clean, maintainable code following best practices
- Participate in code reviews and contribute to our engineering culture

Requirements:
- 2+ years of experience with React
- Strong knowledge of TypeScript
- Experience with CSS and responsive design
- Understanding of web performance optimization
- Good communication skills and ability to work in a team
    `,
    duration: 4,
    pay: 2000,
    skills: ["React", "TypeScript", "CSS", "REST APIs"],
    level: "Intermediate",
    status: "OPEN",
    postedAt: "2 days ago",
    applicants: 24,
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="STUDENT" userName="John Doe" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="mb-4 border-border/40 bg-transparent"
          >
            <Link href="/student/jobs">← Back to Jobs</Link>
          </Button>

          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-muted-foreground">{job.company}</p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <Badge>{job.level}</Badge>
                <Badge variant="outline">{job.applicants} applicants</Badge>
                <Badge variant="outline">Posted {job.postedAt}</Badge>
              </div>
            </div>
            <Button size="lg">Apply Now</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Overview */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Duration
                    </p>
                    <p className="font-semibold text-lg">
                      {job.duration} weeks
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Compensation
                    </p>
                    <p className="font-semibold text-lg">
                      ${job.pay.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <p className="font-semibold text-lg text-green-600">Open</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>About This Job</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground">
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {job.fullDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Apply Card */}
            <Card className="border-border/40 sticky top-24 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ready to Apply?</CardTitle>
                <CardDescription>Join {job.company} today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
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
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-border/40 bg-transparent"
                >
                  Save Job
                </Button>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg">About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="w-full h-16 rounded bg-gradient-to-r from-primary/20 to-accent/20 mb-4"></div>
                  <p className="text-sm text-muted-foreground">
                    TechCorp is a leading software development company focused
                    on building innovative solutions for enterprises worldwide.
                  </p>
                </div>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-border/40 bg-transparent"
                >
                  <Link href="/student/company/techcorp">View Company</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
