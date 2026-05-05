import { demoCopy } from "@/lib/demo-copy";

const featureCards = [
  {
    label: "Feature 01",
    title: "Shared-interest icebreaker",
    body: "A lightweight cue helps the conversation start naturally.",
  },
  {
    label: "Feature 02",
    title: "AI-guided deeper cue",
    body: "A better follow-up angle grows from a real exchange, not a stereotype.",
  },
] as const;

export function FeatureBento() {
  return (
    <section
      id="principles"
      className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="rounded-[32px] border border-[var(--border-soft)] bg-[var(--panel-muted)] p-6 shadow-[0_20px_50px_rgba(17,32,42,0.06)] md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-stronger)]">
          Principles
        </p>
        <h2 className="mt-4 text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
          The concept is simple on purpose.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[color:rgba(17,32,42,0.7)] md:text-base">
          BridgeChat focuses on the smallest interventions that can shift a first interaction away from labeling and toward understanding.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {demoCopy.home.principles.map((principle) => (
            <span
              key={principle}
              className="rounded-full border border-[var(--border-strong)] bg-white px-4 py-2 text-sm font-medium text-[color:rgba(17,32,42,0.76)]"
            >
              {principle}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featureCards.map((feature) => (
          <article
            key={feature.title}
            className="relative overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_20px_50px_rgba(17,32,42,0.06)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(154,208,193,0.24),transparent_72%)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-stronger)]">
                {feature.label}
              </p>
              <h3 className="mt-4 text-2xl leading-tight text-[var(--foreground)]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:rgba(17,32,42,0.72)] md:text-base">
                {feature.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
