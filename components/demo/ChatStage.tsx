"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { DemoChatMessage, DemoScene } from "@/lib/types";

type ChatStageProps = {
  scene: DemoScene;
  visibleMessages: DemoChatMessage[];
  chatStageHeading: string;
  livePlaybackLabel: string;
  waitingLabel: string;
};

function MessageCard({ message }: { message: DemoChatMessage }) {
  if (message.sender === "system") {
    return (
      <li className="w-full rounded-[24px] border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900">
        <p>{message.text}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">{message.sentAt}</p>
      </li>
    );
  }

  const isSelf = message.sender === "self";

  return (
    <li className={cn("flex", isSelf ? "justify-end" : "justify-start")}>
      <article
        className={cn(
          "max-w-[85%] rounded-[24px] px-4 py-3 shadow-sm",
          isSelf
            ? "bg-[var(--accent-strong)] text-white"
            : "border border-[var(--border-strong)] bg-white text-slate-900",
        )}
      >
        <p className="text-sm leading-6">{message.text}</p>

        {message.media ? (
          <figure className="mt-3 overflow-hidden rounded-[20px] border border-black/5 bg-white/60">
            <Image
              alt={message.media.alt}
              className="h-auto w-full object-cover"
              height={480}
              src={message.media.src}
              width={640}
            />
            <figcaption
              className={cn(
                "px-3 py-2 text-xs",
                isSelf ? "bg-white/15 text-white/90" : "bg-slate-50 text-slate-500",
              )}
            >
              {message.media.caption}
            </figcaption>
          </figure>
        ) : null}

        <p
          className={cn(
            "mt-2 text-xs font-semibold uppercase tracking-[0.16em]",
            isSelf ? "text-white/75" : "text-slate-500",
          )}
        >
          {message.sentAt}
        </p>
      </article>
    </li>
  );
}

export function ChatStage({
  scene,
  visibleMessages,
  chatStageHeading,
  livePlaybackLabel,
  waitingLabel,
}: ChatStageProps) {
  return (
    <section className="rounded-[34px] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.86)] p-5 shadow-[0_24px_70px_rgba(17,32,42,0.08)] backdrop-blur md:p-6">
      <div className="rounded-[28px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(244,252,249,0.95),rgba(255,255,255,0.94))] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-stronger)]">
          {scene.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">{scene.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">{scene.subtitle}</p>
      </div>

      <div className="mt-5 rounded-[28px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,248,247,0.96))] p-4 md:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{chatStageHeading}</p>
            <p className="mt-1 text-sm text-slate-600">{scene.purpose}</p>
          </div>
          <div className="rounded-full border border-[var(--border-strong)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {livePlaybackLabel}
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {visibleMessages.length === 0 ? (
            <li className="rounded-[24px] border border-dashed border-[var(--border-strong)] bg-white/70 px-4 py-6 text-sm leading-6 text-slate-500">
              {waitingLabel}
            </li>
          ) : null}

          {visibleMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </ul>
      </div>
    </section>
  );
}
