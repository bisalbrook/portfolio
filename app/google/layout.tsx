import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search" };

export default function GoogleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
