"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "motion/react";
import { LockKeyhole } from "lucide-react";

import { getCopy } from "@/lib/copy";
import type { DemoUser, Suggestion } from "@/lib/types";

type UnderstandingTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  commonGround: string[];
  beyondLabelUnlocked: boolean;
  users: [DemoUser, DemoUser];
  latestSuggestion: Suggestion | null;
  locale: "en" | "zh";
};

function TabTrigger({ value, label }: { value: string; label: string }) {
  return (
    <Tabs.Trigger
      value={value}
      className="rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm"
    >
      {label}
    </Tabs.Trigger>
  );
}

function DetailCard({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border-strong)] bg-white/82 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p>
    </div>
  );
}

export function UnderstandingTabs({
  activeTab,
  onTabChange,
  commonGround,
  beyondLabelUnlocked,
  users,
  latestSuggestion,
  locale,
}: UnderstandingTabsProps) {
  const demoCopy = getCopy(locale).demo;

  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange} className="flex flex-col gap-4">
      <Tabs.List className="inline-flex w-fit gap-1 rounded-full bg-[var(--panel-muted)] p-1">
        <TabTrigger value="common" label={demoCopy.tabLabels.common} />
        <TabTrigger value="beyond" label={demoCopy.tabLabels.beyond} />
        <TabTrigger value="ask" label={demoCopy.tabLabels.ask} />
      </Tabs.List>

      <Tabs.Content value="common" className="space-y-3 outline-none">
        {commonGround.map((item) => (
          <motion.div key={item} layout>
            <DetailCard title={demoCopy.sharedSignal} detail={item} />
          </motion.div>
        ))}
      </Tabs.Content>

      <Tabs.Content value="beyond" className="outline-none">
        {beyondLabelUnlocked ? (
          <div className="space-y-3">
            <DetailCard
              title={demoCopy.beyondTitles.style}
              detail={users[0].beyondLabel.conversationStyle}
            />
            <DetailCard
              title={demoCopy.beyondTitles.misunderstood}
              detail={users[0].beyondLabel.misunderstoodAs}
            />
            <DetailCard
              title={demoCopy.beyondTitles.topic}
              detail={users[0].beyondLabel.canTalkForeverAbout}
            />
            <DetailCard
              title={demoCopy.beyondTitles.groupWork}
              detail={users[1].beyondLabel.groupWorkStyle}
            />
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-[var(--border-strong)] bg-white/62 p-6 text-center text-sm text-slate-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--panel-muted)] text-slate-500">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <p className="mt-4 font-semibold text-slate-700">{demoCopy.richerContextUnlocks}</p>
            <p className="mt-2 leading-6">
              {demoCopy.richerContextHelp}
            </p>
          </div>
        )}
      </Tabs.Content>

      <Tabs.Content value="ask" className="space-y-3 outline-none">
        <DetailCard
          title={demoCopy.promptingPrinciple}
          detail={demoCopy.promptingPrincipleDetail}
        />
        {latestSuggestion ? (
          <DetailCard
            title={demoCopy.latestHelper}
            detail={`${latestSuggestion.text} (${latestSuggestion.explanation})`}
          />
        ) : (
          <DetailCard
            title={demoCopy.tryOneAction}
            detail={demoCopy.tryOneActionDetail}
          />
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
