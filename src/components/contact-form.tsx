"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Contact");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [feedback, setFeedback] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setStatus("error");
      setFeedback(t("invalidEmail"));
      return;
    }

    if (message.trim() === "") {
      setStatus("error");
      setFeedback(t("emptyMessage"));
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setFeedback(t("success"));
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback(t("error"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("messagePlaceholder")}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      {feedback && (
        <p
          role="status"
          className={`text-sm ${status === "success" ? "text-primary" : "text-destructive"}`}
        >
          {feedback}
        </p>
      )}
      <Button type="submit" className="mt-2 self-start" disabled={status === "loading"}>
        {status === "loading" && <Loader2 className="animate-spin" data-icon="inline-start" />}
        {status === "loading" ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
