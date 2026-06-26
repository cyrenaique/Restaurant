"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export default function ContactPage() {
  const { locale } = useLanguage();

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-heading">{t("contact.title", locale)}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Address */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sea-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sea-700" />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900">
                {t("contact.address", locale)}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Intra-Muros<br />
              Saint-Malo, 35400<br />
              Bretagne, France
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-wine-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-wine-700" />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900">
                {t("contact.phone", locale)}
              </h2>
            </div>
            <p className="text-gray-600">
              +33 (0)2 XX XX XX XX
            </p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-700" />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900">
                {t("contact.hours", locale)}
              </h2>
            </div>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {t("contact.hoursDetail", locale)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
