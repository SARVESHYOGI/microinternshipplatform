"use client";

import { useState } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  //   joinedAt: string;
}

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) =>
    role === "STUDENT"
      ? "text-blue-600 border-blue-200"
      : "text-purple-600 border-purple-200";

  return (
    <>
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
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div>
                  <Badge variant="outline" className={getRoleColor(user.role)}>
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
                    Joined {user.createdAt}
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
    </>
  );
}
