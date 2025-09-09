"use client";

import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    // 初次加载用户
    async function loadUser() {
      const { data } = await supabaseBrowser.auth.getUser();
      if (!isMounted) return;

      setUser(data.user ?? null);
      setLoading(false);
    }

    loadUser();

    // 监听登录/登出事件，实时更新 user
    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
      },
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
