"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

type MenuItem = {
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
  image: string;
  price: string;
};

const soups: MenuItem[] = [
  {
    nameFr: "Borchtch (Борщ)",
    nameEn: "Borscht",
    descFr: "Soupe traditionnelle russe à la betterave, servie avec de la crème fraîche",
    descEn: "Traditional Russian beetroot soup, served with sour cream",
    image: "/images/menu/Borscht_served.jpg",
    price: "9 €",
  },
  {
    nameFr: "Solianka (Солянка)",
    nameEn: "Solyanka",
    descFr: "Soupe russe épaisse et épicée aux viandes, cornichons et olives",
    descEn: "Thick and spicy Russian soup with meats, pickles, and olives",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    price: "10 €",
  },
  {
    nameFr: "Shakshuka (Шакшука)",
    nameEn: "Shakshuka",
    descFr: "Œufs pochés dans une sauce tomate épicée aux poivrons et oignons",
    descEn: "Eggs poached in a spiced tomato, pepper, and onion sauce",
    image: "/images/menu/Shakshuka_by_Calliopejen1.jpg",
    price: "11 €",
  },
  {
    nameFr: "Hareng en Manteau (Сельдь под шубой)",
    nameEn: "Herring Under a Fur Coat",
    descFr: "Salade russe en couches : hareng, betteraves, carottes, pommes de terre et mayonnaise",
    descEn: "Traditional Russian layered salad with herring, beetroot, carrots, potatoes, and mayonnaise",
    image: "/images/menu/Selidi_pod_shuboi.jpg",
    price: "10 €",
  },
];

const mains: MenuItem[] = [
  {
    nameFr: "Filet Mignon aux Pommes",
    nameEn: "Filet Mignon with Apples",
    descFr: "Filet mignon de porc ou de bœuf, accompagné de pommes caramélisées",
    descEn: "Pork or beef filet mignon, accompanied by caramelized apples",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
    price: "22 €",
  },
  {
    nameFr: "Tartare de Bœuf au Couteau",
    nameEn: "Hand-Cut Beef Tartare",
    descFr: "Bœuf frais coupé au couteau, assaisonné selon la tradition française",
    descEn: "Fresh beef hand-cut and seasoned in the French tradition",
    image: "/images/menu/Tartare_de_boeuf_charolais_01.jpg",
    price: "19 €",
  },
  {
    nameFr: "Côte de Bœuf",
    nameEn: "Rib Steak",
    descFr: "Côte de bœuf grillée, servie pour deux personnes avec ses accompagnements",
    descEn: "Grilled rib steak, served for two with side dishes",
    image: "/images/menu/cote-de-boeuf-black-angus-cuite-1.webp",
    price: "38 €",
  },
];

type TartineItem = {
  nameFr: string;
  nameEn: string;
  image: string;
  price: string;
};

const tartines: TartineItem[] = [
  { nameFr: "Tartine Fromage", nameEn: "Cheese Tartine", image: "/images/menu/SFS_Pepper-Crusted_Tuna_Preserved_Lemon_Egg_Tartines_05_v2pjtm.jpg", price: "12 €" },
  { nameFr: "Tartine Charcuterie", nameEn: "Charcuterie Tartine", image: "/images/menu/SFS_Pepper-Crusted_Tuna_Preserved_Lemon_Egg_Tartines_05_v2pjtm.jpg", price: "13 €" },
  { nameFr: "Tartine Œuf", nameEn: "Egg Tartine", image: "/images/menu/SFS_Pepper-Crusted_Tuna_Preserved_Lemon_Egg_Tartines_05_v2pjtm.jpg", price: "11 €" },
  { nameFr: "Tartine Salade", nameEn: "Salad Tartine", image: "/images/menu/SFS_Pepper-Crusted_Tuna_Preserved_Lemon_Egg_Tartines_05_v2pjtm.jpg", price: "11 €" },
];

export default function MenuPage() {
  const { locale } = useLanguage();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

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
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row">
                <div
                  className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 cursor-pointer"
                  onClick={() => setLightbox({ src: item.image, alt: locale === "fr" ? item.nameFr : item.nameEn })}
                >
                  <Image
                    src={item.image}
                    alt={locale === "fr" ? item.nameFr : item.nameEn}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold text-gray-900">
                      {locale === "fr" ? item.nameFr : item.nameEn}
                    </h3>
                    <span className="font-display text-lg font-bold text-wine-700 whitespace-nowrap">{item.price}</span>
                  </div>
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
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row">
                <div
                  className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 cursor-pointer"
                  onClick={() => setLightbox({ src: item.image, alt: locale === "fr" ? item.nameFr : item.nameEn })}
                >
                  <Image
                    src={item.image}
                    alt={locale === "fr" ? item.nameFr : item.nameEn}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold text-gray-900">
                      {locale === "fr" ? item.nameFr : item.nameEn}
                    </h3>
                    <span className="font-display text-lg font-bold text-wine-700 whitespace-nowrap">{item.price}</span>
                  </div>
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
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="relative w-full h-36 cursor-pointer overflow-hidden"
                  onClick={() => setLightbox({ src: item.image, alt: locale === "fr" ? item.nameFr : item.nameEn })}
                >
                  <Image
                    src={item.image}
                    alt={locale === "fr" ? item.nameFr : item.nameEn}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-bold text-gray-900">
                      {locale === "fr" ? item.nameFr : item.nameEn}
                    </h3>
                    <span className="font-display text-base font-bold text-wine-700 whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 italic">
                    {locale === "fr" ? item.nameEn : item.nameFr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer"
            onClick={() => setLightbox(null)}
            onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
            tabIndex={0}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1200}
                height={800}
                className="object-contain max-w-[90vw] max-h-[90vh] rounded-lg"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-2 right-2 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/70 transition"
              >
                &times;
              </button>
            </div>
          </div>
        )}

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
