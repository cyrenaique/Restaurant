"use client";

import Link from "next/link";
import { MapPin, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function HomePage() {
  const { locale } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          <div className="absolute top-8 left-[10%] text-6xl opacity-10 rotate-12">🍷</div>
          <div className="absolute top-20 right-[8%] text-5xl opacity-10 -rotate-6">🥖</div>
          <div className="absolute top-1/3 left-[5%] text-7xl opacity-[0.07] rotate-6">🍽️</div>
          <div className="absolute top-[45%] right-[12%] text-4xl opacity-10 -rotate-12">🧅</div>
          <div className="absolute bottom-[30%] left-[15%] text-5xl opacity-[0.08] rotate-3">🥩</div>
          <div className="absolute bottom-16 right-[20%] text-6xl opacity-10 -rotate-3">⚓</div>
          <div className="absolute bottom-10 left-[35%] text-4xl opacity-10 rotate-6">🏴‍☠️</div>
        </div>
        {/* Glow effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sea-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-center">
          <div className="text-6xl mb-6">🍷</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Restaurant
            <br />
            <span className="text-wine-300 text-2xl md:text-3xl font-normal">
              {t("hero.subtitle", locale)}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-wine-200 max-w-3xl mx-auto mb-4 leading-relaxed">
            {t("hero.tagline", locale)}
          </p>
          <p className="text-sm md:text-base text-wine-300 max-w-2xl mx-auto mb-10 italic flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Saint-Malo, Bretagne
          </p>
          <Link
            href="/menu"
            className="btn-primary text-lg px-8 py-4"
          >
            <UtensilsCrossed className="w-5 h-5" />
            {t("hero.cta", locale)}
          </Link>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🍲</div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                {locale === "fr" ? "Soupes Russes" : "Russian Soups"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === "fr"
                  ? "Borchtch et Solianka — des soupes généreuses aux saveurs profondes, préparées selon les recettes traditionnelles."
                  : "Borscht and Solyanka — hearty soups with deep flavors, prepared according to traditional recipes."}
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🥩</div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                {locale === "fr" ? "Viandes d'Exception" : "Exceptional Meats"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === "fr"
                  ? "Filet mignon, tartare au couteau, côte de bœuf — les plus belles pièces, cuites à la perfection."
                  : "Filet mignon, hand-cut tartare, rib steak — the finest cuts, cooked to perfection."}
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🥖</div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                {locale === "fr" ? "Tartines Gourmandes" : "Gourmet Tartines"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {locale === "fr"
                  ? "Pain de campagne garni de fromages, charcuteries, œufs et salades — simple et savoureux."
                  : "Country bread topped with cheeses, charcuterie, eggs, and salads — simple and delicious."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location teaser */}
      <section className="py-16 bg-sea-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {locale === "fr" ? "Au cœur de la Cité Corsaire" : "In the Heart of the Corsair City"}
          </h2>
          <p className="text-sea-200 text-lg leading-relaxed mb-6">
            {t("about.location", locale)}
          </p>
          <div className="flex items-center justify-center gap-2 text-sea-300">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Saint-Malo, Bretagne, France</span>
          </div>
        </div>
      </section>
    </>
  );
}
