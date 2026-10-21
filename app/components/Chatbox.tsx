"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUp, Sparkles } from "lucide-react";
import { ChatMessage } from "../types/data.types";

const MAX_LENGTH = 200;

const Avatar = ({ size }: { size: number }) => (
  <div
    className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-border"
    style={{ width: size, height: size }}
  >
    <Image src="/images/kian3.jpg" alt="" fill sizes={`${size}px`} className="object-cover" />
  </div>
);

const GREETING: ChatMessage = {
  id: 1,
  role: "assistant",
  content:
    "Hi there! 👋 Ask me anything about me, or feel free to ask about programming, web development, or app development. I’m here to help!",
};

const SUGGESTIONS = [
  { label: "Projects", prompt: "What projects have you built?" },
  { label: "Experience", prompt: "Tell me about your work experience." },
  { label: "Tech stack", prompt: "What is your tech stack?" },
  { label: "Contact", prompt: "How can I contact you?" },
];

// Turns URLs and emails in a reply into links.
const LINK_PATTERN = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK_PATTERN).map((part, i) => {
        if (i % 2 === 0) return part;
        const clean = part.replace(/[.,!?]+$/, "");
        const trail = part.slice(clean.length);
        const href = clean.includes("@") && !clean.startsWith("http") ? `mailto:${clean}` : clean;
        return (
          <React.Fragment key={i}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="underline decoration-current/30 underline-offset-2 hover:decoration-current"
            >
              {clean}
            </a>
            {trail}
          </React.Fragment>
        );
      })}
    </>
  );
}

const ChatBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim().slice(0, MAX_LENGTH);
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { id: Date.now(), role: "user", content: trimmed };
    const history = [...messages, userMessage];

    setMessages(history);
    setMessage("");
    setLoading(true);

    let reply = "Sorry, something went wrong. Please try again.";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((m) => m.id !== GREETING.id)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as { reply?: string };
      if (data.reply) reply = data.reply;
    } catch {
      reply = "I couldn't reach the server. Check your connection and try again.";
    } finally {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: reply }]);
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setMessage("");
  };

  const hasConversation = messages.length > 1;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open ? (
        <button
          ref={launcherRef}
          onClick={() => setOpen(true)}
          className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background/80 py-1.5 pl-1.5 pr-4 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          aria-label="Open chat"
        >
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" aria-hidden />
          </div>
          <span className="text-sm font-medium">Ask Kian</span>
        </button>
      ) : (
        <div
          role="dialog"
          aria-label="Chat with Kian"
          className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:left-auto sm:right-5 sm:w-[24rem] sm:translate-x-0"
        >
          <div className="flex h-[min(36rem,calc(100dvh-2rem))] w-full flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-[0_24px_80px_-20px_rgb(0_0_0/0.4)] backdrop-blur-xl">
            <div className="flex w-full items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <Avatar size={36} />
                <div>
                  <h3 className="text-sm font-medium leading-tight">Kian&apos;s assistant</h3>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
              {hasConversation && (
                <button
                  onClick={reset}
                  disabled={loading}
                  className="h-9 cursor-pointer rounded-full px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                >
                  New chat
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5" aria-live="polite">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && <Avatar size={24} />}
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap break-words px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-2xl rounded-bl-md bg-muted text-foreground"
                      }`}
                    >
                      {msg.role === "assistant" ? <Linkified text={msg.content} /> : msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-end gap-2">
                    <Avatar size={24} />
                    <div className="flex gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3.5" aria-label="Typing">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={loading}
                  onClick={() => send(s.prompt)}
                  className="shrink-0 cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="p-3 pt-1">
              <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 transition-colors focus-within:border-foreground/30">
                <label htmlFor="chat-input" className="sr-only">
                  Message
                </label>
                <textarea
                  ref={inputRef}
                  id="chat-input"
                  value={message}
                  onChange={(e) =>
                    e.target.value.length <= MAX_LENGTH &&
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(message);
                    }
                  }}
                  placeholder="Ask me anything…"
                  rows={1}
                  className="max-h-24 min-h-9 w-full resize-none bg-transparent px-2 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none sm:text-sm"
                />

                <button
                  onClick={() => send(message)}
                  disabled={!message.trim() || loading}
                  className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Send message"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-1.5 px-1 text-right font-mono text-[10px] text-muted-foreground">
                {message.length}/{MAX_LENGTH}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
