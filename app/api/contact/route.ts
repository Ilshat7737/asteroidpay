import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("New contact request:", parsed.data);

  return NextResponse.json({ ok: true });
}
