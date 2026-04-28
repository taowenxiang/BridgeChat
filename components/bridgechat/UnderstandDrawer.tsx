"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UnderstandingTabs } from "@/components/bridgechat/UnderstandingTabs";
import { getCopy } from "@/lib/copy";
import type { DemoUser, Suggestion } from "@/lib/types";
import { cn } from "@/lib/utils";

type UnderstandDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
  commonGround: string[];
  beyondLabelUnlocked: boolean;
  users: [DemoUser, DemoUser];
  latestSuggestion: Suggestion | null;
  locale: "en" | "zh";
};

function DrawerContent(props: Omit<UnderstandDrawerProps, "open" | "onOpenChange">) {
  const copy = getCopy(props.locale);

  return (
    <div className="flex h-full flex-col rounded-[30px] border border-[var(--border-strong)] bg-white/72 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {copy.demo.researchLayer}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          {copy.drawerTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {copy.demo.drawerSubtitle}
        </p>
      </div>
      <UnderstandingTabs {...props} />
    </div>
  );
}

export function UnderstandDrawer({
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  commonGround,
  beyondLabelUnlocked,
  users,
  latestSuggestion,
  locale,
}: UnderstandDrawerProps) {
  const copy = getCopy(locale);

  return (
    <>
      <div className="hidden xl:block">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="drawer-open"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.28 }}
              className="w-[360px] shrink-0"
            >
              <DrawerContent
                activeTab={activeTab}
                onTabChange={onTabChange}
                commonGround={commonGround}
                beyondLabelUnlocked={beyondLabelUnlocked}
                users={users}
                latestSuggestion={latestSuggestion}
                locale={locale}
              />
            </motion.div>
          ) : (
            <motion.div
              key="drawer-collapsed"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              className="flex w-[78px] shrink-0 items-start justify-center"
            >
              <button
                type="button"
                onClick={() => onOpenChange(true)}
                className="flex w-full flex-col items-center gap-4 rounded-[28px] border border-[var(--border-strong)] bg-white/72 px-3 py-5 text-slate-600 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur transition hover:text-slate-950"
              >
                <PanelsTopLeft className="h-5 w-5" />
                <span className="rotate-180 text-xs font-semibold uppercase tracking-[0.25em] [writing-mode:vertical-rl]">
                  {copy.demo.mobileDrawerButton}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="xl:hidden">
        <div className="space-y-4">
          <Button
            variant="secondary"
            className="w-full justify-center"
            onClick={() => onOpenChange(!open)}
          >
            <PanelsTopLeft className="h-4 w-4" />
            {copy.demo.mobileDrawerButton}
          </Button>
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="mobile-inline-drawer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden rounded-[32px]"
              >
                <DrawerContent
                  activeTab={activeTab}
                  onTabChange={onTabChange}
                  commonGround={commonGround}
                  beyondLabelUnlocked={beyondLabelUnlocked}
                  users={users}
                  latestSuggestion={latestSuggestion}
                  locale={locale}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className={cn(
          "absolute right-[376px] top-4 hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white/80 text-slate-500 shadow-sm transition hover:text-slate-950 xl:flex",
          !open && "right-[92px]",
        )}
      >
        <ChevronLeft className={cn("h-4 w-4 transition", !open && "rotate-180")} />
      </button>
    </>
  );
}
