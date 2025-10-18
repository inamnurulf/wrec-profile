// src/components/atoms/LangSwitcher.tsx
'use client';

import {useState, useTransition} from 'react';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';
import {ChevronDown} from 'lucide-react';
import {setLocale} from '@/app/actions/set-locale';

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSwitch = (l) => {
    const parts = pathname.split('/');
    const maybeLocale = parts[1];
    const remainingPath = ['en', 'id'].includes(maybeLocale)
      ? `/${parts.slice(2).join('/')}`
      : pathname;
    startTransition(() => setLocale(l, remainingPath || '/'));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={pending}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {locale === 'en' ? 'English' : 'Bahasa'}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => handleSwitch('en')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 ${
              locale === 'en'
                ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                : 'text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleSwitch('id')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 ${
              locale === 'id'
                ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                : 'text-gray-700'
            }`}
          >
            Bahasa Indonesia
          </button>
        </div>
      )}
    </div>
  );
}
