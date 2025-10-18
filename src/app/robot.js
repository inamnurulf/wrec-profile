export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
