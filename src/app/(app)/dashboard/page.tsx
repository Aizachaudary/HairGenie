import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Your personalized routine, hair health scores, and daily tips will live here.
      </p>
    </div>
  );
}
