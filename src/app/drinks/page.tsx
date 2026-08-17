"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

type DrinkItem = {
  nameFr: string;
  nameEn: string;
  descFr?: string;
  descEn?: string;
  price: string;
  origin?: string;
};

const wines: DrinkItem[] = [
  {
    nameFr: "Muscadet Sèvre et Maine sur Lie",
    nameEn: "Muscadet Sèvre et Maine sur Lie",
    descFr: "Vin blanc sec et minéral, idéal avec les poissons et fruits de mer",
    descEn: "Dry, mineral white wine, perfect with fish and seafood",
    price: "5 € / 24 €",
    origin: "Loire",
  },
  {
    nameFr: "Sancerre Blanc",
    nameEn: "Sancerre White",
    descFr: "Sauvignon blanc vif et fruité, notes d'agrumes et de pierre à fusil",
    descEn: "Crisp, fruity Sauvignon Blanc with citrus and flinty notes",
    price: "7 € / 32 €",
    origin: "Loire",
  },
  {
    nameFr: "Chinon Rouge",
    nameEn: "Chinon Red",
    descFr: "Cabernet Franc élégant, fruits rouges et poivre, parfait avec les viandes",
    descEn: "Elegant Cabernet Franc, red fruits and pepper, perfect with meats",
    price: "6 € / 28 €",
    origin: "Loire",
  },
  {
    nameFr: "Bourgueil Rouge",
    nameEn: "Bourgueil Red",
    descFr: "Vin charpenté aux arômes de cassis et de violette",
    descEn: "Full-bodied wine with blackcurrant and violet aromas",
    price: "6 € / 26 €",
    origin: "Loire",
  },
  {
    nameFr: "Vouvray Demi-Sec",
    nameEn: "Vouvray Semi-Dry",
    descFr: "Chenin Blanc rond et fruité, bel équilibre sucré-acidité",
    descEn: "Round and fruity Chenin Blanc, lovely sweet-acid balance",
    price: "6 € / 28 €",
    origin: "Loire",
  },
  {
    nameFr: "Rosé d'Anjou",
    nameEn: "Rosé d'Anjou",
    descFr: "Rosé frais et léger, notes de fraise et pêche",
    descEn: "Fresh and light rosé, strawberry and peach notes",
    price: "5 € / 22 €",
    origin: "Loire",
  },
];

const ciders: DrinkItem[] = [
  {
    nameFr: "Cidre Breton Brut",
    nameEn: "Breton Dry Cider",
    descFr: "Cidre fermier de la Côte d'Émeraude, sec et rafraîchissant",
    descEn: "Farmhouse cider from the Emerald Coast, dry and refreshing",
    price: "4 € / 12 €",
    origin: "Bretagne",
  },
  {
    nameFr: "Cidre Breton Doux",
    nameEn: "Breton Sweet Cider",
    descFr: "Cidre doux fruité, parfait en apéritif ou avec un dessert",
    descEn: "Sweet fruity cider, perfect as aperitif or with dessert",
    price: "4 € / 12 €",
    origin: "Bretagne",
  },
  {
    nameFr: "Bière Blonde Artisanale (Saint-Malo)",
    nameEn: "Craft Blonde Ale (Saint-Malo)",
    descFr: "Bière locale brassée à Saint-Malo, légère et houblonnée",
    descEn: "Local beer brewed in Saint-Malo, light and hoppy",
    price: "5 €",
    origin: "Saint-Malo",
  },
  {
    nameFr: "Bière Ambrée Artisanale",
    nameEn: "Craft Amber Ale",
    descFr: "Notes de caramel et malt torréfié",
    descEn: "Caramel and roasted malt notes",
    price: "5 €",
    origin: "Bretagne",
  },
];

const hotDrinks: DrinkItem[] = [
  {
    nameFr: "Thé Russe au Samovar (Чай)",
    nameEn: "Russian Samovar Tea (Чай)",
    descFr: "Thé noir fort servi à la russe avec confiture et citron",
    descEn: "Strong black tea served Russian-style with jam and lemon",
    price: "4 €",
  },
  {
    nameFr: "Thé Ivan-Tchaï (Иван-чай)",
    nameEn: "Ivan Tea (Иван-чай)",
    descFr: "Infusion traditionnelle russe de feuilles d'épilobe fermentées, sans caféine",
    descEn: "Traditional Russian fermented fireweed leaf infusion, caffeine-free",
    price: "4 €",
  },
  {
    nameFr: "Thé à la Menthe",
    nameEn: "Mint Tea",
    descFr: "Thé vert à la menthe fraîche",
    descEn: "Green tea with fresh mint",
    price: "3.5 €",
  },
  {
    nameFr: "Café Expresso / Allongé",
    nameEn: "Espresso / Americano",
    price: "2.5 € / 3 €",
  },
  {
    nameFr: "Café Crème",
    nameEn: "Latte",
    price: "4 €",
  },
];

const softDrinks: DrinkItem[] = [
  {
    nameFr: "Jus de Pomme Artisanal",
    nameEn: "Artisanal Apple Juice",
    descFr: "Pressé localement, pommes bretonnes",
    descEn: "Locally pressed, Breton apples",
    price: "3.5 €",
    origin: "Bretagne",
  },
  {
    nameFr: "Limonade Maison",
    nameEn: "Homemade Lemonade",
    descFr: "Citron frais, sucre de canne, eau pétillante",
    descEn: "Fresh lemon, cane sugar, sparkling water",
    price: "4 €",
  },
  {
    nameFr: "Mors aux Airelles (Морс)",
    nameEn: "Cranberry Mors (Морс)",
    descFr: "Boisson russe traditionnelle aux baies, légèrement sucrée",
    descEn: "Traditional Russian berry drink, lightly sweetened",
    price: "4 €",
  },
  {
    nameFr: "Eau Minérale / Pétillante",
    nameEn: "Still / Sparkling Water",
    price: "3 € / 4 €",
  },
];

function DrinkSection({ title, items, locale, showOrigin = false }: {
  title: string;
  items: DrinkItem[];
  locale: "fr" | "en";
  showOrigin?: boolean;
}) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 border-b-2 border-wine-200 pb-2">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-gray-900">
                  {locale === "fr" ? item.nameFr : item.nameEn}
                </h3>
                {showOrigin && item.origin && (
                  <span className="text-xs bg-wine-100 text-wine-700 px-2 py-0.5 rounded-full">
                    {item.origin}
                  </span>
                )}
              </div>
              {(locale === "fr" ? item.descFr : item.descEn) && (
                <p className="text-gray-500 text-sm mt-0.5">
                  {locale === "fr" ? item.descFr : item.descEn}
                </p>
              )}
            </div>
            <span className="font-display font-bold text-wine-700 whitespace-nowrap text-sm">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DrinksPage() {
  const { locale } = useLanguage();

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-heading mb-2">{t("drinks.title", locale)}</h1>
          <p className="text-gray-500 text-sm">{t("drinks.subtitle", locale)}</p>
          <p className="text-xs text-gray-400 mt-2 italic">
            {locale === "fr"
              ? "Verre / Bouteille"
              : "Glass / Bottle"}
          </p>
        </div>

        <DrinkSection title={t("drinks.wines", locale)} items={wines} locale={locale} showOrigin />
        <DrinkSection title={t("drinks.ciders", locale)} items={ciders} locale={locale} showOrigin />
        <DrinkSection title={t("drinks.hot", locale)} items={hotDrinks} locale={locale} />
        <DrinkSection title={t("drinks.soft", locale)} items={softDrinks} locale={locale} showOrigin />
      </div>
    </div>
  );
}
