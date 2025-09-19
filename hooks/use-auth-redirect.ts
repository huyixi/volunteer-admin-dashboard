"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";

type Options = {
  enabled?: boolean;
};

const LOGIN_PATH = "/login";

export function useAuthRedirect(options: Options = {}) {
  const router = useRouter();
  const { user, loading } = useUser();
  const enabled = options.enabled ?? true;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (!loading && !user) {
      router.replace(LOGIN_PATH); // 用户未登录，跳转
    }

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          router.replace(LOGIN_PATH); // 用户登出或 session 失效
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [enabled, user, loading, router]);
}
