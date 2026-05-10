import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2",
      messages: [
        { role: "user", content: message },
      ],
      stream: false,
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    reply: data.message.content,
  });
}