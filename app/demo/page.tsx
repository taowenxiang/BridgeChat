import { AppShell } from "@/components/bridgechat/AppShell";
import { isAiConfigured } from "@/lib/ai";

export default function DemoPage() {
  return <AppShell aiConfigured={isAiConfigured()} />;
}
