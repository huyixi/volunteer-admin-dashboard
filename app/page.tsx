import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const LOGIN_PATH = "/login";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  redirect(LOGIN_PATH);
}
