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

const ChatBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi there! 👋 Ask me anything about me, or feel free to ask about programming, web development, or app development. I’m here to help!",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed.slice(0, MAX_LENGTH),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      // ✅ HANDLE API ERROR RESPONSE
      if (!res.ok || data?.error) {
        const errorMessage =
          data?.error?.message || "Something went wrong. Please try again.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: errorMessage,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.reply || "No response returned.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    { label: "Facts about me", prompt: "Tell me facts about you" },
    { label: "Contact", prompt: "What is your contact?" },
    { label: "Education", prompt: "Where did you study?" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open ? (
        <button
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

              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
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
                      className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-2xl rounded-bl-md bg-muted text-foreground"
                      }`}
                    >
                      {msg.content}
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
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setMessage(s.prompt)}
                  className="shrink-0 cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                  id="chat-input"
                  value={message}
                  onChange={(e) =>
                    e.target.value.length <= MAX_LENGTH &&
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything…"
                  rows={1}
                  className="max-h-24 min-h-9 w-full resize-none bg-transparent px-2 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none sm:text-sm"
                />

                <button
                  onClick={handleSend}
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
