import { site } from "@/lib/site";

const home = `${site.url}/`;
const organization = `${site.url}/#organization`;

// No aggregateRating or review: the site has none of its own to back them, and
// copying the Google Play rating risks a manual action.
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organization,
      name: site.name,
      alternateName: site.alternateName,
      url: home,
      logo: `${site.url}/brand/app-icon.png`,
      email: site.supportEmail,
      sameAs: [site.playStore],
    },
    {
      "@type": "WebSite",
      name: site.name,
      alternateName: [site.alternateName, "rafiqguardian.app"],
      url: home,
      publisher: { "@id": organization },
    },
    {
      "@type": "MobileApplication",
      name: site.name,
      alternateName: site.alternateName,
      description: site.description,
      url: home,
      installUrl: site.playStore,
      operatingSystem: `Android ${site.minAndroid} or newer`,
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": organization },
    },
  ],
};
