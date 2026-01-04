"use client";

import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "STUDENT",
      status: "ACTIVE",
      joinedAt: "2025-01-02",
    },
    {
      id: 2,
      name: "TechCorp Inc.",
      email: "recruit@techcorp.com",
      role: "COMPANY",
      status: "ACTIVE",
      joinedAt: "2024-12-28",
    },
    {
      id: 3,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "STUDENT",
      status: "ACTIVE",
      joinedAt: "2024-12-25",
    },
    {
      id: 4,
      name: "CloudServices",
      email: "admin@cloudservices.com",
      role: "COMPANY",
      status: "ACTIVE",
      joinedAt: "2024-12-20",
    },
    {
      id: 5,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "STUDENT",
      status: "SUSPENDED",
      joinedAt: "2024-12-15",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    return role === "STUDENT"
      ? "text-blue-600 border-blue-200"
      : "text-purple-600 border-purple-200";
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="ADMIN" userName="Admin" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            User Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all registered users
          </p>
        </div>

        {/* Filters */}
        <Card className="border-border/40 mb-8">
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Users</label>
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background border-border/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Role</label>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="bg-background border-border/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="STUDENT">Students</SelectItem>
                    <SelectItem value="COMPANY">Companies</SelectItem>
                    <SelectItem value="ADMIN">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="border-border/40 hover:border-border/80 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-foreground">
                      {user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <Badge
                      variant="outline"
                      className={getRoleColor(user.role)}
                    >
                      {user.role}
                    </Badge>
                  </div>

                  <div>
                    <Badge
                      className={
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Joined {user.joinedAt}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-border/40 bg-transparent"
                    >
                      View Profile
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
