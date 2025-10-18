import { locales } from "../../i18n";

export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

  const routes = ["", "/about", "/articles", "/database"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date().toISOString(),
      alternates: {
        languages: {
          en: `${base}/en${route}`,
          id: `${base}/id${route}`,
          "x-default": `${base}/en${route}`,
        },
      },
    }))
  );
}
