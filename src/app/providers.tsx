"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
//const router = useRouter();

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
