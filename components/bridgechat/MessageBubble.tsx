import { cn } from "@/lib/utils";
import type { ChatMessage, DemoUser } from "@/lib/types";

export function MessageBubble({
  message,
  sender,
  isOwn,
  selfLabel,
}: {
  message: ChatMessage;
  sender: DemoUser;
  isOwn: boolean;
  selfLabel: string;
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
          {message.text}
        </div>
        <div
          className={cn(
            "mt-2 text-xs text-slate-400",
            isOwn ? "text-right" : "text-left",
          )}
        >
          {isOwn ? selfLabel : sender.name.split(" ")[0]} · {message.sentAt}
        </div>
      </div>
    </div>
  );
}
