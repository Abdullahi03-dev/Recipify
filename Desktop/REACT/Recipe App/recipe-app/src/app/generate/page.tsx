"use client";

import { useState } from "react";
import { Sparkles, ChefHat, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "../_components/protectedRoute";
import toast from "react-hot-toast";

interface Recipe {
  name: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  steps: string[];
}

const Generate = () => {
  const [ingredients, setIngredients] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      toast.error("Please enter at least one ingredient to generate a recipe.");
      return;
    }

    setIsGenerating(true);
    setGeneratedRecipe(null); // clear previous recipe

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      if (!res.ok) throw new Error("Failed to generate recipe");

      const data: Recipe = await res.json();
      setGeneratedRecipe(data);
      toast.success("Your personalized recipe is ready!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-medium mb-4">
              <Sparkles className="w-4 h-4 ai-sparkle" />
              AI Recipe Generator
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Create Your Perfect Recipe
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us what ingredients you have, and our AI will craft a delicious recipe just for you
            </p>
          </div>

          {/* Input Section */}
          <div className="rounded-2xl bg-card p-8 mb-8" style={{ boxShadow: "var(--shadow-md)" }}>
            <label htmlFor="ingredients" className="block text-lg font-semibold mb-4">
              What ingredients do you have?
            </label>
            <Textarea
              id="ingredients"
              placeholder="Example: chicken, rice, tomatoes, onions, garlic, olive oil..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="min-h-32 text-lg resize-none"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Separate ingredients with commas. The more details you provide, the better!
            </p>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-6 gap-2"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Your Recipe...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Recipe with AI
                </>
              )}
            </Button>
          </div>

          {/* Generated Recipe */}
          {generatedRecipe && (
            <div className="animate-fade-in-up space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-8 border border-primary/20">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">{generatedRecipe.name}</h2>
                    <p className="text-muted-foreground">{generatedRecipe.description}</p>
                  </div>
                  <ChefHat className="w-12 h-12 text-primary flex-shrink-0" />
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge variant="secondary" className="text-sm">
                     {generatedRecipe.cookTime}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                     {generatedRecipe.servings} servings
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                     {generatedRecipe.difficulty}
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Ingredients Used:</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedRecipe.ingredients.map((ingredient, index) => (
                        <Badge key={index} className="text-sm max-w-xs break-words whitespace-normal">{ingredient}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Cooking Steps:</h3>
                    <ol className="space-y-4">
                      {generatedRecipe.steps.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {index + 1}
                          </div>
                          <p className="pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={handleGenerate} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                  <Button className="gap-2">Save Recipe</Button>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Generate;
