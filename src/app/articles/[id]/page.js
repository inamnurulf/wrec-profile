"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  Tag as TagIcon,
  User,
  Bookmark,
  MessageSquare,
  ChevronRight,
  Eye,
} from "lucide-react";

import RelatedItemCard from "@/components/atoms/RelatedItemCard";
import ShareButtons from "@/components/atoms/ShareButton";

const article = {
  title:
    "Manajemen Sumber Daya Air untuk Ketahanan Iklim: Strategi Berkelanjutan",
  author: {
    name: "Dr. Intan Pradipta",
    role: "Climate & Water Policy Specialist",
    avatar:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop",
  },
  date: "Kamis, 19 Juni 2025",
  hero:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
  tags: ["Air", "Iklim", "Ketahanan", "Sustainability"],
  sections: [
    {
      id: "mengapa-penting",
      heading: "Mengapa Pengelolaan Air Penting dalam Adaptasi Iklim?",
      body:
        "Air adalah inti dari keberlanjutan ekosistem dan kehidupan manusia. Perubahan iklim meningkatkan frekuensi banjir, kekeringan, dan ketidakpastian curah hujan. Tanpa manajemen yang baik, ketahanan pangan, energi, dan kesehatan masyarakat akan terganggu. Dengan pendekatan ilmiah, kita dapat memetakan risiko dan merumuskan strategi mitigasi.",
    },
    {
      id: "fakta-terkini",
      heading: "Fakta Terkini Tentang Sumber Daya Air di Indonesia",
      body:
        "Indonesia memiliki curah hujan tinggi namun distribusinya tidak merata. Urbanisasi cepat memperbesar tekanan terhadap sistem air. Untuk menghadapi hal ini, diperlukan kebijakan, teknologi, dan partisipasi masyarakat.",
      bullets: [
        "Sebaran curah hujan tidak merata antar wilayah",
        "40% wilayah berisiko tinggi kekeringan musiman",
        "Banjir perkotaan meningkat akibat berkurangnya ruang resapan",
      ],
    },
    {
      id: "strategi",
      heading: "Strategi Pengelolaan Sumber Daya Air",
      body:
        "Pengelolaan air terpadu mencakup konservasi DAS, optimalisasi waduk, dan infrastruktur hijau di perkotaan. Teknologi digital seperti sensor IoT dan machine learning juga membantu memperkuat prediksi hidrologi dan peringatan dini bencana.",
    },
    {
      id: "program",
      heading: "Program yang Kami Dorong",
      list: [
        "Sistem Peringatan Dini Banjir berbasis IoT",
        "Konservasi DAS melalui pendekatan ekosistem",
        "Riset jejak karbon sektor air",
        "Pengembangan infrastruktur hijau di kota besar",
      ],
    },
    {
      id: "data-fakta",
      heading: "Data & Fakta: Mengapa Aksi Perlu Dilakukan Sekarang",
      body:
        "World Bank memperkirakan 80% bencana alam di Indonesia terkait air. Investasi dalam teknologi adaptasi iklim dapat mengurangi kerugian hingga miliaran dolar setiap tahun.",
    },
    {
      id: "kesimpulan",
      heading: "Kesimpulan",
      body:
        "Pengelolaan air yang terintegrasi adalah kunci menghadapi perubahan iklim. Kolaborasi antara akademisi, pemerintah, dan masyarakat diperlukan untuk mewujudkan sistem yang tangguh. Mari bersama membangun masa depan yang lebih resilien.",
    },
  ],
};

const related = [
  {
    title: "Pemanfaatan IoT dalam Monitoring Kualitas Air",
    thumb:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format&fit=crop",
    date: "Mei 2025",
  },
  {
    title: "Infrastruktur Hijau: Solusi Banjir Perkotaan",
    thumb:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format&fit=crop",
    date: "Mei 2025",
  },
  {
    title: "Konservasi DAS untuk Ketahanan Air Nasional",
    thumb:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
    date: "April 2025",
  },
  {
    title: "Prediksi Banjir dengan Machine Learning",
    thumb:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop",
    date: "Maret 2025",
  },
];


