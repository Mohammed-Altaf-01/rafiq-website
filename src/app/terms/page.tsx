import { LegalPage } from "@/components/legal/legal-page";
import { loadLegal } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("/terms");

export default async function TermsPage() {
  const doc = await loadLegal("terms-and-conditions");

  return <LegalPage doc={doc} sibling={{ href: "/privacy", label: "Read the Privacy Policy" }} />;
}
