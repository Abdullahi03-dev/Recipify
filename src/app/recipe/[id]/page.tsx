// "use client";


// import Image from "next/image";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import {
//   Clock,
//   Users,
//   ChefHat,
//   Heart,
//   ArrowLeft,
//   Sparkles,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import pastaImage from "@/assets/recipe-pasta.jpg";
// import ProtectedRoute from "@/app/_components/protectedRoute";

// const RecipeDetail = () => {
//   const params = useParams();
//   const id = params?.id;

//   // Mock data (you can replace with real API later)
//   const recipe = {
//     id: 1,
//     title: "Creamy Tomato Pasta",
//     image: pastaImage,
//     time: "25 min",
//     servings: 4,
//     difficulty: "Easy",
//     tags: ["Italian", "Vegetarian"],
//     description:
//       "A delicious and creamy tomato pasta that's perfect for a quick weeknight dinner. Rich flavors combined with fresh ingredients make this a family favorite.",
//     ingredients: [
//       "400g pasta (penne or fusilli)",
//       "2 cups cherry tomatoes",
//       "3 cloves garlic, minced",
//       "1 cup heavy cream",
//       "1/2 cup parmesan cheese, grated",
//       "Fresh basil leaves",
//       "2 tbsp olive oil",
//       "Salt and pepper to taste",
//       "Red pepper flakes (optional)",
//     ],
//     steps: [
//       "Bring a large pot of salted water to boil and cook pasta according to package directions.",
//       "While pasta cooks, heat olive oil in a large pan over medium heat.",
//       "Add minced garlic and sauté for 1 minute until fragrant.",
//       "Add cherry tomatoes and cook for 5-7 minutes until they start to burst.",
//       "Pour in heavy cream and bring to a gentle simmer.",
//       "Add parmesan cheese and stir until melted and sauce is smooth.",
//       "Drain pasta and add to the sauce, tossing to coat evenly.",
//       "Season with salt, pepper, and red pepper flakes if desired.",
//       "Garnish with fresh basil leaves and serve immediately.",
//     ],
//     aiTips: [
//       "For a healthier version, substitute heavy cream with cashew cream or coconut milk.",
//       "Add protein like grilled chicken or chickpeas to make it more filling.",
//       "Fresh basil makes a huge difference - don't skip it!",
//       "Save some pasta water to adjust sauce consistency if needed.",
//     ],
//   };

//   return (
//     <ProtectedRoute>
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Back Button */}
//         <Link href="/recipe">
//           <Button variant="ghost" className="mb-8 gap-2">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Recipes
//           </Button>
//         </Link>

//         {/* Hero Section */}
//         <div className="grid lg:grid-cols-2 gap-12 mb-12">
//           <div className="relative">
//             <Image
//               src={recipe.image}
//               alt={recipe.title}
//               className="w-full rounded-3xl shadow-lg"
//               style={{ boxShadow: "var(--shadow-lg)" }}
//             />
//           </div>

//           <div className="space-y-6 flex flex-col justify-center">
//             <div className="space-y-4">
//               <h1 className="text-4xl lg:text-5xl font-bold">{recipe.title}</h1>
//               <p className="text-lg text-muted-foreground">{recipe.description}</p>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {recipe.tags.map((tag) => (
//                 <Badge key={tag} variant="secondary" className="text-sm">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>

//             <div className="flex flex-wrap gap-6 text-sm">
//               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
//                 <Clock className="w-5 h-5 text-primary" />
//                 <span className="font-medium">{recipe.time}</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
//                 <Users className="w-5 h-5 text-primary" />
//                 <span className="font-medium">{recipe.servings} servings</span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
//                 <ChefHat className="w-5 h-5 text-primary" />
//                 <span className="font-medium">{recipe.difficulty}</span>
//               </div>
//             </div>

//             <Button className="w-fit gap-2" size="lg">
//               <Heart className="w-5 h-5" />
//               Save to Favorites
//             </Button>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <Tabs defaultValue="ingredients" className="w-full">
//           <TabsList className="w-full grid grid-cols-3">
//             <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
//             <TabsTrigger value="steps">Cooking Steps</TabsTrigger>
//             <TabsTrigger value="tips">AI Tips</TabsTrigger>
//           </TabsList>

//           <TabsContent value="ingredients" className="mt-8">
//             <div
//               className="rounded-2xl bg-card p-8"
//               style={{ boxShadow: "var(--shadow-sm)" }}
//             >
//               <h2 className="text-2xl font-semibold mb-6">Ingredients</h2>
//               <ul className="space-y-3">
//                 {recipe.ingredients.map((ingredient, index) => (
//                   <li key={index} className="flex items-start gap-3 text-lg">
//                     <span className="text-primary mt-1">•</span>
//                     <span>{ingredient}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </TabsContent>

//           <TabsContent value="steps" className="mt-8">
//             <div
//               className="rounded-2xl bg-card p-8"
//               style={{ boxShadow: "var(--shadow-sm)" }}
//             >
//               <h2 className="text-2xl font-semibold mb-6">
//                 Cooking Instructions
//               </h2>
//               <ol className="space-y-6">
//                 {recipe.steps.map((step, index) => (
//                   <li key={index} className="flex gap-4">
//                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
//                       {index + 1}
//                     </div>
//                     <p className="text-lg pt-1">{step}</p>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </TabsContent>

//           <TabsContent value="tips" className="mt-8">
//             <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-8 border border-primary/20">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//                   <Sparkles className="w-5 h-5 text-white ai-sparkle" />
//                 </div>
//                 <h2 className="text-2xl font-semibold">
//                   AI-Powered Suggestions
//                 </h2>
//               </div>
//               <ul className="space-y-4">
//                 {recipe.aiTips.map((tip, index) => (
//                   <li key={index} className="flex items-start gap-3 text-lg">
//                     <Sparkles className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                     <span>{tip}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// };

// export default RecipeDetail;






"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/app/_components/protectedRoute";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMeal = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setMeal(data.meals ? data.meals[0] : null);
    };
    fetchMeal();
  }, [id]);

  if (!meal)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Loading recipe...</p>
      </div>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push(`${measure} ${ing}`);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12 container mx-auto px-4 max-w-5xl">
        <Link href="/recipe">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Button>
        </Link>

        <div className="rounded-2xl overflow-hidden bg-card shadow-lg mb-8">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={1200}
            height={600}
            className="w-full object-cover max-h-[500px]"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{meal.strMeal}</h1>

          <div className="flex gap-3 flex-wrap">
            <Badge variant="secondary">{meal.strCategory}</Badge>
            <Badge variant="secondary">{meal.strArea}</Badge>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Ingredients</h2>
          <ul className="list-disc ml-6 space-y-2">
            {ingredients.map((item, idx) => (
              <li key={idx} className="text-lg">
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Instructions</h2>
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {meal.strInstructions}
          </p>

          <div className="flex items-center gap-3 mt-8">
            <Sparkles className="text-primary" />
            <p className="text-muted-foreground">
              Try customizing this recipe with your own twist!
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default RecipeDetail;
