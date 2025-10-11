"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [user, loading, router]);

  if (loading || !user) return 
  <div className="min-h-screen flex items-center justify-center bg-background">
  <p className="text-xl font-semibold">Loading dashboard...</p>
</div>;
  return <>{children}</>;
}
