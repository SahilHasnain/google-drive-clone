"use client";
import { useTouchSafety } from "@/hooks/useTouchSafety";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  useTouchSafety();
  return <>{children}</>;
}
