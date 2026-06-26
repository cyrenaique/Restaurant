"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function Footer() {
  const { locale } = useLanguage();

  return (
    <footer className="bg-wine-950 text-wine-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-wine-400">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍷</span>
            <span className="font-display font-semibold text-white">Restaurant</span>
            <span className="text-wine-500">·</span>
            <span>{t("footer.location", locale)}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/recipes"
              className="text-wine-500 hover:text-wine-300 transition-colors text-sm flex items-center gap-1"
            >
              🔒 {locale === "fr" ? "Espace privé" : "Private area"}
            </Link>
            <span>
              &copy; {new Date().getFullYear()} Restaurant. {t("footer.rights", locale)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
