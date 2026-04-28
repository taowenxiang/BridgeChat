import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { getCopy } from "@/lib/copy";
import type { DemoUser } from "@/lib/types";

function HeaderPerson({ user, mirrored = false }: { user: DemoUser; mirrored?: boolean }) {
  return (
    <div className="rounded-[28px] border border-[var(--border-strong)] bg-white/84 p-4 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-12 w-12 rounded-2xl border border-white/60 bg-white/80 object-cover shadow-sm"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">{user.name}</p>
          <p className="truncate text-xs text-slate-500">{user.role}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <SecondaryChip>{user.label}</SecondaryChip>
        <SecondaryChip>{user.interests[0]}</SecondaryChip>
        <SecondaryChip>{user.conversationPreference}</SecondaryChip>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">
        {mirrored ? user.beyondLabel.groupWorkStyle : user.beyondLabel.conversationStyle}
      </p>
    </div>
  );
}

function SecondaryChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--border-strong)] bg-white/65 px-3 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

export function ChatHeader({
  users,
  locale,
}: {
  users: [DemoUser, DemoUser];
  locale: "en" | "zh";
}) {
  const copy = getCopy(locale).demo;
  const railTitle = locale === "zh" ? "聊天线索" : "Chat context";
  const bridgeLabel = locale === "zh" ? "人物" : "People";
  const lightweightNote =
    locale === "zh"
      ? `${users[0].conversationPreference}，${users[1].conversationPreference}。`
      : `${users[0].conversationPreference}. ${users[1].conversationPreference}.`;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {bridgeLabel}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">{railTitle}</h2>
      </div>

      <HeaderPerson user={users[0]} />
      <HeaderPerson user={users[1]} mirrored />

      <div className="rounded-[28px] border border-[var(--border-strong)] bg-[var(--accent-glow)] p-4 text-sm leading-6 text-[var(--accent-stronger)] shadow-sm">
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-white/72 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          {copy.labelsStayLightweight}
        </span>
        <p className="mt-3">{lightweightNote}</p>
      </div>
    </div>
  );
}
