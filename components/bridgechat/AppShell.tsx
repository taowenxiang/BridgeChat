"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw, Sparkles } from "lucide-react";

import { ActionBar } from "@/components/bridgechat/ActionBar";
import { ChatHeader } from "@/components/bridgechat/ChatHeader";
import { ChatThread } from "@/components/bridgechat/ChatThread";
import { Composer } from "@/components/bridgechat/Composer";
import { LanguageToggle } from "@/components/bridgechat/LanguageToggle";
import { ProgressUnlockBanner } from "@/components/bridgechat/ProgressUnlockBanner";
import { SuggestionCard } from "@/components/bridgechat/SuggestionCard";
import { UnderstandDrawer } from "@/components/bridgechat/UnderstandDrawer";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/button";
import {
  buildAutoReply,
  formatClock,
  getCommonGround,
  getUnlockBanner,
  getUnlockState,
  isThoughtfulFollowUp,
} from "@/lib/bridgechat-engine";
import { getCopy } from "@/lib/copy";
import {
  getDemoUsers,
  getSeededMessages,
  initialProgress,
} from "@/lib/mock-data";
import type {
  BridgeChatContext,
  ChatMessage,
  Locale,
  Suggestion,
  SuggestionKind,
  UnlockState,
} from "@/lib/types";

type AppShellProps = {
  aiConfigured: boolean;
};

type SuggestionApiPayload =
  | { status: "ok"; suggestion: Suggestion }
  | { status: "disabled"; message?: string }
  | { status: "unavailable"; message?: string };

function buildAutoKey(replyTarget: ChatMessage | null, text: string) {
  const normalized = text.trim();

  if (replyTarget) {
    return `reply:${replyTarget.id}:${normalized}`;
  }

  if (normalized) {
    return `icebreaker:${normalized}`;
  }

  return null;
}

