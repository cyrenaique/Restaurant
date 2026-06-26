"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/menu", labelKey: "nav.menu" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();

  return (
    <header className="bg-wine-950/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-wine-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-sand-100 transition-colors shadow-md">
              <span className="text-2xl">🍷</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold text-white block leading-tight">
                Restaurant
              </span>
              <span className="text-xs text-wine-300 font-medium tracking-wide uppercase">
                Saint-Malo
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-wine-200 hover:text-white hover:bg-wine-800/50 font-medium transition-colors"
              >
                {t(link.labelKey, locale)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="ml-3 flex items-center gap-1.5 px-3 py-2 rounded-lg text-wine-200 hover:text-white hover:bg-wine-800/50 font-medium transition-colors border border-wine-700/50"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              {t("common.switchLang", locale)}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLocale}
              className="p-2 rounded-lg text-wine-200 hover:bg-wine-800/50"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-lg text-wine-200 hover:bg-wine-800/50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-wine-800/50 bg-wine-950 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 px-4 text-wine-200 hover:text-white hover:bg-wine-800/50 rounded-lg font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t(link.labelKey, locale)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
