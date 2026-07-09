import { CertificateCard } from "@/components/certificate-card";
import certificates from "@/data/certificates.json";
import type { Certificate } from "@/types";

export const metadata = { title: "Certificates" };

export default function CertificatesPage() {
  const certificateData = certificates as Certificate[];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <h1 className="font-display text-2xl text-ink">Certificates</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {certificateData.length} verified credentials. Tap a card to preview and verify.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificateData.map((certificate, index) => (
          <CertificateCard key={certificate.id} certificate={certificate} index={index} />
        ))}
      </div>
    </div>
  );
}
