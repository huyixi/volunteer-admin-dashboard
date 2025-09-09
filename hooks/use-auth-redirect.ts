"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";

export function useAuthRedirect() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login"); // 用户未登录，跳转
    }

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          router.replace("/auth/login"); // 用户登出或 session 失效
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [user, loading, router]);
}
