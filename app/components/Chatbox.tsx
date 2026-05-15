"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, Sparkles } from "lucide-react";
import { ChatMessage } from "../types/data.types";

const MAX_LENGTH = 200;

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

  return (
      <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-black px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-200"
          aria-label="Open chat"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold">Chat with Kian</span>
            <span className="text-xs text-slate-400 dark:text-slate-600">
              Ask me anything
            </span>
          </div>
        </button>
      ) : (
        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 sm:w-[28rem]">
          <div className="flex h-[40rem] w-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-2xl backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/95">
            <div className="flex items-center w-full justify-between border-b border-slate-200/70 px-4 py-4 dark:border-slate-700/70">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                  <Image
                    src="/images/kian3.jpg"
                    alt="Kian"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Chat with Kian
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Online
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <div
                      className={`flex items-start gap-3 ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                          <Image
                            src="/images/kian3.jpg"
                            alt="Kian"
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "bg-slate-100 text-slate-800 dark:bg-[#020618] dark:text-slate-200"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-3 justify-start">
                    <div className="mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                      <Image
                        src="/images/kian3.jpg"
                        alt="Kian"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:bg-[#020618] dark:text-slate-300">
                      Typing...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="flex justify-center gap-2 py-2">
              <button
                type="button"
                onClick={() => setMessage("Tell me facts about you")}
                className="rounded-full bg-white/60 px-3 py-1 text-xs text-slate-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md hover:scale-[1.05] dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
              >
                Facts about me
              </button>

              <button
                type="button"
                onClick={() => setMessage("What is your contact?")}
                className="rounded-full bg-white/60 px-3 py-1 text-xs text-slate-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md hover:scale-[1.05] dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
              >
                My Contact
              </button>

              <button
                type="button"
                onClick={() => setMessage("Where did you study?")}
                className="rounded-full bg-white/60 px-3 py-1 text-xs text-slate-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md hover:scale-[1.05] dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
              >
                Where I studied
              </button>
            </div>
            <div className="border-t p-3 dark:border-slate-700/70">
              <div className="flex items-center gap-2 rounded-2xl border bg-white p-2 dark:bg-slate-950">
                <textarea
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
                  placeholder="Type a message..."
                  rows={2}
                  className="w-full resize-none bg-transparent pl-2 text-sm outline-none dark:text-white"
                />

                <button
                  onClick={handleSend}
                  disabled={!message.trim() || loading}
                  className="rounded-xl bg-black p-2 text-white disabled:opacity-40 dark:bg-white dark:text-black"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 text-right text-xs text-slate-400">
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
