"use client";

import { useEffect, useState } from "react";

interface LiveClockProps {
  location: string;
}

export default function LiveClock({ location }: LiveClockProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
    };
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums text-[var(--ink-secondary)]">
      {location} {time ? `· ${time} BST` : "· UTC+6"}
    </span>
  );
}
