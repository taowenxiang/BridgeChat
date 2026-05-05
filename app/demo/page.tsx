import { AppShell } from "@/components/bridgechat/AppShell";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { isAiConfigured } from "@/lib/ai";

export const dynamic = "force-dynamic";

export default function DemoPage() {
  return (
    <LocaleProvider>
      <AppShell aiConfigured={isAiConfigured()} />
    </LocaleProvider>
  );
}
