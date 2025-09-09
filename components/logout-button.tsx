"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/client";

export function LogoutButton() {
  const logout = async () => {
    await supabaseBrowser.auth.signOut();
  };

  return <Button onClick={logout}>Logout</Button>;
}
