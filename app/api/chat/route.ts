// app/api/chat/route.ts
import { GoogleGenAI, Type } from "@google/genai";
import { portfolio } from "../../data/portfolio";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const SYSTEM_INSTRUCTION = `
You are an AI that responds as if you are Lance Kian Flores in first-person.

Identity rules:
- You are NOT a real human.
- You are an AI representing Lance Kian Flores' portfolio and persona.
- Speak in first person ("I", "my") when referring to Lance Kian Flores.

Main behavior:
- Be helpful, friendly, and clear.
- Focus on software development: web, mobile, frontend, backend, APIs, debugging, architecture.
- Prefer Next.js, React, TypeScript, Node.js, Tailwind CSS, React Native, Expo when relevant.
- Keep responses concise and practical.
- Do not use bullet points or numbered lists unless asked.

Truth & facts rules:
- Never invent personal information.
- If the user asks about bio, contact, education, work, internship, or facts about me,
  you MUST call get_portfolio.
- The tool output is the ONLY source of truth for personal information.
- If no tool result is available, say you don’t have access to that information.

Tool behavior:
- Only use get_portfolio for personal/portfolio questions.
- Do not use it for general programming or unrelated questions.
`.trim();

const getPortfolioTool = {
  name: "get_portfolio",
  description:
    "Get Lance Kian Flores' personal and portfolio information. Use this only when the user asks about bio, contacts, education, work, internship, or personal facts.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      topic: {
        type: Type.STRING,
        description:
          "What information the user wants, such as fullname, birthday, contacts, about, education, work, or facts.",
      },
    },
    required: ["topic"],
  },
};

function getPortfolio(topic: string) {
  const t = topic.toLowerCase();

  if (t.includes("contact")) {
    return {
      fullname: portfolio.fullname,
      gmail: portfolio.gmail,
      linkedin: portfolio.linkedin,
      github: portfolio.github,
    };
  }

  if (t.includes("about")) {
    return {
      fullname: portfolio.fullname,
      about: portfolio.about,
      facts: portfolio.facts,
    };
  }

  if (
    t.includes("school") ||
    t.includes("university") ||
    t.includes("education")
  ) {
    return {
      fullname: portfolio.fullname,
      university: portfolio.university,
      ojt: portfolio.ojt,
    };
  }

  return portfolio;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Sorry, something went wrong on the server.";
}

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };

    if (!message?.trim()) {
      return Response.json(
        { reply: "Please send a message." },
        { status: 400 },
      );
    }

    const first = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [
          {
            functionDeclarations: [getPortfolioTool],
          },
        ],
      },
    });

    const functionCallPart = first.candidates?.[0]?.content?.parts?.find(
      (
        part,
      ): part is {
        functionCall: {
          name: string;
          args?: Record<string, unknown>;
          id?: string;
        };
      } => "functionCall" in part && Boolean(part.functionCall),
    );

    const functionCall = functionCallPart?.functionCall;

    if (functionCall?.name === "get_portfolio") {
      const topic =
        typeof functionCall.args?.topic === "string"
          ? functionCall.args.topic
          : "all";

      const result = getPortfolio(topic);

      const second = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
          {
            role: "model",
            parts: [{ functionCall }],
          },
          {
            role: "user",
            parts: [
              {
                functionResponse: {
                  name: "get_portfolio",
                  response: result,
                  ...(functionCall.id ? { id: functionCall.id } : {}),
                },
              },
            ],
          },
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      return Response.json({ reply: second.text ?? "" });
    }

    return Response.json({ reply: first.text ?? "" });
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        reply: getErrorMessage(error),
      },
      { status: 503 },
    );
  }
}
