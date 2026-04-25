import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { getCopy } from "@/lib/copy";
import type { DemoUser } from "@/lib/types";

function HeaderPerson({ user }: { user: DemoUser }) {
  return (
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

  return (
    <header className="border-b border-[var(--border-soft)] px-6 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <HeaderPerson user={users[0]} />
          <div className="hidden h-10 w-px bg-[var(--border-soft)] md:block" />
          <HeaderPerson user={users[1]} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SecondaryChip>{users[0].label}</SecondaryChip>
          <SecondaryChip>{users[0].interests[0]}</SecondaryChip>
          <SecondaryChip>{users[0].conversationPreference}</SecondaryChip>
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--accent-glow)] px-3 py-1 text-xs font-medium text-[var(--accent-stronger)]">
            <Sparkles className="h-3.5 w-3.5" />
            {copy.labelsStayLightweight}
          </span>
        </div>
      </div>
    </header>
  );
}