export function AppShell({ aiConfigured }: AppShellProps) {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  const users = getDemoUsers(locale);
  const seededMessages = getSeededMessages(locale);
  const activeUser = users[0];
  const partner = users[1];

  const [messages, setMessages] = useState<ChatMessage[]>(seededMessages);
  const [draft, setDraft] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeTab, setActiveTab] = useState("common");
  const [isReplying, setIsReplying] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [unlockState, setUnlockState] = useState<UnlockState>(
    getUnlockState(initialProgress),
  );
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [dismissedAutoKey, setDismissedAutoKey] = useState<string | null>(null);

  const timersRef = useRef<number[]>([]);
  const bannerTimerRef = useRef<number | null>(null);
  const messagesRef = useRef(messages);
  const progressRef = useRef(progress);
  const unlockStateRef = useRef(unlockState);
  const draftRef = useRef(draft);
  const replyTargetRef = useRef(replyTarget);
  const localeRef = useRef<Locale>(locale);
  const currentAutoKeyRef = useRef<string | null>(null);
  const requestSequenceRef = useRef(0);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    unlockStateRef.current = unlockState;
  }, [unlockState]);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    replyTargetRef.current = replyTarget;
  }, [replyTarget]);

  useEffect(() => {
    if (aiConfigured) {
      setAiNotice(null);
    }
  }, [aiConfigured]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    function syncDrawerMode(nextIsDesktop: boolean) {
      setIsDesktop(nextIsDesktop);
      setDrawerOpen(nextIsDesktop);
    }

    syncDrawerMode(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      syncDrawerMode(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  function schedule(fn: () => void, delay: number) {
    const timer = window.setTimeout(fn, delay);
    timersRef.current.push(timer);
  }

  function clearTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    if (bannerTimerRef.current) {
      window.clearTimeout(bannerTimerRef.current);
    }
  }

  function getCurrentContext(): BridgeChatContext {
    return {
      locale,
      users,
      messages: messagesRef.current,
      draft: draftRef.current,
      progress: progressRef.current,
      focusedMessage: replyTargetRef.current ?? undefined,
    };
  }

  function revealResearchPanel(nextTab = "ask") {
    setActiveTab(nextTab);
    if (isDesktop) {
      setDrawerOpen(true);
    }
  }

  function resetDemo(nextLocale?: Locale) {
    const targetLocale = nextLocale ?? locale;
    const targetMessages = getSeededMessages(targetLocale);

    clearTimers();
    setMessages(targetMessages);
    setDraft("");
    setDrawerOpen(isDesktop);
    setActiveTab("common");
    setIsReplying(false);
    setProgress(initialProgress);
    setUnlockState(getUnlockState(initialProgress));
    setBannerMessage(null);
    setSuggestion(null);
    setReplyTarget(null);
    setDismissedAutoKey(null);
    setAiNotice(null);
  }

  useEffect(() => {
    if (localeRef.current !== locale) {
      localeRef.current = locale;
      resetDemo(locale);
    }
  }, [locale]);

  useEffect(() => {
    const nextUnlockState = getUnlockState(progress);
    const banner = getUnlockBanner(unlockState, nextUnlockState, locale);

    if (banner) {
      setBannerMessage(banner);
      if (bannerTimerRef.current) {
        window.clearTimeout(bannerTimerRef.current);
      }
      bannerTimerRef.current = window.setTimeout(() => {
        setBannerMessage(null);
      }, 2800);
    }

    if (JSON.stringify(nextUnlockState) !== JSON.stringify(unlockState)) {
      setUnlockState(nextUnlockState);
    }
  }, [progress, unlockState, locale]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const commonGround = getCommonGround(unlockState.commonGroundUnlocked, locale);
  const trimmedDraft = draft.trim();
  const autoKind: SuggestionKind | null = replyTarget
    ? "go-deeper"
    : trimmedDraft
      ? "icebreaker"
      : null;
  const autoKey = autoKind ? buildAutoKey(replyTarget, draft) : null;

  currentAutoKeyRef.current = autoKey;

  useEffect(() => {
    if (!aiConfigured || isReplying || !autoKind || !autoKey) {
      return;
    }

    if (dismissedAutoKey === autoKey) {
      return;
    }

    const timer = window.setTimeout(() => {
      void requestSuggestion(autoKind, {
        auto: true,
        requestKey: autoKey,
      });
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [aiConfigured, autoKind, autoKey, dismissedAutoKey, isReplying]);

  async function requestSuggestion(
    kind: SuggestionKind,
    options?: { auto?: boolean; requestKey?: string | null },
  ) {
    if (!aiConfigured) {
      setSuggestion(null);
      return;
    }

    revealResearchPanel("ask");
    setAiNotice(null);

    if (kind === "go-deeper") {
      setProgress((current) => ({ ...current, usedGoDeeper: true }));
    }

    const currentContext = getCurrentContext();
    const requestId = requestSequenceRef.current + 1;
    requestSequenceRef.current = requestId;

    try {
      const response = await fetch("/api/bridgechat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind,
          context: currentContext,
        }),
      });

      const payload = (await response.json()) as SuggestionApiPayload;

      if (requestId !== requestSequenceRef.current) {
        return;
      }

      if (options?.auto && options.requestKey !== currentAutoKeyRef.current) {
        return;
      }

      if (payload.status === "ok") {
        setSuggestion(payload.suggestion);
        return;
      }

      setSuggestion(null);
      setAiNotice(
        payload.status === "disabled"
          ? copy.demo.aiDisabled
          : payload.message ?? copy.demo.aiUnavailable,
      );
    } catch {
      if (requestId !== requestSequenceRef.current) {
        return;
      }

      if (options?.auto && options.requestKey !== currentAutoKeyRef.current) {
        return;
      }

      setSuggestion(null);
      setAiNotice(copy.demo.aiUnavailable);
    }
  }

  function handleDraftChange(value: string) {
    setDraft(value);
    setAiNotice(null);
  }

  function insertSuggestion(text: string) {
    setDraft(text);
    setAiNotice(null);
    setDismissedAutoKey(buildAutoKey(replyTargetRef.current, text));
  }

  function dismissSuggestion() {
    if (currentAutoKeyRef.current) {
      setDismissedAutoKey(currentAutoKeyRef.current);
    }
    setSuggestion(null);
  }

  function clearReplyTarget() {
    setReplyTarget(null);
    setSuggestion(null);
    setDismissedAutoKey(null);
    setAiNotice(null);
  }

  function selectReplyTarget(message: ChatMessage) {
    setReplyTarget(message);
    setDraft("");
    setSuggestion(null);
    setDismissedAutoKey(null);
    setAiNotice(null);
    revealResearchPanel("ask");
  }

  function sendMessage(rawText?: string) {
    const text = (rawText ?? draft).trim();
    if (!text || isReplying) {
      return;
    }

    const currentMessages = messagesRef.current;
    const currentReplyTarget = replyTargetRef.current;
    const sentAt = formatClock(currentMessages.length - seededMessages.length + 1);
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: activeUser.id,
      text,
      sentAt,
      tone: "user",
      replyTo: currentReplyTarget
        ? {
            messageId: currentReplyTarget.id,
            label: copy.demo.replyingTo,
            text: currentReplyTarget.text,
          }
        : undefined,
    };

    startTransition(() => {
      setMessages((current) => [...current, newMessage]);
      setDraft("");
      setSuggestion(null);
      setReplyTarget(null);
      setDismissedAutoKey(null);
      setAiNotice(null);
      setProgress((current) => ({
        userMessagesSent: current.userMessagesSent + 1,
        totalNewMessages: current.totalNewMessages + 1,
        usedGoDeeper: current.usedGoDeeper,
        thoughtfulFollowup: current.thoughtfulFollowup || isThoughtfulFollowUp(text),
      }));
      setIsReplying(true);
    });

    schedule(() => {
      const replyText = buildAutoReply(
        {
          locale,
          users,
          messages: messagesRef.current,
          draft: "",
          progress: progressRef.current,
        },
        text,
        locale,
      );
      const reply: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        senderId: partner.id,
        text: replyText,
        sentAt: formatClock(messagesRef.current.length - seededMessages.length + 1),
        tone: "reply",
      };
      setMessages((current) => [...current, reply]);
      setProgress((current) => ({
        ...current,
        totalNewMessages: current.totalNewMessages + 1,
      }));
      setIsReplying(false);
      if (unlockStateRef.current.beyondLabelUnlocked) {
        revealResearchPanel("beyond");
      }
    }, 900);
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(160,231,216,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(117,138,222,0.18),transparent_30%)]" />
      <ProgressUnlockBanner message={bannerMessage} />

      <div className="relative mx-auto mb-4 flex w-full max-w-[1560px] justify-end">
        <LanguageToggle />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1560px] flex-col gap-5 xl:flex-row">
        <aside className="w-full rounded-[34px] border border-[var(--border-strong)] bg-white/68 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)] backdrop-blur xl:sticky xl:top-6 xl:w-[300px] xl:self-start">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-glow)] text-[var(--accent-stronger)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">{copy.title}</p>
              <p className="text-sm text-slate-500">{copy.tagline}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">{copy.railLine}</p>

          <div className="mt-6 grid gap-3">
            <Button variant="secondary" onClick={() => resetDemo()}>
              <RotateCcw className="h-4 w-4" />
              {copy.demo.resetDemo}
            </Button>
          </div>

          <div className="mt-8 rounded-[28px] border border-[var(--border-strong)] bg-[var(--panel-muted)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {copy.designPrinciplesLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.designPrincipleChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--border-strong)] bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {copy.demo.steps.map((step, index) => {
              const active =
                index === 0
                  ? true
                  : index === 1
                    ? progress.userMessagesSent > 0
                    : Boolean(replyTarget) ||
                      messages.some((message) => Boolean(message.replyTo)) ||
                      unlockState.beyondLabelUnlocked;

              return (
                <div
                  key={step}
                  className={`rounded-2xl border px-4 py-3 text-sm transition ${
                    active
                      ? "border-[var(--accent-soft)] bg-[var(--accent-glow)] text-[var(--accent-stronger)]"
                      : "border-[var(--border-strong)] bg-white/70 text-slate-500"
                  }`}
                >
                  {step}
                </div>
              );
            })}
          </div>

          <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[var(--accent-stronger)]">
            {copy.demo.backToIntro}
          </Link>
        </aside>

        <section className="relative min-w-0 flex-1 rounded-[34px] border border-[var(--border-strong)] bg-white/62 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur">
          <ChatHeader users={users} locale={locale} />
          <div className="border-b border-[var(--border-soft)] px-6 py-5">
            {aiConfigured ? (
              <ActionBar
                onAction={(kind) => void requestSuggestion(kind)}
                kinds={["icebreaker", "go-deeper"]}
                disabled={isReplying}
                locale={locale}
              />
            ) : (
              <div className="rounded-[24px] border border-[var(--border-strong)] bg-white/78 px-4 py-4 text-sm leading-6 text-slate-600 shadow-sm">
                {copy.demo.aiDisabled}
              </div>
            )}
          </div>

          <div className="grid gap-5 px-0 pb-6">
            <ChatThread
              messages={messages}
              users={users}
              activeUserId={activeUser.id}
              isReplying={isReplying}
              selfLabel={copy.demo.selfLabel}
              typingLabel={copy.demo.partnerThinking}
              replyLabel={copy.demo.reply}
              onReply={aiConfigured ? selectReplyTarget : undefined}
            />

            <div className="space-y-4 px-6">
              {aiNotice ? (
                <div className="rounded-[24px] border border-[var(--border-strong)] bg-white/84 px-4 py-4 text-sm leading-6 text-slate-600 shadow-sm">
                  {aiNotice}
                </div>
              ) : null}

              <SuggestionCard
                suggestion={suggestion}
                onInsert={insertSuggestion}
                onDismiss={dismissSuggestion}
                locale={locale}
              />

              <Composer
                draft={draft}
                setDraft={handleDraftChange}
                onSend={() => sendMessage()}
                replyTarget={replyTarget}
                onClearReplyTarget={clearReplyTarget}
                disabled={isReplying}
                locale={locale}
              />
            </div>
          </div>
        </section>

        <div className="relative">
          <UnderstandDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            commonGround={commonGround}
            beyondLabelUnlocked={unlockState.beyondLabelUnlocked}
            users={users}
            latestSuggestion={suggestion}
            locale={locale}
          />
        </div>
      </div>
    </main>
  );
}
