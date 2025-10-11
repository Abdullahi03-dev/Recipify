"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'react-hot-toast'; // Your toast hook

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
        // toast({
        //   title: "Success",
        //   description: ,
        //   variant: "default",
        // });
        toast.success("Account created successfully!")
      } else {
        await login(email, password);
        // toast({
        //   title: "Welcome back",
        //   description: ,
        //   variant: "default",
        // });
        toast.success("Logged in successfully!")
      }
      router.push("/");
    } catch (err: any) {
    //   toast({
    //     title: "Error",
    //     description: ,
    //     variant: "destructive",
    //   });
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-8 transition-all">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <ChefHat className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isSignUp ? "Sign up to start cooking" : "Sign in to your account"}
          </p>
        </div>

        {/* Auth Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1 focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-[1rem]"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-primary font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
