"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

type MenuItem = {
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
};

const soups: MenuItem[] = [
  {
    nameFr: "Borchtch",
    nameEn: "Borscht",
    descFr: "Soupe traditionnelle russe à la betterave, servie avec de la crème fraîche",
    descEn: "Traditional Russian beetroot soup, served with sour cream",
  },
  {
    nameFr: "Solianka",
    nameEn: "Solyanka",
    descFr: "Soupe russe épaisse et épicée aux viandes, cornichons et olives",
    descEn: "Thick and spicy Russian soup with meats, pickles, and olives",
  },
];

const mains: MenuItem[] = [
  {
    nameFr: "Filet Mignon aux Pommes",
    nameEn: "Filet Mignon with Apples",
    descFr: "Filet mignon de porc ou de bœuf, accompagné de pommes caramélisées",
    descEn: "Pork or beef filet mignon, accompanied by caramelized apples",
  },
  {
    nameFr: "Tartare de Bœuf au Couteau",
    nameEn: "Hand-Cut Beef Tartare",
    descFr: "Bœuf frais coupé au couteau, assaisonné selon la tradition française",
    descEn: "Fresh beef hand-cut and seasoned in the French tradition",
  },
  {
    nameFr: "Côte de Bœuf",
    nameEn: "Rib Steak",
    descFr: "Côte de bœuf grillée, servie pour deux personnes avec ses accompagnements",
    descEn: "Grilled rib steak, served for two with side dishes",
  },
];

type TartineItem = {
  nameFr: string;
  nameEn: string;
};

const tartines: TartineItem[] = [
  { nameFr: "Tartine Fromage", nameEn: "Cheese Tartine" },
  { nameFr: "Tartine Charcuterie", nameEn: "Charcuterie Tartine" },
  { nameFr: "Tartine Œuf", nameEn: "Egg Tartine" },
  { nameFr: "Tartine Salade", nameEn: "Salad Tartine" },
];

export default function MenuPage() {
  const { locale } = useLanguage();

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-heading">{t("menu.title", locale)}</h1>
          <p className="section-subheading">{t("menu.subtitle", locale)}</p>
        </div>

        {/* Soups */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-wine-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🍲</span>
            {t("menu.starters", locale)}
          </h2>
          <div className="space-y-6">
            {soups.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {locale === "fr" ? item.nameFr : item.nameEn}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {locale === "fr" ? item.descFr : item.descEn}
                </p>
                {locale === "fr" && (
                  <p className="text-xs text-gray-400 mt-1 italic">{item.nameEn}</p>
                )}
                {locale === "en" && (
                  <p className="text-xs text-gray-400 mt-1 italic">{item.nameFr}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mains */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-wine-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🥩</span>
            {t("menu.mains", locale)}
          </h2>
          <div className="space-y-6">
            {mains.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {locale === "fr" ? item.nameFr : item.nameEn}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {locale === "fr" ? item.descFr : item.descEn}
                </p>
                {locale === "fr" && (
                  <p className="text-xs text-gray-400 mt-1 italic">{item.nameEn}</p>
                )}
                {locale === "en" && (
                  <p className="text-xs text-gray-400 mt-1 italic">{item.nameFr}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tartines */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-wine-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🥖</span>
            {t("menu.tartines", locale)}
          </h2>
          <p className="text-gray-500 text-sm mb-4 italic">
            {t("menu.tartinesDesc", locale)}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {tartines.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-base font-bold text-gray-900">
                  {locale === "fr" ? item.nameFr : item.nameEn}
                </h3>
                <p className="text-xs text-gray-400 mt-1 italic">
                  {locale === "fr" ? item.nameEn : item.nameFr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="text-center text-sm text-gray-400 italic mt-12">
          {locale === "fr"
            ? "La carte évolue au fil des saisons. D'autres plats seront ajoutés prochainement."
            : "Our menu evolves with the seasons. More dishes will be added soon."}
        </div>
      </div>
    </div>
  );
}
