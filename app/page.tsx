import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">W</span>
            </div>
            <span className="font-bold text-lg text-foreground">WorkHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              For Companies
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Connect. Learn. <span className="text-primary">Grow.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            The platform connecting students with real-world job opportunities.
            Build your portfolio, gain experience, and launch your career with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/signup">Start as a Student</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto bg-transparent"
            >
              <Link href="/signup?role=company">Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose WorkHub?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-World Experience",
              description:
                "Work on actual projects with real companies and build a professional portfolio",
            },
            {
              title: "Fair Opportunities",
              description:
                "Transparent job postings with clear requirements and competitive compensation",
            },
            {
              title: "Verified Certificates",
              description:
                "Earn certificates upon completion to showcase your achievements",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-border/40 bg-card hover:border-border/80 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies already on WorkHub. Create
            your account in minutes and start connecting with opportunities.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">WorkHub</h3>
              <p className="text-sm text-muted-foreground">
                Connecting talent with opportunity
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 WorkHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
