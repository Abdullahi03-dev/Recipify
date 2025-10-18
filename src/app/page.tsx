"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Search,
  Heart,
  ChefHat,
  Lightbulb,
} from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Search by Ingredients",
      description:
        "Have leftover ingredients? Just type them in and find the perfect recipe.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Recipes",
      description:
        "Our AI creates personalized recipes based on what you have available.",
    },
    {
      icon: Heart,
      title: "Save & Share Favorites",
      description:
        "Keep your favorite recipes organized and share them with friends.",
    },
  ];

  const steps = [
    {
      icon: ChefHat,
      title: "1. Enter Ingredients",
      desc: "Tell us what's in your kitchen",
    },
    {
      icon: Sparkles,
      title: "2. AI Magic",
      desc: "Our AI creates perfect recipes",
    },
    {
      icon: Lightbulb,
      title: "3. Start Cooking",
      desc: "Follow easy step-by-step instructions",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                AI Powered Recipes
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Cook Smarter with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Recipify
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Enter ingredients you have, and let AI create delicious recipes
                for you. Smart cooking made simple.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/generate">
                  <Button size="lg" className="gap-2 shadow-accent">
                    Get Started
                  </Button>
                </Link>

                <Link href="/recipes">
                  <Button size="lg" variant="outline" className="gap-2">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <Image
                src={heroImage}
                alt="Fresh ingredients for cooking"
                className="relative rounded-3xl shadow-lg hover-lift w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Why Choose Recipify?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform the way you cook with intelligent recipe suggestions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card hover-lift cursor-pointer transition-transform"
                style={{
                  boxShadow: "var(--shadow-sm)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your next delicious meal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-5" />

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of home cooks who are already using AI to create
              amazing meals
            </p>

            <Link href="/generate">
              <Button size="lg" className="gap-2 shadow-accent">
                Start Generating Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-lg">
              <ChefHat className="w-5 h-5 text-primary" />
              <span>RecipeAI</span>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                GitHub
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 RecipeAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
