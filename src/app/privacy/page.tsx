import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Rafiq collects, what it deliberately never collects, and the choices you have. Content matching happens on your device and is never stored or sent.",
};

export default async function PrivacyPolicyPage() {
  const doc = await loadLegal("privacy-policy");

  return <LegalPage doc={doc} sibling={{ href: "/terms", label: "Read the Terms of Service" }} />;
}
