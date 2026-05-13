"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Send, Sparkles } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const MAX_LENGTH = 200;

const ChatBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi there! 👋 Ask me anything about me, or feel free to ask about programming, web development, or app development. I’m here to help!",
    },
  ]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed.slice(0, MAX_LENGTH),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
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
        <div className="flex h-[40rem] w-[24rem] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-2xl backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/95 sm:w-[28rem] lg:w-[28rem]">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-4 dark:border-slate-700/70">
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

          {/* Messages */}
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
                      <div className="h-8 w-8 shrink-0 mt-1 overflow-hidden rounded-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg- ${
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
            </div>
          </div>

          {/* Input fixed at bottom */}
          <div className="border-t p-3 dark:border-slate-700/70">
            <div className="flex items-center gap-2 rounded-2xl border bg-white p-2 dark:bg-slate-950">
              <textarea
                value={message}
                onChange={(e) =>
                  e.target.value.length <= MAX_LENGTH &&
                  setMessage(e.target.value)
                }
                placeholder="Type a message..."
                rows={2}
                className="w-full pl-2 resize-none bg-transparent text-sm outline-none"
              />

              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="rounded-xl bg-black p-2 text-white disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* COUNTER MOVED HERE (OUTSIDE INPUT BOX) */}
            <div className="mt-2 text-right text-xs text-slate-400">
              {message.length}/{MAX_LENGTH}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
