// app/api/chat/route.ts
import { GoogleGenAI, type Content } from "@google/genai";
import { portfolio } from "../../data/portfolio";
import { projects } from "../../data/projects";
import { experiences } from "../../data/experience";
import { frontend, backend, devops } from "../../data/data";

const MODEL = "gemini-2.5-flash-lite";
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 12;

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

type ChatTurn = { role: "user" | "assistant"; content: string };

// Everything the assistant may say about Kian. Kept in the prompt so one call answers.
const PROFILE = {
  ...portfolio,
  experience: experiences,
  skills: { frontend, backend, tools: devops },
  projects: projects.map((p) => ({
    title: p.title,
    platform: p.platform,
    description: p.description,
    tech: p.tech,
    repo: p.repo || "private",
    demo: p.demo || "none",
  })),
};

const SYSTEM_INSTRUCTION = `
You are the AI assistant on Lance Kian Flores' portfolio website, answering in first person as Kian ("I", "my").

Rules:
- You are an AI representing Kian, not the real person. If asked directly, say so.
- Personal facts (bio, contact, education, work, projects, skills) come ONLY from the PROFILE below. Never invent or guess anything not in it; if it's not there, say you don't have that info and suggest emailing ${portfolio.gmail}.
- For general programming questions (web, mobile, frontend, backend, APIs, debugging, architecture), help briefly and practically. Prefer React, Next.js, TypeScript, Node.js, Flutter and Tailwind when relevant.
- Keep replies short: 1–4 sentences, plain text, no markdown headings. Use a short list only if asked.
- When sharing links or email, write them in full so they are clickable.
- Politely decline unrelated or inappropriate requests and steer back to Kian's work.

PROFILE (JSON):
${JSON.stringify(PROFILE)}
`.trim();

function sanitizeHistory(body: unknown): ChatTurn[] {
  const b = body as { messages?: unknown; message?: unknown };
  const raw: unknown[] = Array.isArray(b?.messages)
    ? b.messages
    : typeof b?.message === "string"
      ? [{ role: "user", content: b.message }]
      : [];

  return raw
    .filter(
      (m): m is ChatTurn =>
        typeof m === "object" &&
        m !== null &&
        ((m as ChatTurn).role === "user" || (m as ChatTurn).role === "assistant") &&
        typeof (m as ChatTurn).content === "string",
    )
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_LENGTH) }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY);
}

// Keyword answers used when Gemini is not configured or fails, so the chat still helps.
function fallbackReply(question: string): string {
  const q = question.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (has("contact", "email", "reach", "hire", "linkedin", "github")) {
    return `You can email me at ${portfolio.gmail}, connect on LinkedIn at ${portfolio.linkedin}, or see my code at ${portfolio.github}. I'm currently ${portfolio.availability.toLowerCase()}.`;
  }
  if (has("study", "school", "university", "education", "college", "degree")) {
    return `I graduated from ${portfolio.university} in ${portfolio.graduated} with a ${portfolio.degree}. I also did a ${portfolio.ojt}.`;
  }
  if (has("work", "experience", "job", "intern", "boom")) {
    return experiences
      .map((e) => `${e.role} at ${e.company} (${e.period}): ${e.description}`)
      .join(" ");
  }
  if (has("project", "built", "portfolio", "app")) {
    const list = projects.map((p) => p.title).join(", ");
    return `Some things I've built: ${list}. Scroll to "Selected work" for details and links.`;
  }
  if (has("stack", "tech", "skill", "language", "framework", "tools")) {
    return `I mainly work with ${frontend.slice(0, 8).join(", ")} on the frontend and ${backend.slice(0, 6).join(", ")} on the backend.`;
  }
  if (has("fact", "about", "who are you", "yourself", "hobby")) {
    return `I'm ${portfolio.fullname}, a full-stack developer based in ${portfolio.place}. A few facts: I ${portfolio.facts.join(" and ")}.`;
  }
  return `I can tell you about my projects, experience, tech stack, education or how to contact me. For anything else, email me at ${portfolio.gmail}.`;
}

export async function POST(req: Request) {
  let history: ChatTurn[] = [];

  try {
    history = sanitizeHistory(await req.json());
  } catch {
    return Response.json({ reply: "Invalid request." }, { status: 400 });
  }

  const last = history[history.length - 1];
  if (!last || last.role !== "user") {
    return Response.json({ reply: "Please send a message." }, { status: 400 });
  }

  if (!ai) {
    return Response.json({ reply: fallbackReply(last.content), fallback: true });
  }

  // Gemini expects the conversation to start with a user turn.
  const firstUser = history.findIndex((m) => m.role === "user");
  const contents: Content[] = history.slice(firstUser).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 400,
      },
    });

    const reply = res.text?.trim();
    return Response.json({ reply: reply || fallbackReply(last.content) });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ reply: fallbackReply(last.content), fallback: true });
  }
}
