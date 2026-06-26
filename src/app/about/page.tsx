"use client";

import { MapPin, Heart, Utensils } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function AboutPage() {
  const { locale } = useLanguage();

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-heading">{t("about.title", locale)}</h1>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-wine-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-wine-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                {locale === "fr" ? "Notre Histoire" : "Our Story"}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("about.story", locale)}
              </p>
            </div>
          </div>
        </div>

        {/* Cuisine */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Utensils className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                {locale === "fr" ? "Notre Cuisine" : "Our Cuisine"}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {locale === "fr"
                  ? "Notre carte mêle les saveurs profondes de la cuisine russe — borchtch, solianka — aux classiques de la gastronomie française : filet mignon, tartare de bœuf au couteau, côte de bœuf. Nos tartines gourmandes, garnies de fromages, charcuteries, œufs et salades, sont un hommage à la simplicité bretonne."
                  : "Our menu blends the deep flavors of Russian cuisine — borscht, solyanka — with French gastronomic classics: filet mignon, hand-cut beef tartare, rib steak. Our gourmet tartines, topped with cheeses, charcuterie, eggs, and salads, are a tribute to Breton simplicity."}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-sea-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-sea-700" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                Saint-Malo
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("about.location", locale)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
