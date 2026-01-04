import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VerificationsPage() {
  const submissions = [
    {
      id: 1,
      type: "COMPANY_VERIFICATION",
      companyName: "StartupXYZ",
      submittedAt: "2 days ago",
      documents: ["Certificate of Incorporation", "Tax ID"],
    },
    {
      id: 2,
      type: "COMPANY_VERIFICATION",
      companyName: "CloudServices",
      submittedAt: "1 day ago",
      documents: ["Business License", "Tax Documentation"],
    },
    {
      id: 3,
      type: "JOB_APPROVAL",
      jobTitle: "Full Stack Developer @ StartupXYZ",
      submittedAt: "5 hours ago",
      documents: ["Job Description", "Contract Template"],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="ADMIN" userName="Admin" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Pending Verifications
          </h1>
          <p className="text-muted-foreground">
            Review and approve pending company and job submissions
          </p>
        </div>

        {/* Submissions */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card
              key={submission.id}
              className="border-border/40 hover:border-border/80 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-5 gap-6 items-start">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {submission.type === "COMPANY_VERIFICATION"
                        ? submission.companyName
                        : submission.jobTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {submission.type === "COMPANY_VERIFICATION"
                        ? "Company Verification"
                        : "Job Posting Approval"}
                    </p>
                    <div className="space-y-1">
                      {submission.documents.map((doc, i) => (
                        <p key={i} className="text-xs text-muted-foreground">
                          • {doc}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Submitted
                    </p>
                    <p className="font-semibold text-foreground">
                      {submission.submittedAt}
                    </p>
                  </div>

                  <div>
                    <Badge
                      variant="outline"
                      className="border-yellow-200 text-yellow-700"
                    >
                      Pending Review
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm">Approve</Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border/40 bg-transparent"
                    >
                      Request Info
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
