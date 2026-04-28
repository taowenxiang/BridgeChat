"use client";

import { AnimatePresence, motion } from "motion/react";
import { PanelsTopLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UnderstandingTabs } from "@/components/bridgechat/UnderstandingTabs";
import { getCopy } from "@/lib/copy";
import type { DemoUser, Suggestion } from "@/lib/types";

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
    <div className="space-y-4">
      <Button variant="secondary" onClick={() => onOpenChange(!open)}>
        <PanelsTopLeft className="h-4 w-4" />
        {copy.drawerTitle}
      </Button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.aside
            key="understand-panel"
            initial={{ opacity: 0, x: 16, y: 4 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 12, y: -4 }}
            transition={{ duration: 0.22 }}
            className="absolute right-0 top-[calc(100%+1rem)] z-20 w-[min(360px,calc(100vw-2rem))]"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white/88 text-slate-400 shadow-sm transition hover:text-slate-700"
                aria-label="Close understand more"
              >
                <X className="h-4 w-4" />
              </button>

              <DrawerContent
                activeTab={activeTab}
                onTabChange={onTabChange}
                commonGround={commonGround}
                beyondLabelUnlocked={beyondLabelUnlocked}
                users={users}
                latestSuggestion={latestSuggestion}
                locale={locale}
              />
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
