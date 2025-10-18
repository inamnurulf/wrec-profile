// src/app/actions/set-locale.ts
'use server';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

const SUPPORTED = ['en', 'id'] ;

export async function setLocale(nextLocale, returnPath = '/') {
  const safe = SUPPORTED.includes(nextLocale) ? nextLocale : 'en';

  // Persist for ~1 year
  await cookies().set('locale', safe, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  });

  redirect(`/${safe}${returnPath === '/' ? '' : returnPath}`);
}
