import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    console.log("Incoming POST request");

    const body = await req.json();
    const { ingredients } = body;

    console.log("Ingredients received:", ingredients);

    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY in environment");
      return new Response(JSON.stringify({ error: "API key not set" }), { status: 500 });
    }

    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `You are a professional chef. Generate a recipe using the following ingredients: "${ingredients}". Return a single JSON object with this exact structure:

{
  "name": string,
  "description": string,
  "cookTime": string,
  "servings": number,
  "difficulty": "Easy" | "Medium" | "Hard",
  "ingredients": string[],
  "steps": string[]
}

Return only the JSON object, no markdown, no explanations.`,
    });

    const raw = await response.text;
    const clean = raw.replace(/```json|```/g, "").trim();
    const recipe = JSON.parse(clean);

    console.log("Successfully parsed recipe:", recipe);

    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
