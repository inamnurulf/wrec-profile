// src/app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

import {Geist, Geist_Mono} from 'next/font/google';
import '../globals.css'; // path relative to [locale]/layout

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/utils/Provider';

const geistSans = Geist({variable: '--font-geist-sans', subsets: ['latin']});
const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']});

// Optional: keep your metadata here or in a separate file
export const metadata = {
  title: 'Water Resources Engineering and Climate Center',
  description: 'Created by INAM'
};

export default async function LocaleLayout({
  children
}) {
  // Resolved from URL by next-intl plugin: /en, /id
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        {/* Provide translations to everything (Header, Footer, pages, etc.) */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Optional: pre-generate both locales (useful if you statically generate pages)
export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'id'}];
}