function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const current = window.scrollY;
      setProgress(Math.min(100, Math.max(0, (current / total) * 100)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;



const AuthorCard = () => (
  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow">
    <img
      src={article.author.avatar}
      alt={article.author.name}
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <div className="font-semibold flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" /> {article.author.name}
      </div>
      <p className="text-sm text-gray-500">{article.author.role}</p>
    </div>
    <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
      <Calendar className="w-4 h-4" /> {article.date}
    </div>
  </div>
);

const TagPills = () => (
  <div className="flex flex-wrap gap-2">
    {article.tags.map((t) => (
      <span
        key={t}
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium"
      >
        <TagIcon className="w-3 h-3" /> {t}
      </span>
    ))}
  </div>
);


// ===== Main Page =====
export default function LegalitasPage() {
  const progress = useReadingProgress();

  const fullText = useMemo(
    () =>
      article.sections
        .map((s) => [s.body, ...(s.bullets || []), ...(s.list || [])].join(" "))
        .join(" "),
    []
  );
  const minutes = Math.max(3, Math.round(wordCount(fullText) / 200));

  const toc = article.sections.map((s) => ({ id: s.id, heading: s.heading }));

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-emerald-500 z-50"
        style={{ width: `${progress}%` }}
      />

      <header className="border-b bg-gradient-to-br from-emerald-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 flex items-center gap-2">
            <span className="hover:text-gray-700 cursor-pointer">Beranda</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-gray-700 cursor-pointer">Artikel</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">Legalitas PMA</span>
          </nav>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600">
            <div className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" /> {minutes} menit baca
            </div>
            <div className="inline-flex items-center gap-2">
              <Eye className="w-4 h-4" /> 12.4k views
            </div>
            <TagPills />
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4">
        <img
          src={article.hero}
          alt="hero"
          className="w-full h-72 md:h-96 object-cover rounded-2xl shadow mt-6"
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Content */}
        <article className="md:col-span-8 bg-white rounded-2xl shadow p-6">
          <AuthorCard />

          <div className="my-6">
            <ShareButtons />
          </div>

          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mt-8 mb-3">{section.heading}</h2>
              {section.body && (
                <p className="text-gray-700 leading-8">{section.body}</p>
              )}
              {section.bullets && (
                <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
              {section.list && (
                <ul className="mt-3 divide-y">
                  {section.list.map((b, i) => (
                    <li key={i} className="py-2 flex items-start gap-2">
                      <Bookmark className="w-4 h-4 mt-1 text-emerald-600" />
                      <span className="text-gray-700">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Comments placeholder */}
          <div className="mt-10 p-4 border rounded-2xl bg-gray-50">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
              <MessageSquare className="w-4 h-4" /> Kolom Komentar (dummy)
            </div>
            <p className="text-sm text-gray-500">
              Area ini hanya preview. Integrasikan dengan backend/third‑party jika
              diperlukan.
            </p>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-6 md:sticky md:top-20 self-start">
          {/* TOC */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-600" /> Daftar Isi
            </div>
            <ul className="space-y-2 text-sm">
              {toc.map((i) => (
                <li key={i.id}>
                  <button
                    className="text-left w-full text-gray-700 hover:text-emerald-700"
                    onClick={() => handleScrollTo(i.id)}
                  >
                    {i.heading}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Related */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="text-sm font-semibold text-gray-700 mb-3">Artikel Lain</div>
            <ul className="space-y-4">
              {related.map((item, idx) => (
                <RelatedItemCard key={idx} item={item} />
              ))}
            </ul>
          </div>

          {/* Author */}
          <AuthorCard />
        </aside>
      </main>

    </div>
  );
}
