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
import { getAllUsers } from "../actions";
import UsersTable from "@/components/UsersTable";

export default async function UsersPage() {
  // const users = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "STUDENT",
  //     status: "ACTIVE",
  //     joinedAt: "2025-01-02",
  //   },
  //   {
  //     id: 2,
  //     name: "TechCorp Inc.",
  //     email: "recruit@techcorp.com",
  //     role: "COMPANY",
  //     status: "ACTIVE",
  //     joinedAt: "2024-12-28",
  //   },
  //   {
  //     id: 3,
  //     name: "Sarah Smith",
  //     email: "sarah@example.com",
  //     role: "STUDENT",
  //     status: "ACTIVE",
  //     joinedAt: "2024-12-25",
  //   },
  //   {
  //     id: 4,
  //     name: "CloudServices",
  //     email: "admin@cloudservices.com",
  //     role: "COMPANY",
  //     status: "ACTIVE",
  //     joinedAt: "2024-12-20",
  //   },
  //   {
  //     id: 5,
  //     name: "Mike Johnson",
  //     email: "mike@example.com",
  //     role: "STUDENT",
  //     status: "SUSPENDED",
  //     joinedAt: "2024-12-15",
  //   },
  // ];

  const initialUsers = await getAllUsers();
  const initialUsersWithStatus = initialUsers.map((user) => ({
    ...user,
    status: "ACTIVE", // or derive from user data if you have a 'status' field
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));
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

        {/* Client-side filtering */}
        <UsersTable initialUsers={initialUsersWithStatus} />
      </div>
    </main>
  );
}
