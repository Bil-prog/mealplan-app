import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

interface DailyMealPlan {
    Breakfast?: string;
    Lunch?: string;
    Dinner?: string;
    Snacks?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { dietType, calories, allergies, cuisine, snacks, days } =
      await request.json();

    const prompt = `
        You are a professional nutritionist. Create a ${days} meal plan for an individual following a ${dietType} diet aiming for ${calories} calories per day.
        
        Allergies or restrictions: ${allergies || "none"}.
        Preferred cuisine: ${cuisine || "no preference"}.
        Snacks included: ${snacks ? "yes" : "no"}.
        
        For each day, provide:
          - Breakfast
          - Lunch
          - Dinner
          ${snacks ? "- Snacks" : ""}
        
        Use simple ingredients and provide brief instructions. Include approximate calorie counts for each meal.
        
        Structure the response as a JSON object where each day is a key, and each meal (breakfast, lunch, dinner, snacks) is a sub-key. Example:
        
        {
          "Monday": {
            "Breakfast": "Oatmeal with fruits - 350 calories",
            "Lunch": "Grilled chicken salad - 500 calories",
            "Dinner": "Steamed vegetables with quinoa - 600 calories",
            "Snacks": "Greek yogurt - 150 calories"
          },
          "Tuesday": {
            "Breakfast": "Smoothie bowl - 300 calories",
            "Lunch": "Turkey sandwich - 450 calories",
            "Dinner": "Baked salmon with asparagus - 700 calories",
            "Snacks": "Almonds - 200 calories"
          }
          // ...and so on for each day
        }
  
        Return just the json with no extra commentaries and no backticks.
      `;

    // Send the prompt to the AI model
    const response = await openAI.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free", // Ensure this model is accessible and suitable
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7, // Adjust for creativity vs. consistency
      max_tokens: 1500, // Adjust based on expected response length
    });

    const aiContent = response.choices[0].message.content!.trim();

    let parsedMealPlan: { [day: string]: DailyMealPlan };
    console.log(aiContent);
    try {
      parsedMealPlan = JSON.parse(aiContent);
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      return NextResponse.json(
        { error: "Failed to parse meal plan. Please try again." },
        { status: 500 }
      );
    }

    if (typeof parsedMealPlan !== "object" || parsedMealPlan === null) {
      throw new Error("Invalid meal plan format received from AI.");
    }

    return NextResponse.json({ mealPlan: parsedMealPlan });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
