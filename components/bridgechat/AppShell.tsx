"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, RotateCcw, Sparkles, WandSparkles } from "lucide-react";

import { ActionBar } from "@/components/bridgechat/ActionBar";
import { ChatHeader } from "@/components/bridgechat/ChatHeader";
import { ChatThread } from "@/components/bridgechat/ChatThread";
import { Composer } from "@/components/bridgechat/Composer";
import { LanguageToggle } from "@/components/bridgechat/LanguageToggle";
import { ProgressUnlockBanner } from "@/components/bridgechat/ProgressUnlockBanner";
import { ReflectionPanel } from "@/components/bridgechat/ReflectionPanel";
import { SuggestionCard } from "@/components/bridgechat/SuggestionCard";
import { UnderstandDrawer } from "@/components/bridgechat/UnderstandDrawer";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/button";
import {
  buildAutoReply,
  buildMockSuggestion,
  buildReflectionSummary,
  detectAssumptionHeavyDraft,
  formatClock,
  getCommonGround,
  getUnlockBanner,
  getUnlockState,
  isThoughtfulFollowUp,
} from "@/lib/bridgechat-engine";
import { getCopy } from "@/lib/copy";
import {
  getDemoUsers,
  getGuidedDraft,
  getSeededMessages,
  initialProgress,
} from "@/lib/mock-data";
import type {
  AiMode,
  BridgeChatContext,
  ChatMessage,
  DemoProgress,
  Locale,
  Suggestion,
  SuggestionKind,
  UnlockState,
} from "@/lib/types";

