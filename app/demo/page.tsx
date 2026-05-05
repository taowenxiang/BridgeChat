import { DemoShell } from "@/components/demo/DemoShell";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

export default function DemoPage() {
  return (
    <LocaleProvider>
      <DemoShell />
    </LocaleProvider>
  );
}
