import { FeatureBento } from "@/components/site/FeatureBento";
import { HomeHero } from "@/components/site/HomeHero";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 md:px-6 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(154,208,193,0.3),transparent_70%)]" />
        <div className="absolute left-1/2 top-44 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(231,245,239,0.92),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-[radial-gradient(circle,rgba(31,107,99,0.12),transparent_72%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <HomeHero />
        <FeatureBento />
      </div>
    </main>
  );
}
