"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { MessageBubble } from "@/components/bridgechat/MessageBubble";
import type { ChatMessage, DemoUser } from "@/lib/types";

export function ChatThread({
  messages,
  users,
  activeUserId,
  isReplying,
  selfLabel,
  typingLabel,
}: {
  messages: ChatMessage[];
  users: [DemoUser, DemoUser];
  activeUserId: string;
  isReplying: boolean;
  selfLabel: string;
  typingLabel: string;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const usersById = Object.fromEntries(users.map((user) => [user.id, user])) as Record<
    string,
    DemoUser
  >;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isReplying]);

  return (
    <div className="flex min-h-[430px] flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <MessageBubble
              message={message}
              sender={usersById[message.senderId]}
              isOwn={message.senderId === activeUserId}
              selfLabel={selfLabel}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isReplying ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3"
          >
            <img
              src={users[1].avatar}
              alt={users[1].name}
              className="h-9 w-9 rounded-2xl border border-white/60 bg-white/70 object-cover"
            />
            <div className="rounded-full border border-[var(--border-strong)] bg-white/88 px-4 py-3 text-sm text-slate-500">
              {typingLabel}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div ref={endRef} />
    </div>
  );
}
