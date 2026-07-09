"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { ExternalLink, X, BadgeCheck } from "lucide-react";
import { formatMonthYear } from "@/lib/utils";
import type { Certificate } from "@/types";

export function CertificateCard({
  certificate,
  index,
}: {
  certificate: Certificate;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="glass overflow-hidden rounded-2xl"
    >
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="group block w-full text-left">
            <div className="relative h-36 w-full overflow-hidden">
              <Image
                src={certificate.image}
                alt={certificate.title}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-sm text-ink">{certificate.title}</h3>
              <p className="mt-1 text-xs text-ink-muted">{certificate.provider}</p>
              <p className="mono-tag mt-2">{formatMonthYear(certificate.date)}</p>
            </div>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl">
            <div className="glass-strong overflow-hidden rounded-2xl">
              <div className="relative h-56 w-full">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  sizes="480px"
                  className="object-cover"
                />
                <Dialog.Close className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-ink hover:bg-black/80">
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>
              <div className="p-5">
                <Dialog.Title className="font-display text-lg text-ink">
                  {certificate.title}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-ink-muted">
                  {certificate.provider} · {formatMonthYear(certificate.date)}
                </Dialog.Description>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
                  <BadgeCheck className="h-4 w-4 text-signal-teal" />
                  Credential ID: {certificate.credentialId}
                </div>
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-signal-teal px-4 py-2 text-sm font-medium text-base transition-transform hover:scale-[1.02]"
                >
                  <ExternalLink className="h-4 w-4" /> Verify credential
                </a>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
}
