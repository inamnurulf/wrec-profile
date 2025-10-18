// src/i18n/request.js
import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async (ctx = {}) => {
  const SUPPORTED = ['en', 'id'];

  // Prefer the plugin-resolved locale
  let locale = ctx.locale;

  // Fallback: read cookie if plugin didn't supply one
  if (!locale) {
    const store = await cookies();         
    const fromCookie = store.get('locale')?.value;
    if (fromCookie && SUPPORTED.includes(fromCookie)) {
      locale = fromCookie;
    }
  }

  // Final fallback
  if (!locale || !SUPPORTED.includes(locale)) locale = 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
