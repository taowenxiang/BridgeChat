import { motion } from "motion/react";

import { DemoCursor } from "@/components/bridgechat/guided/DemoCursor";
import type { GuidedScene } from "@/lib/guided-scene-data";
import type { GuidedSceneSnapshot } from "@/lib/guided-scene-player";
import { cn } from "@/lib/utils";

export function PhoneStage({
  scene,
  snapshot,
}: {
  scene: GuidedScene;
  snapshot: GuidedSceneSnapshot;
}) {
  const selectedMessage = snapshot.selectedMessageId
    ? scene.bubbles.find((bubble) => bubble.id === snapshot.selectedMessageId)
    : null;

  return (
    <section
      aria-label="Phone demo stage"
      className="relative overflow-hidden rounded-[34px] border border-white/45 bg-[radial-gradient(circle_at_top,rgba(231,245,239,0.92),transparent_42%),linear-gradient(180deg,rgba(248,250,249,0.98),rgba(234,240,245,0.94))] px-4 py-6 shadow-[0_26px_68px_rgba(15,23,42,0.10)] md:px-6"
    >
      <div className="pointer-events-none absolute inset-x-10 top-6 h-24 rounded-full bg-[rgba(154,208,193,0.22)] blur-3xl" />

      <div className="relative mx-auto flex justify-center">
        <div
          data-testid="hero-phone-frame"
          className="aspect-[9/19.5] w-full max-w-[420px] rounded-[44px] border border-slate-300/70 bg-[linear-gradient(180deg,rgba(254,254,255,0.96),rgba(239,244,248,0.94))] p-3 shadow-[0_34px_80px_rgba(15,23,42,0.16)]"
        >
          <div className="relative flex h-full flex-col overflow-hidden rounded-[34px] border border-slate-200/80 bg-[#eef2f5]">
            <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/84 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">BridgeChat</p>
                <p className="text-xs text-slate-500">{scene.subtitle}</p>
              </div>
              <div className="rounded-full bg-[var(--accent-glow)] px-3 py-1 text-xs font-medium text-[var(--accent-stronger)]">
                {scene.logoTag}
              </div>
            </div>

            <div className="relative flex flex-1 flex-col px-4 py-5">
              <div className="flex-1 space-y-4 overflow-hidden">
                {snapshot.visibleMessages.map((message) => {
                  const isSelf = message.sender === "self";
                  const showReplyButton = snapshot.showReplyButtonForMessageId === message.id;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24 }}
                      className={cn("flex", isSelf ? "justify-end" : "justify-start")}
                    >
                      <div className="max-w-[78%]">
                        <div
                          className={cn(
                            "rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm",
                            isSelf
                              ? "rounded-br-md bg-[var(--accent-strong)] text-white"
                              : "rounded-bl-md border border-[var(--border-strong)] bg-white text-slate-700",
                          )}
                        >
                          {message.replyTo ? (
                            <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                              <div className="font-semibold text-sky-700">{message.replyTo.label}</div>
                              <div className="mt-1">{message.replyTo.text}</div>
                            </div>
                          ) : null}
                          <div>{message.text}</div>
                          {message.media ? (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-black/5 bg-slate-50">
                              <img
                                src={message.media.src}
                                alt={message.media.alt}
                                className="h-40 w-full object-cover"
                              />
                              <div className="px-3 py-2 text-xs text-slate-500">
                                {message.media.caption}
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div
                          className={cn(
                            "mt-2 text-xs text-slate-400",
                            isSelf ? "text-right" : "text-left",
                          )}
                        >
                          {isSelf ? "我" : "对方"} · {message.sentAt}
                        </div>

                        {showReplyButton ? (
                          <div className="mt-2 flex justify-end">
                            <div className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-900 shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
                              回复
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {snapshot.showHint ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                  className="mt-5 rounded-[26px] border border-sky-200/80 bg-[rgba(231,244,255,0.92)] px-4 py-3 text-sm text-sky-900 shadow-[0_12px_35px_rgba(15,23,42,0.09)]"
                >
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-slate-500">
                    {scene.hintBadge}
                  </div>
                  <p className="mt-3 leading-6">{snapshot.hintText}</p>
                </motion.div>
              ) : null}

              <div className="mt-5 border-t border-slate-200/80 bg-white/88 px-4 py-4">
                <div className="rounded-[28px] border border-slate-200/90 bg-[#f7f9fb] px-4 py-4 shadow-inner">
                  {snapshot.showReplyComposer && selectedMessage ? (
                    <div className="mb-3 rounded-2xl border border-slate-200/90 bg-white/92 px-4 py-3 text-sm leading-7 text-slate-500 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
                      回复：{selectedMessage.text}
                    </div>
                  ) : null}

                  <div className="min-h-[118px] rounded-[24px] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                    {snapshot.draftText}
                    {snapshot.showCursor ? (
                      <span aria-hidden="true" className="animate-pulse text-slate-400">
                        |
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {snapshot.showDemoCursor &&
              typeof snapshot.demoCursorX === "number" &&
              typeof snapshot.demoCursorY === "number" ? (
                <DemoCursor x={snapshot.demoCursorX} y={snapshot.demoCursorY} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
