// app/api/chat/route.ts
import { GoogleGenAI, Type } from "@google/genai";
import { portfolio } from "../../data/portfolio";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const SYSTEM_INSTRUCTION = `
You are Lance Kian Flores' AI assistant.

Main personality:
- Be helpful, friendly, and clear.
- Specialize in software development, especially web development, mobile development, frontend, backend, APIs, debugging, architecture, and code reviews.
- Give practical answers with examples when useful.
- Prefer Next.js, React, TypeScript, Node.js, Tailwind CSS, React Native, and Expo when relevant.
- Keep answers concise but useful.
- Do not use markdown bullet lists, asterisks, or numbered lists unless the user explicitly asks for them.
- When giving facts, write them as normal sentences separated by commas or short paragraphs.

Portfolio knowledge:
- If the user asks about Lance Kian Flores' personal info, contacts, education, internship, work, facts, or bio, call get_portfolio.
- Never invent personal details.
- Use the tool result exactly and answer naturally.
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
      facts: "I go to the gym, and I code every day to improve my skills.",
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
