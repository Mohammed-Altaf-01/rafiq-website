import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The agreement between you and Rafiq: accounts, the free trial and subscriptions, the Accessibility permission, and how blocking works.",
};

export default async function TermsPage() {
  const doc = await loadLegal("terms-and-conditions");

  return <LegalPage doc={doc} sibling={{ href: "/privacy", label: "Read the Privacy Policy" }} />;
}
