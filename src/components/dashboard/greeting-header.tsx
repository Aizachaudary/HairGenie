"use client";

import { useEffect, useState } from "react";

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function GreetingHeader({ name }: { name: string }) {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{greeting},</p>
      <h1 className="font-heading text-3xl font-bold tracking-tight">{name}</h1>
    </div>
  );
}
