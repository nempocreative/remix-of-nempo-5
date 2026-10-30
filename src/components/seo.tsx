import { Helmet } from "react-helmet-async";

const SITE_NAME = "Nempo Organizer";
const BASE_URL = "https://nempo.id";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function SEO({
  title,
  description = "Temukan wisata alam, kuliner khas, penginapan, dan event budaya terbaik di Jawa Barat. Platform digital pariwisata Jawa Barat.",
  keywords,
  image = DEFAULT_OG_IMAGE,
  path = "/",
  type = "website",
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Destinasi Wisata, Kuliner & Budaya Jawa Barat`;
  const canonical = `${BASE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={canonical} />

      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Nempo Organizer" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nempo.id" />
      <meta name="twitter:creator" content="@nempo.id" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
    </Helmet>
  );
}
