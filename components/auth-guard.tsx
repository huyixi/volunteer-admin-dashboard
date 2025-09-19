"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = useMemo(() => {
    if (!pathname) return false;
    const publicRoutes = [
      "/login",
      "/sign-up",
      "/sign-up-success",
      "/forgot-password",
      "/update-password",
      "/confirm",
    ];

    return publicRoutes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  useAuthRedirect({ enabled: !isPublicRoute });

  return <>{children}</>;
}
