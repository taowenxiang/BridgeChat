import { AppShell } from "@/components/bridgechat/AppShell";
import { isAiConfigured } from "@/lib/ai";

export const dynamic = "force-dynamic";

export default function DemoPage() {
  return <AppShell aiConfigured={isAiConfigured()} />;
}
