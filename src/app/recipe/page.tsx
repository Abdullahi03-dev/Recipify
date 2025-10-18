"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Users, ChefHat, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "../_components/protectedRoute";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = async (query?: string) => {
    setLoading(true);
    try {
      const url = query
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals ? data.meals.slice(0, 12) : []);
    } catch (err) {
      console.error(err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const timeout = setTimeout(() => fetchMeals(value), 500);
    return () => clearTimeout(timeout);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold">Browse Recipes</h1>
              <p className="text-lg text-muted-foreground">
                What ingredients do you have today?
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search meals by name..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-12 h-14 text-lg rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {meals.length > 0 ? (
                meals.map((meal) => (
                  <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`} className="group">
                    <div
                      className="rounded-2xl overflow-hidden bg-card hover-lift"
                      style={{ boxShadow: "var(--shadow-sm)" }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                            {meal.strArea || "World"}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {meal.strMeal}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            ~{Math.floor(Math.random() * 30) + 20} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {Math.floor(Math.random() * 4) + 2} servings
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat className="w-4 h-4" />
                            {["Easy", "Medium", "Hard"][
                              Math.floor(Math.random() * 3)
                            ]}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {meal.strCategory}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center text-muted-foreground col-span-full py-20">
                  No meals found. Try another search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Recipes;
