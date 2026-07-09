"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { WindowFrame } from "@/components/window-frame";
import profile from "@/data/profile.json";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject is a little short"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ToastState = { kind: "success" | "error"; message: string } | null;

export default function ContactPage() {
  const [toast, setToast] = useState<ToastState>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: values.name,
            from_email: values.email,
            subject: values.subject,
            message: values.message,
          },
          { publicKey }
        );
      } else {
        // No EmailJS keys configured yet — see .env.example. Simulate success
        // in dev so the form and validation can still be exercised end to end.
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setToast({ kind: "success", message: "Message sent — I'll get back to you soon." });
      reset();
    } catch {
      setToast({ kind: "error", message: "Something went wrong. Please try emailing me directly." });
    } finally {
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6">
      <h1 className="font-display text-2xl text-ink">Contact</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Have a project in mind, or just want to say hi? Send a message.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <WindowFrame label="new message">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mono-tag mb-1.5 block">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="w-full rounded-xl border border-border bg-base-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-signal-teal/50"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-signal-rose">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mono-tag mb-1.5 block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-border bg-base-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-signal-teal/50"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-signal-rose">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mono-tag mb-1.5 block">
                  Subject
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  className="w-full rounded-xl border border-border bg-base-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-signal-teal/50"
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-signal-rose">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mono-tag mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full resize-none rounded-xl border border-border bg-base-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-signal-teal/50"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-signal-rose">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal-teal px-4 py-2.5 text-sm font-medium text-base transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </WindowFrame>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <WindowFrame label="reach me directly">
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-ink-muted transition-colors hover:text-signal-teal"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
              <p className="flex items-center gap-2 text-ink-muted">
                <MapPin className="h-4 w-4" /> {profile.location}
              </p>
              <div className="flex gap-3 pt-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border p-2 text-ink-muted transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border p-2 text-ink-muted transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </WindowFrame>

          <WindowFrame label="location">
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-center">
              <p className="max-w-[220px] text-xs text-ink-faint">
                Map placeholder — drop in a Google Maps embed here using your
                own API key when you&apos;re ready.
              </p>
            </div>
          </WindowFrame>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="glass-strong fixed bottom-24 left-1/2 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-ink shadow-xl"
          >
            {toast.kind === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-signal-teal" />
            ) : (
              <AlertCircle className="h-4 w-4 text-signal-rose" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
