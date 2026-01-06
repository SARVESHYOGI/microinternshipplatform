"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  userRole?: "STUDENT" | "COMPANY" | "ADMIN";
  userName?: string;
}

export function Navbar({ userRole, userName }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = {
    STUDENT: [
      { href: "/student/jobs", label: "Available Jobs" },
      { href: "/student/applications", label: "My Applications" },
      { href: "/student/profile", label: "Profile" },
    ],
    COMPANY: [
      { href: "/company/dashboard", label: "Dashboard" },
      { href: "/company/jobs", label: "My Jobs" },
      { href: "/company/applicants", label: "Applicants" },
    ],
    ADMIN: [
      { href: "/admin/dashboard", label: "Dashboard" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/jobs", label: "Jobs" },
    ],
  };

  const links = userRole ? navLinks[userRole] : [];

  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/40 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href={userRole ? `/${userRole.toLowerCase()}/dashboard` : "/"}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">W</span>
          </div>
          <span className="font-bold text-lg text-foreground">WorkHub</span>
        </Link>

        {userRole && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {userRole && userName && (
            <span className="text-sm text-muted-foreground">{userName}</span>
          )}
          {userRole && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-border/40 bg-transparent"
              onClick={handleLogout}
            >
              <Link href="/login">Logout</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
