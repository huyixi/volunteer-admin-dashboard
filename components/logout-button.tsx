"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

export function LogoutButton() {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading || !user) return null;

  const logout = async () => {
    await supabaseBrowser.auth.signOut();
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
