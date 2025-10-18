// middleware.js
import { NextResponse } from "next/server";
const locales = ["en", "id"];
const defaultLocale = "en";

function isCrawler(ua = "") {
  ua = ua.toLowerCase();
  return ["googlebot", "bingbot", "baiduspider", "yandexbot"].some(b => ua.includes(b));
}
function choose(acceptLang) {
  const lang = (acceptLang?.split(",")[0] || "").toLowerCase();
  if (lang.startsWith("id")) return "id";
  if (lang.startsWith("en")) return "en";
  return defaultLocale;
}
export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }
  if (isCrawler(req.headers.get("user-agent") || "")) {
    return NextResponse.next();
  }
  if (pathname === "/") {
    const best = choose(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = `/${best}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|media/).*)"],
};
