import { Resend } from "resend";

import profile from "@/data/profile.json";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: profile.email,
    replyTo: email,
    subject: `Nouveau message portfolio de ${name}`,
    text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }

  return Response.json({ success: true });
}
