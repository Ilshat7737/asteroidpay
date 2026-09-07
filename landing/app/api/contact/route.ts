import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ["Invalid request body"] } },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("New contact request:", parsed.data);

  return NextResponse.json({ ok: true });
}