export function AppShell() {
  const { locale } = useLocale();
  const copy = getCopy(locale);
  const users = getDemoUsers(locale);
  const seededMessages = getSeededMessages(locale);
  const activeUser = users[0];
  const partner = users[1];

  const [messages, setMessages] = useState<ChatMessage[]>(seededMessages);
  const [draft, setDraft] = useState("");
  const [aiMode, setAiMode] = useState<AiMode>("mock");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("common");
  const [isReplying, setIsReplying] = useState(false);
  const [progress, setProgress] = useState<DemoProgress>(initialProgress);
  const [unlockState, setUnlockState] = useState<UnlockState>(
    getUnlockState(initialProgress),
  );
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [reflection, setReflection] = useState<string[]>(
    buildReflectionSummary(
      {
        locale,
        users,
        messages: seededMessages,
        progress: initialProgress,
      },
      locale,
    ),
  );
  const [guidedFlowRunning, setGuidedFlowRunning] = useState(false);
  const timersRef = useRef<number[]>([]);
  const bannerTimerRef = useRef<number | null>(null);
  const messagesRef = useRef(messages);
  const progressRef = useRef(progress);
  const unlockStateRef = useRef(unlockState);
  const draftRef = useRef(draft);
  const localeRef = useRef<Locale>(locale);

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

  function schedule(fn: () => void, delay: number) {
    const timer = window.setTimeout(fn, delay);
    timersRef.current.push(timer);
  }

  function getCurrentContext(): BridgeChatContext {
    return {
      locale,
      users,
      messages: messagesRef.current,
      draft: draftRef.current,
      progress: progressRef.current,
    };
  }

  function clearTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    if (bannerTimerRef.current) {
      window.clearTimeout(bannerTimerRef.current);
    }
  }

  function resetDemo(nextLocale?: Locale) {
    const targetLocale = nextLocale ?? locale;
    const targetUsers = getDemoUsers(targetLocale);
    const targetSeededMessages = getSeededMessages(targetLocale);

    clearTimers();
    setMessages(targetSeededMessages);
    setDraft("");
    setDrawerOpen(true);
    setActiveTab("common");
    setIsReplying(false);
    setProgress(initialProgress);
    setUnlockState(getUnlockState(initialProgress));
    setSuggestion(null);
    setReflection(
      buildReflectionSummary(
        {
          locale: targetLocale,
          users: targetUsers,
          messages: targetSeededMessages,
          progress: initialProgress,
        },
        targetLocale,
      ),
    );
    setGuidedFlowRunning(false);
    setBannerMessage(null);
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
    if (!unlockState.reflectionUnlocked) {
      return;
    }

    let cancelled = false;
    const liveContext: BridgeChatContext = {
      locale,
      users,
      messages,
      draft,
      progress,
    };

    async function refreshReflection() {
      if (aiMode === "live") {
        try {
          const response = await fetch("/api/bridgechat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              kind: "reflection",
              context: liveContext,
            }),
          });
          const payload = await response.json();
          if (!cancelled && Array.isArray(payload.reflection)) {
            setReflection(payload.reflection);
            return;
          }
        } catch {
          // Fall through to mock reflection.
        }
      }

      if (!cancelled) {
        setReflection(buildReflectionSummary(liveContext, locale));
      }
    }

    void refreshReflection();

    return () => {
      cancelled = true;
    };
  }, [aiMode, messages, draft, progress, unlockState.reflectionUnlocked, locale, users]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const commonGround = getCommonGround(unlockState.commonGroundUnlocked, locale);
  const assumptionHeavy = detectAssumptionHeavyDraft(draft);

  async function requestSuggestion(kind: SuggestionKind) {
    setActiveTab("ask");
    setDrawerOpen(true);
    const currentContext = getCurrentContext();

    if (kind === "go-deeper") {
      setProgress((current) => ({ ...current, usedGoDeeper: true }));
    }

    if (aiMode === "live") {
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
        const payload = await response.json();
        if (payload.suggestion) {
          setSuggestion(payload.suggestion);
          return;
        }
      } catch {
        setSuggestion(buildMockSuggestion(kind, currentContext, locale));
        return;
      }
    }

    setSuggestion(buildMockSuggestion(kind, currentContext, locale));
  }

  function insertSuggestion(text: string) {
    setDraft(text);
  }

  function sendMessage(rawText?: string) {
    const text = (rawText ?? draft).trim();
    if (!text || isReplying) {
      return;
    }

    const currentMessages = messagesRef.current;
    const sentAt = formatClock(currentMessages.length - seededMessages.length + 1);
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: activeUser.id,
      text,
      sentAt,
      tone: "user",
    };

    startTransition(() => {
      setMessages((current) => [...current, newMessage]);
      setDraft("");
      setSuggestion(null);
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
      setDrawerOpen(true);
      if (unlockStateRef.current.beyondLabelUnlocked) {
        setActiveTab("beyond");
      }
    }, 900);
  }

  function playGuidedFlow() {
    resetDemo();
    setGuidedFlowRunning(true);

    const currentContext = () => getCurrentContext();

    schedule(() => {
      void requestSuggestion("icebreaker");
    }, 500);
    schedule(() => {
      insertSuggestion(buildMockSuggestion("icebreaker", currentContext(), locale).text);
    }, 1500);
    schedule(() => {
      sendMessage(buildMockSuggestion("icebreaker", currentContext(), locale).text);
    }, 2400);
    schedule(() => {
      setDraft(getGuidedDraft(locale));
    }, 4200);
    schedule(() => {
      void requestSuggestion("avoid-assumptions");
    }, 5200);
    schedule(() => {
      insertSuggestion(buildMockSuggestion("avoid-assumptions", currentContext(), locale).text);
    }, 6200);
    schedule(() => {
      sendMessage(buildMockSuggestion("avoid-assumptions", currentContext(), locale).text);
    }, 7300);
    schedule(() => {
      void requestSuggestion("go-deeper");
      setActiveTab("beyond");
    }, 9100);
    schedule(() => {
      setGuidedFlowRunning(false);
    }, 10200);
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
            <Button variant="default" onClick={playGuidedFlow} disabled={guidedFlowRunning}>
              <WandSparkles className="h-4 w-4" />
              {guidedFlowRunning ? copy.demo.guidedFlowRunning : copy.demo.playGuidedFlow}
            </Button>
            <Button
              variant="subtle"
              onClick={() => setAiMode((current) => (current === "mock" ? "live" : "mock"))}
            >
              <Bot className="h-4 w-4" />
              {copy.demo.toggleAiMode}: {aiMode}
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
                (index === 0 && progress.totalNewMessages === 0) ||
                (index === 1 && progress.totalNewMessages > 0) ||
                (index === 2 && unlockState.beyondLabelUnlocked) ||
                (index === 3 && unlockState.reflectionUnlocked);
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

          <p className="mt-8 text-xs leading-6 text-slate-400">{copy.demo.optionalLive}</p>

          <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[var(--accent-stronger)]">
            {copy.demo.backToIntro}
          </Link>
        </aside>

        <section className="relative min-w-0 flex-1 rounded-[34px] border border-[var(--border-strong)] bg-white/62 shadow-[0_22px_55px_rgba(15,23,42,0.08)] backdrop-blur">
          <ChatHeader users={users} locale={locale} />
          <div className="border-b border-[var(--border-soft)] px-6 py-5">
            <ActionBar onAction={(kind) => void requestSuggestion(kind)} disabled={isReplying} locale={locale} />
          </div>

          <div className="grid gap-5 px-0 pb-6">
            <ChatThread
              messages={messages}
              users={users}
              activeUserId={activeUser.id}
              isReplying={isReplying}
              selfLabel={copy.demo.selfLabel}
              typingLabel={copy.demo.partnerThinking}
            />

            <div className="space-y-4 px-6">
              <SuggestionCard
                suggestion={suggestion}
                onInsert={insertSuggestion}
                onDismiss={() => setSuggestion(null)}
                locale={locale}
              />

              <Composer
                draft={draft}
                setDraft={setDraft}
                onSend={() => sendMessage()}
                onRewrite={() => void requestSuggestion("avoid-assumptions")}
                showRewriteHint={assumptionHeavy}
                disabled={isReplying}
                locale={locale}
              />

              <ReflectionPanel
                visible={unlockState.reflectionUnlocked}
                insights={reflection}
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
