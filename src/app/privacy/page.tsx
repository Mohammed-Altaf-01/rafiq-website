import { LegalPage } from "@/components/legal/legal-page";
import { loadLegal } from "@/lib/legal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("/privacy");

export default async function PrivacyPolicyPage() {
  const doc = await loadLegal("privacy-policy");

  return <LegalPage doc={doc} sibling={{ href: "/terms", label: "Read the Terms of Service" }} />;
}
