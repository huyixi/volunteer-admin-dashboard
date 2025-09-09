"use client";

import { ReactNode } from "react";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export function AuthGuard({ children }: { children: ReactNode }) {
  useAuthRedirect();

  return <>{children}</>;
}
