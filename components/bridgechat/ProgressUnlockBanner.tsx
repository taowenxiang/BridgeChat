"use client";

import { AnimatePresence, motion } from "motion/react";

export function ProgressUnlockBanner({ message }: { message: string | null }) {
  return (
    <AnimatePresence mode="wait">
      {message ? (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
          className="absolute inset-x-0 top-0 z-30 mx-auto w-fit rounded-full border border-[var(--border-strong)] bg-[var(--accent-glow)] px-4 py-2 text-sm font-medium text-[var(--accent-stronger)] shadow-[0_16px_40px_rgba(48,121,108,0.14)]"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
