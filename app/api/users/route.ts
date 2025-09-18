import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const supabase = await createClient();
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .range(rangeFrom, rangeTo);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: users });
}
