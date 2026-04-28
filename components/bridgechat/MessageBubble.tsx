import { CornerUpLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ChatMessage, DemoUser } from "@/lib/types";

export function MessageBubble({
  message,
  sender,
  isOwn,
  selfLabel,
  replyLabel,
  onReply,
}: {
  message: ChatMessage;
  sender: DemoUser;
  isOwn: boolean;
  selfLabel: string;
  replyLabel: string;
  onReply?: (message: ChatMessage) => void;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-end gap-3",
        isOwn ? "justify-end" : "justify-start",
      )}
    >
      {!isOwn ? (
        <img
          src={sender.avatar}
          alt={sender.name}
          className="h-9 w-9 rounded-2xl border border-white/60 bg-white/70 object-cover"
        />
      ) : null}
      <div className={cn("max-w-[75%]", isOwn ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm",
            isOwn
              ? "rounded-br-md bg-[var(--accent-strong)] text-white"
              : "rounded-bl-md border border-[var(--border-strong)] bg-white/88 text-slate-700",
          )}
        >
          {message.replyTo ? (
            <div
              className={cn(
                "mb-3 rounded-2xl border px-3 py-2 text-xs leading-5",
                isOwn
                  ? "border-white/20 bg-white/12 text-white/90"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              )}
            >
              <div className={cn("font-semibold", isOwn ? "text-white" : "text-sky-700")}>
                {message.replyTo.label}
              </div>
              <div className={cn("mt-1 line-clamp-2", isOwn ? "text-white/80" : "text-slate-500")}>
                {message.replyTo.text}
              </div>
            </div>
          ) : null}
          {message.text}
        </div>
        <div
          className={cn(
            "mt-2 flex items-center gap-3 text-xs text-slate-400",
            isOwn ? "text-right" : "text-left",
          )}
        >
          <span>
            {isOwn ? selfLabel : sender.name.split(" ")[0]} · {message.sentAt}
          </span>
          {!isOwn && onReply ? (
            <button
              type="button"
              onClick={() => onReply(message)}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-white/72 px-2.5 py-1 font-medium text-slate-500 transition hover:text-slate-700"
            >
              <CornerUpLeft className="h-3 w-3" />
              {replyLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
