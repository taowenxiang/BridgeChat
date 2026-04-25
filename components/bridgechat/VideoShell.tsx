"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  MonitorPlay,
  Pause,
  Play,
  RefreshCcw,
  SendHorizonal,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDemoUsers } from "@/lib/mock-data";
import { videoScripts, type VideoMessage } from "@/lib/video-script-data";
import type { AssistantMode, BridgeChatContext, VideoScene } from "@/lib/types";

type VideoHintState = {
  tone: "soft" | "ai";
  badge: string;
  text: string;
  source: AssistantMode;
};

type InteractiveStep =
  | "waiting-hint"
  | "ready-to-send"
  | "waiting-reply"
  | "ready-final-reply"
  | "done";

function VideoMessageBubble({ message }: { message: VideoMessage }) {
  const isSelf = message.sender === "self";

  return (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] ${isSelf ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm ${
            isSelf
              ? "rounded-br-md bg-[var(--accent-strong)] text-white"
              : "rounded-bl-md border border-[var(--border-strong)] bg-white text-slate-700"
          }`}
        >
          <div>{message.text}</div>
          {message.media ? (
            <div className="mt-3 overflow-hidden rounded-2xl border border-black/5 bg-slate-50">
              <img
                src={message.media.src}
                alt={message.media.alt}
                className="h-40 w-full object-cover"
              />
              <div className="px-3 py-2 text-xs text-slate-500">{message.media.caption}</div>
            </div>
          ) : null}
        </div>
        <div className={`mt-2 text-xs text-slate-400 ${isSelf ? "text-right" : "text-left"}`}>
          {isSelf ? "我" : "对方"} · {message.sentAt}
        </div>
      </div>
    </div>
  );
}

function VideoHintCard({
  hint,
  loading,
}: {
  hint: VideoHintState | null;
  loading: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {hint || loading ? (
        <motion.div
          key={hint ? `${hint.source}-${hint.text}` : "loading"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24 }}
          className={`rounded-[26px] border px-4 py-3 text-sm shadow-[0_12px_35px_rgba(15,23,42,0.09)] ${
            hint?.tone === "ai"
              ? "border-sky-200/80 bg-[rgba(231,244,255,0.92)] text-sky-900"
              : "border-slate-200/80 bg-[rgba(255,255,255,0.78)] text-slate-700 backdrop-blur"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/65 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5" />
              {hint?.badge ?? "提示准备中"}
            </div>
          </div>
          <p className="mt-3 leading-6">
            {hint?.text ?? "AI 正在组织一句更自然的提示…"}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function VideoShell() {
  const locale = "zh" as const;
  const users = getDemoUsers(locale);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [scene, setScene] = useState<VideoScene>("shared-interest");
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("scripted");
  const [beat, setBeat] = useState(0);
  const [hint, setHint] = useState<VideoHintState | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);
  const [draft, setDraft] = useState("");
  const [sceneMessages, setSceneMessages] = useState<VideoMessage[]>(
    videoScripts["shared-interest"].openerMessages,
  );
  const [interactiveStep, setInteractiveStep] =
    useState<InteractiveStep>("waiting-hint");
  const timersRef = useRef<number[]>([]);

  const script = videoScripts[scene];
  const isInteractiveScene = scene === "shared-interest";
  const maxBeat = script.beatCaptions.length - 1;

  const visibleMessages = useMemo(() => {
    if (isInteractiveScene) {
      return sceneMessages;
    }

    const list = [...script.openerMessages];

    if (beat >= 2) {
      list.push(script.sentMessage);
    }

    if (beat >= 3) {
      list.push(...script.replyMessages);
    }

    return list;
  }, [beat, isInteractiveScene, sceneMessages, script]);

  function clearTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }

  function resetScene(nextScene?: VideoScene) {
    const targetScene = nextScene ?? scene;
    const targetScript = videoScripts[targetScene];

    clearTimers();
    setAutoPlay(false);
    setHint(null);
    setLoadingHint(false);
    setBeat(0);
    setDraft("");
    setSceneMessages(targetScript.openerMessages);
    setInteractiveStep("waiting-hint");

    if (nextScene) {
      setScene(nextScene);
    }
  }

  useEffect(() => {
    return () => clearTimers();
  }, []);

  async function resolveHint(currentDraft?: string) {
    if (assistantMode === "scripted") {
      setHint({
        tone: script.hint.tone,
        badge: script.hint.badge,
        text: script.hint.scriptedText,
        source: "scripted",
      });
      return;
    }

    setLoadingHint(true);
    const context: BridgeChatContext = {
      locale,
      users,
      messages: script.openerMessages.map((message) => ({
        id: message.id,
        senderId: message.sender === "self" ? users[0].id : users[1].id,
        text: message.text,
        sentAt: message.sentAt,
        tone: message.sender === "self" ? "user" : "reply",
      })),
      draft: currentDraft ?? script.initialDraft,
      progress: {
        userMessagesSent: 0,
        totalNewMessages: script.openerMessages.length,
        usedGoDeeper: false,
        thoughtfulFollowup: false,
      },
    };

    try {
      const response = await fetch("/api/bridgechat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: script.hint.liveKind,
          context,
        }),
      });
      const payload = await response.json();
      const liveText =
        typeof payload?.suggestion?.text === "string"
          ? payload.suggestion.text
          : script.hint.scriptedText;

      setHint({
        tone: script.hint.tone,
        badge: script.hint.badge,
        text: liveText,
        source: "live",
      });
    } catch {
      setHint({
        tone: script.hint.tone,
        badge: script.hint.badge,
        text: script.hint.scriptedText,
        source: "scripted",
      });
    } finally {
      setLoadingHint(false);
    }
  }

  useEffect(() => {
    if (
      !isInteractiveScene ||
      sceneMessages.length > script.openerMessages.length
    ) {
      return;
    }

    const trimmedDraft = draft.trim();
    if (!trimmedDraft) {
      setHint(null);
      setLoadingHint(false);
      setInteractiveStep("waiting-hint");
      return;
    }

    setHint(null);
    setLoadingHint(false);
    setInteractiveStep("waiting-hint");

    const timer = window.setTimeout(() => {
      void resolveHint(trimmedDraft);
      setInteractiveStep("ready-to-send");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [
    draft,
    scene,
    assistantMode,
    isInteractiveScene,
    sceneMessages.length,
    script.openerMessages.length,
  ]);

  async function goToBeat(nextBeat: number) {
    const clampedBeat = Math.max(0, Math.min(nextBeat, maxBeat));
    setBeat(clampedBeat);

    if (clampedBeat === 1) {
      await resolveHint();
      return;
    }

    if (clampedBeat >= 2) {
      setHint(null);
    }
  }

  async function nextBeat() {
    if (beat >= maxBeat) {
      return;
    }

    await goToBeat(beat + 1);
  }

  useEffect(() => {
    if (!autoPlay || isInteractiveScene) {
      return;
    }

    clearTimers();
    const sequence = [1, 2, 3];

    sequence.forEach((targetBeat, index) => {
      const timer = window.setTimeout(() => {
        void goToBeat(targetBeat);
        if (targetBeat === maxBeat) {
          setAutoPlay(false);
        }
      }, 1100 + index * 1700);
      timersRef.current.push(timer);
    });

    return () => clearTimers();
  }, [autoPlay, scene, assistantMode, isInteractiveScene]);

  async function sendInteractiveMessage() {
    const text = draft.trim();
    if (!text) {
      return;
    }

    if (interactiveStep === "ready-to-send") {
      setSceneMessages((current) => [
        ...current,
        {
          id: `scene1-user-${Date.now()}`,
          sender: "self",
          text,
          sentAt: script.sentMessage.sentAt,
        },
      ]);
      setDraft("");
      setHint(null);
      setInteractiveStep("waiting-reply");

      const timer = window.setTimeout(() => {
        setSceneMessages((current) => [...current, ...script.replyMessages.slice(0, 1)]);
        setInteractiveStep("ready-final-reply");
      }, 2200);
      timersRef.current.push(timer);
      return;
    }

    if (interactiveStep === "ready-final-reply") {
      setSceneMessages((current) => [
        ...current,
        {
          id: `scene1-user-final-${Date.now()}`,
          sender: "self",
          text,
          sentAt: script.replyMessages.at(-1)?.sentAt ?? "10:13",
        },
      ]);
      setDraft("");
      setInteractiveStep("done");
    }
  }

  const interactiveCaption =
    !draft.trim() && sceneMessages.length === 0
      ? "主角先自己开始输入；只有开始输入后停顿 3 秒，AI 才会弹出提示。"
      : interactiveStep === "waiting-hint"
        ? "主角正在犹豫，若继续停顿 3 秒没有更多操作，AI 就会自动给出提示。"
      : interactiveStep === "ready-to-send"
        ? "提示已经出现，现在由主角自己决定按下发送。"
        : interactiveStep === "waiting-reply"
          ? "消息已经发出，等待对方回复。"
          : interactiveStep === "ready-final-reply"
            ? "对方回复已经出现，现在主角可以自己打出“哇！好乖！”。"
            : "这一幕已经完成，可以重置重新拍。";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(160,231,216,0.34),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(125,146,230,0.22),transparent_28%)] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 xl:flex-row">
        <aside
          className={`relative w-full rounded-[34px] border border-[var(--border-strong)] bg-white/76 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-300 xl:sticky xl:top-6 xl:self-start ${
            sidebarOpen ? "p-6 xl:w-[340px]" : "p-3 xl:w-[82px]"
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen((current) => !current)}
            className="absolute -left-4 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:text-slate-900"
            aria-label={sidebarOpen ? "收起左侧控制栏" : "展开左侧控制栏"}
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-glow)] text-[var(--accent-stronger)]">
                  <Clapperboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950">BridgeChat Video Mode</p>
                  <p className="text-sm text-slate-500">宣传片拍摄专用脚本模式</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Scene
                  </p>
                  <div className="grid gap-2">
                    {(
                      [
                        ["shared-interest", "Scene 1 / 共同爱好"],
                        ["ai-guidance", "Scene 2 / AI 引导"],
                      ] as Array<[VideoScene, string]>
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => resetScene(id)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          scene === id
                            ? "border-[var(--accent-soft)] bg-[var(--accent-glow)] text-[var(--accent-stronger)]"
                            : "border-[var(--border-strong)] bg-white/70 text-slate-600"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Assistant Mode
                  </p>
                  <div className="grid gap-2">
                    {(["scripted", "live"] as AssistantMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setAssistantMode(mode);
                          setHint(null);
                          if (!isInteractiveScene && beat >= 1 && beat < 2) {
                            void goToBeat(1);
                          }
                        }}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          assistantMode === mode
                            ? "border-sky-200 bg-sky-50 text-sky-900"
                            : "border-[var(--border-strong)] bg-white/70 text-slate-600"
                        }`}
                      >
                        {mode === "scripted" ? "Scripted / 固定脚本" : "Live AI / 实时生成"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button variant="secondary" onClick={() => resetScene()}>
                    <RefreshCcw className="h-4 w-4" />
                    Reset Scene
                  </Button>

                  {isInteractiveScene ? (
                    <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-3 text-sm leading-6 text-slate-600">
                      这一幕由主角自己推进：等待提示出现，然后自己发送、自己补最后一句。
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => void nextBeat()}
                        disabled={beat >= maxBeat || loadingHint}
                      >
                        <Play className="h-4 w-4" />
                        Next Beat
                      </Button>
                      <Button
                        variant="subtle"
                        className="w-full"
                        onClick={() => setAutoPlay((current) => !current)}
                      >
                        {autoPlay ? <Pause className="h-4 w-4" /> : <MonitorPlay className="h-4 w-4" />}
                        {autoPlay ? "Stop Auto-play" : "Start Auto-play"}
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 rounded-[28px] border border-[var(--border-strong)] bg-[var(--panel-muted)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  当前镜头
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  {script.title} · {script.subtitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{script.tone}</p>
                <p className="mt-4 rounded-2xl bg-white/85 px-4 py-3 text-sm leading-6 text-slate-600">
                  {isInteractiveScene ? interactiveCaption : script.beatCaptions[beat]}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <Link href="/" className="font-semibold text-[var(--accent-stronger)]">
                  返回首页
                </Link>
                <span>
                  {isInteractiveScene
                    ? `状态：${
                        interactiveStep === "waiting-hint"
                          ? "等待提示"
                          : interactiveStep === "ready-to-send"
                            ? "准备发送"
                            : interactiveStep === "waiting-reply"
                              ? "等待回复"
                              : interactiveStep === "ready-final-reply"
                                ? "准备收尾"
                                : "完成"
                      }`
                    : `Beat ${beat + 1} / ${script.beatCaptions.length}`}
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[520px] flex-col items-center justify-between py-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-glow)] text-[var(--accent-stronger)]">
                <Clapperboard className="h-5 w-5" />
              </div>
              <div className="rounded-full border border-[var(--border-strong)] bg-white/80 px-3 py-6 [writing-mode:vertical-rl] text-xs font-semibold tracking-[0.24em] text-slate-500">
                控制台
              </div>
              <div className="text-center text-[11px] leading-5 text-slate-400">
                {scene === "shared-interest" ? "Scene 1" : "Scene 2"}
              </div>
            </div>
          )}
        </aside>

        <section className="flex-1 rounded-[36px] border border-[var(--border-strong)] bg-white/72 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur md:p-7">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-slate-950">{script.headline}</h1>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.92fr_0.08fr]">
            <div className="mx-auto w-full max-w-[430px] rounded-[44px] border border-slate-300/70 bg-[linear-gradient(180deg,rgba(254,254,255,0.96),rgba(239,244,248,0.94))] p-3 shadow-[0_30px_70px_rgba(15,23,42,0.14)]">
              <div className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-[#eef2f5]">
                <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/82 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">BridgeChat</p>
                    <p className="text-xs text-slate-500">{script.subtitle}</p>
                  </div>
                  <div className="rounded-full bg-[var(--accent-glow)] px-3 py-1 text-xs font-medium text-[var(--accent-stronger)]">
                    {script.logoTag}
                  </div>
                </div>

                <div className="flex min-h-[640px] flex-col px-4 py-5">
                  <div className="flex-1 space-y-4">
                    {visibleMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.24 }}
                      >
                        <VideoMessageBubble message={message} />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 px-1">
                    <VideoHintCard hint={hint} loading={loadingHint} />
                  </div>

                  <div className="mt-auto border-t border-slate-200/80 bg-white/88 px-4 py-4">
                    <div className="rounded-[28px] border border-slate-200/90 bg-[#f7f9fb] px-4 py-4 shadow-inner">
                      <textarea
                        value={draft}
                        onChange={(event) => {
                          setDraft(event.target.value);
                        }}
                        placeholder={
                          isInteractiveScene
                            ? "发一条消息..."
                            : "等待下一步镜头…"
                        }
                        className="min-h-[82px] w-full resize-none bg-transparent text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-400">
                        {isInteractiveScene
                          ? !draft.trim() && sceneMessages.length === 0
                            ? ""
                            : interactiveStep === "waiting-hint"
                              ? ""
                            : interactiveStep === "ready-to-send"
                              ? ""
                            : interactiveStep === "waiting-reply"
                                ? ""
                                : interactiveStep === "ready-final-reply"
                                  ? ""
                                  : ""
                          : loadingHint
                            ? "正在生成提示…"
                            : script.footerLine}
                      </div>
                      <Button
                        onClick={() => {
                          if (isInteractiveScene) {
                            void sendInteractiveMessage();
                            return;
                          }
                          void nextBeat();
                        }}
                        disabled={
                          isInteractiveScene
                            ? !draft.trim() ||
                              interactiveStep === "waiting-reply"
                            : beat >= maxBeat
                        }
                      >
                        <SendHorizonal className="h-4 w-4" />
                        {isInteractiveScene ? "发送" : "推进镜头"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden xl:block" />
          </div>
        </section>
      </div>
    </main>
  );
}
