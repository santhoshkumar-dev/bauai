import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Request validation schema
const prioritySuggestionSchema = z.object({
  material_name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string(),
  notes: z.string().optional(),
});

// Response validation schema
const priorityResponseSchema = z.object({
  priority: z.enum(["low", "medium", "high", "urgent"]),
  reason: z.string(),
});

/**
 * POST /api/ai/priority
 *
 * Generates AI-powered priority suggestions for material requests using Groq API.
 * The AI analyzes material name, quantity, unit, and optional notes to suggest
 * an appropriate priority level with a contextual explanation.
 */
export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();
    const validatedInput = prioritySuggestionSchema.parse(body);

    // Get Groq API key from environment
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json(
        { error: "AI service is not configured" },
        { status: 500 }
      );
    }

    // Construct the prompt for the AI
    const prompt = `You are a construction procurement expert. Given the following material request, suggest the priority level (low, medium, high, or urgent) and provide a brief explanation (1-2 sentences) explaining why.

Material: ${validatedInput.material_name}
Quantity: ${validatedInput.quantity} ${validatedInput.unit}
${validatedInput.notes ? `Notes: ${validatedInput.notes}` : ""}

Consider:
- Critical construction materials (cement, concrete, steel, rebar) typically need higher priority
- Large quantities may require advance procurement planning
- Project-critical materials that could block construction progress should be urgent
- Standard materials in small quantities can be low priority

Respond ONLY with a valid JSON object in this exact format:
{
  "priority": "urgent" | "high" | "medium" | "low",
  "reason": "Your explanation here (1-2 sentences)"
}`;

    // Call Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Fast and capable model
          messages: [
            {
              role: "system",
              content:
                "You are a construction procurement expert. Always respond with valid JSON only, no additional text.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3, // Lower temperature for more consistent, focused responses
          max_tokens: 200,
          response_format: { type: "json_object" }, // Ensure JSON response
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 503 }
      );
    }

    const groqData = await groqResponse.json();
    const aiContent = groqData.choices?.[0]?.message?.content;

    if (!aiContent) {
      return NextResponse.json(
        { error: "Invalid response from AI service" },
        { status: 500 }
      );
    }

    // Parse and validate AI response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiContent);
    } catch {
      console.error("Failed to parse AI response:", aiContent);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    // Validate the parsed response matches our schema
    const validatedResponse = priorityResponseSchema.parse({
      priority: parsedResponse.priority,
      reason:
        parsedResponse.reason ||
        parsedResponse.explanation ||
        "Priority suggested based on material characteristics.",
    });

    // Return in the format expected by the frontend
    return NextResponse.json({
      priority: validatedResponse.priority,
      explanation: validatedResponse.reason,
    });
  } catch (error) {
    console.error("Priority suggestion error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to generate priority suggestion" },
      { status: 500 }
    );
  }
}
