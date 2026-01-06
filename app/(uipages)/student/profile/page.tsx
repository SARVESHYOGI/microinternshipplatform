"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    profileSummary:
      "Passionate full-stack developer with 2 years of experience building web applications.",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    resumeUrl: "https://example.com/resume.pdf",
    rating: 4.8,
  });

  const [formData, setFormData] = useState(profile);

  const certificates = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      issuedAt: "2024-12-15",
      verificationHash: "CERT-2024-001",
      certificateUrl: "https://example.com/cert1.pdf",
    },
    {
      id: 2,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      issuedAt: "2024-11-20",
      verificationHash: "CERT-2024-002",
      certificateUrl: "https://example.com/cert2.pdf",
    },
  ];

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="STUDENT" userName={profile.name} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your profile information and view certificates
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-lg">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-background dark:data-[state=active]:bg-zinc-800"
            >
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-background dark:data-[state=active]:bg-zinc-800"
            >
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Personal Information */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="bg-background border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={formData.email}
                      disabled
                      className="bg-background border-border/40 text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Summary</label>
                  <Textarea
                    value={formData.profileSummary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileSummary: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className="bg-background border-border/40 min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Resume URL</label>
                  <Input
                    value={formData.resumeUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, resumeUrl: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="https://example.com/resume.pdf"
                    className="bg-background border-border/40"
                  />
                  {formData.resumeUrl && (
                    <a
                      href={formData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Download Resume
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-zinc-100 dark:bg-zinc-800"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-2 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      id="skillInput"
                      placeholder="Add a new skill"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSkillAdd((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                      className="bg-background border-border/40"
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById(
                          "skillInput"
                        ) as HTMLInputElement;
                        handleSkillAdd(input.value);
                        input.value = "";
                      }}
                      variant="outline"
                      className="border-border/40"
                    >
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rating */}
            <Card className="border-border/40 bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-xl">Your Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                    ⭐ {profile.rating}
                  </div>
                  <div className="text-muted-foreground">
                    Based on completed job applications and feedback from
                    companies
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            {certificates.length > 0 ? (
              <div className="grid gap-4">
                {certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className="border-border/40 hover:border-border/80 transition-colors overflow-hidden"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">📜</span>
                            <div>
                              <h3 className="font-semibold text-foreground text-lg">
                                {cert.jobTitle}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {cert.company}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <p className="text-xs text-muted-foreground">
                              Issued:{" "}
                              {new Date(cert.issuedAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono bg-secondary/50 p-2 rounded w-fit">
                              Hash: {cert.verificationHash}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="border-border/40 bg-transparent"
                            asChild
                          >
                            <a
                              href={cert.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            className="border-border/40 bg-transparent"
                          >
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/40">
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-muted-foreground mb-2">
                    No certificates yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Complete job assignments to earn certificates
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
