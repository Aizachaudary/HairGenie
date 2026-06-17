import Link from "next/link";
import { BellRing } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ReminderBanner() {
  return (
    <Alert className="border-primary/30 bg-accent/40">
      <BellRing className="size-4 text-primary" />
      <AlertTitle>You still have routine tasks today</AlertTitle>
      <AlertDescription>
        Finish today&apos;s routine to keep your streak going. <Link href="/routine" className="font-medium text-primary hover:underline">View your routine</Link>
      </AlertDescription>
    </Alert>
  );
}
