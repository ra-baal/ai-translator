import { NextRequest, NextResponse } from "next/server";
import createPromptBuilder from "../_services/promptBuilder";
import { Either, left, right } from "@/common/either";
import { is } from "@/common/is";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string | null;
  context?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    const r = require([
      [body.text, "text"],
      [body.targetLanguage, "targetLanguage"],
    ]);

    if (r) {
      return NextResponse.json({ error: r }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    const promptBuilder = createPromptBuilder();

    const prompt = promptBuilder.translation({
      text: body.text,
      targetLanguage: body.targetLanguage,
      sourceLanguage: body.sourceLanguage ?? undefined,
      context: body.context ?? undefined,
    });

    if (!prompt.isRight) {
      return NextResponse.json({ error: prompt.left }, { status: 400 });
    }

    const aiResponse = await requestLLM(prompt.right, groqApiKey);

    if (!aiResponse.isRight) {
      return NextResponse.json({ error: aiResponse.left }, { status: 500 });
    }

    return NextResponse.json({
      response: aiResponse.right,
      status: 200,
    });
  } catch (error) {
    console.error("Error in prompt API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function require(list: [unknown, string][]): string | null {
  for (const element of list) {
    const value = element[0];
    const name = element[1];
    if (value === null || value === undefined || value === "") {
      return `${name} is required`;
    }
  }

  return null;
}

async function requestLLM(
  prompt: string,
  groqApiKey: string
): Promise<Either<"request fail" | "no LLM response", string>> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: prompt,
    },
  ];

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Groq API error:", errorData);

    return left("request fail");
  }

  const data = await response.json();
  const aiResponse = data.choices[0]?.message?.content;

  if (!aiResponse) {
    return left("no LLM response");
  }

  return right(aiResponse);
}

// interface GroqResponse {
//   choices: Array<{
//     message: {
//       content: string;
//     };
//   }>;
// }

// function ensureGroqResponse(x: unknown): GroqResponse {
//   if (isGroqResponse(x)) {
//     return x;
//   }

//   throw new Error("Invalid type");
// }

// function isGroqResponse(x: unknown): x is GroqResponse {
//   return (
//     is.obj(x) &&
//     Array.isArray(x.choices) &&
//     x.choices.every(
//       (choice) =>
//         is.obj(choice) &&
//         is.obj(choice.message) &&
//         typeof choice.message.content === "string"
//     )
//   );
// }
