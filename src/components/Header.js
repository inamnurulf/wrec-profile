"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Container from "./atoms/Container";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const NavLinks = ({ onClick }) => (
    <>
      <Link href="/#about" onClick={onClick} className="hover:text-emerald-700">
        About
      </Link>
      <Link
        href="/#vision"
        onClick={onClick}
        className="hover:text-emerald-700"
      >
        Vision
      </Link>
      <Link href="/#scope" onClick={onClick} className="hover:text-emerald-700">
        Research
      </Link>
      <Link
        href="/#milestones"
        onClick={onClick}
        className="hover:text-emerald-700"
      >
        Milestones
      </Link>
      <Link href="/#team" onClick={onClick} className="hover:text-emerald-700">
        Team
      </Link>
      <Link
        href="/#contact"
        onClick={onClick}
        className="hover:text-emerald-700"
      >
        Contact
      </Link>
      <Link
        href="/articles"
        onClick={onClick}
        className="hover:text-emerald-700"
      >
        Articles
      </Link>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-bold">
                W
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">WRECC</p>
                <p className="text-xs text-slate-500">
                  Data, Innovation &amp; Resilience
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-700">
              <NavLinks />
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/#contact"
              className="hidden sm:inline-block rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Get in touch
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile sheet in a portal to <body> with a very high z-index */}
      {mounted &&
        createPortal(
          <div
            className={`sm:hidden fixed inset-0 z-[9999] overflow-hidden transition ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/30 transition-opacity ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <div
              className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl border-l border-slate-200 transition-transform duration-200 ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex h-14 items-center justify-between px-4 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-bold">
                    W
                  </div>
                  <span className="text-sm font-semibold">WRECC</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-3 p-4 text-sm font-medium text-slate-700">
                <NavLinks onClick={() => setOpen(false)} />
              </nav>

              <div className="p-4 border-t border-slate-200">
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
