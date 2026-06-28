"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

type Provider = {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  notesFr: string;
  notesEn: string;
};

const providers: Provider[] = [
  {
    id: "prov-1",
    name: "Marché de Saint-Malo (Halles au Blé)",
    category: "Fruits, Légumes, Produits frais",
    address: "Place de la Poissonnerie, Intra-Muros, 35400 Saint-Malo",
    notesFr: "Marché couvert au cœur des remparts. Excellents légumes de saison, herbes fraîches, produits laitiers bretons. Mardi & vendredi matin.",
    notesEn: "Covered market in the heart of the ramparts. Excellent seasonal vegetables, fresh herbs, Breton dairy products. Tuesday & Friday mornings.",
  },
  {
    id: "prov-2",
    name: "Criée de Saint-Malo",
    category: "Poissons & Fruits de mer",
    address: "Port de la Houle, 35400 Saint-Malo",
    notesFr: "Poisson frais du jour, arrivages de la Manche. Bar, lieu jaune, sole, homard, coquilles Saint-Jacques en saison.",
    notesEn: "Fresh fish of the day from the English Channel. Sea bass, pollack, sole, lobster, scallops in season.",
  },
  {
    id: "prov-3",
    name: "Boucherie Le Malouin",
    category: "Viandes",
    address: "Rue de l'Orme, 35400 Saint-Malo",
    notesFr: "Bœuf de race bretonne, filet mignon, côte de bœuf. Viande pour tartare ultra fraîche.",
    notesEn: "Breton breed beef, filet mignon, rib steak. Ultra fresh meat for tartare.",
  },
  {
    id: "prov-4",
    name: "Fromagerie Bordier",
    category: "Beurre, Fromages",
    address: "9 Rue de l'Orme, 35400 Saint-Malo",
    phone: "02 99 40 88 79",
    notesFr: "Le célèbre beurre Bordier ! Beurre demi-sel pour les tartines, beurre aux algues. Fromages affinés (Comté, chèvre).",
    notesEn: "The famous Bordier butter! Semi-salted butter for tartines, seaweed butter. Aged cheeses (Comté, goat cheese).",
  },
  {
    id: "prov-5",
    name: "Épicerie Russe Kalinka",
    category: "Produits russes & est-européens",
    address: "Rennes (35000)",
    notesFr: "Hareng salé pour la шуба, cornichons malossol, crème fraîche épaisse (smetana), saucisses fumées pour la solianka.",
    notesEn: "Salted herring for shuba, malossol pickles, thick sour cream (smetana), smoked sausages for solyanka.",
  },
  {
    id: "prov-6",
    name: "Boulangerie Le Fournil Malouin",
    category: "Pain & Viennoiseries",
    address: "Rue Jacques Cartier, 35400 Saint-Malo",
    notesFr: "Pain de campagne au levain pour les tartines. Commander la veille pour les grandes quantités.",
    notesEn: "Sourdough country bread for tartines. Order the day before for large quantities.",
  },
  {
    id: "prov-7",
    name: "Les Légumes de la Baie",
    category: "Maraîcher bio",
    address: "Saint-Jouan-des-Guérets (à 10 min)",
    notesFr: "Légumes bio de saison : betteraves, carottes, pommes de terre, oignons, poivrons. Parfait pour le borchtch et la shakshuka.",
    notesEn: "Organic seasonal vegetables: beetroot, carrots, potatoes, onions, peppers. Perfect for borscht and shakshuka.",
  },
  {
    id: "prov-8",
    name: "Cidrerie de la Côte d'Émeraude",
    category: "Cidre & Boissons",
    address: "Cancale / Dinan (à 15 min)",
    notesFr: "Cidre breton pour le filet mignon aux pommes. Aussi jus de pomme artisanal.",
    notesEn: "Breton cider for filet mignon with apples. Also artisanal apple juice.",
  },
  {
    id: "prov-9",
    name: "Ferme du Pré Bois",
    category: "Porc, Charcuterie & Viande à la découpe",
    address: "Le Pré Bois, 35400 Saint-Malo",
    phone: "02 99 81 79 80",
    email: "contact@lafermeduprebois.bzh",
    website: "https://lafermeduprebois.bzh",
    notesFr: "Élevage et boucherie-charcuterie à Saint-Malo. Jambon à l'os, saucisse fumée, pâtés, rôtis, côtes, caissettes.",
    notesEn: "Farm and butcher-charcuterie in Saint-Malo. Bone-in ham, smoked sausage, pâtés, roasts, chops, assorted boxes.",
  },
];

export default function ProvidersPage() {
  const { locale } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-heading mb-2">{t("providers.title", locale)}</h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            {locale === "fr"
              ? "Nous travaillons avec des producteurs locaux pour vous offrir des produits frais et de qualité."
              : "We work with local producers to offer you fresh, quality products."}
          </p>
        </div>

        {/* Provider list */}
        <div className="space-y-4">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === provider.id ? null : provider.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{provider.name}</h3>
                  <p className="text-sm text-wine-600 font-medium mt-0.5">{provider.category}</p>
                </div>
                <span className="text-gray-400 text-xl">{expandedId === provider.id ? "−" : "+"}</span>
              </button>
              {expandedId === provider.id && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-wine-500 mt-0.5 flex-shrink-0" />
                    <span>{provider.address}</span>
                  </div>
                  {provider.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-wine-500">📞</span>
                      <a href={`tel:${provider.phone.replace(/\s/g, "")}`} className="hover:text-wine-700 underline">
                        {provider.phone}
                      </a>
                    </div>
                  )}
                  {provider.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-wine-500">✉️</span>
                      <a href={`mailto:${provider.email}`} className="hover:text-wine-700 underline">
                        {provider.email}
                      </a>
                    </div>
                  )}
                  {provider.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-wine-500">🌐</span>
                      <a href={provider.website} target="_blank" rel="noopener noreferrer" className="hover:text-wine-700 underline">
                        {provider.website.replace("https://", "")}
                      </a>
                    </div>
                  )}
                  <p className="text-gray-600 text-sm mt-2 italic">
                    {locale === "fr" ? provider.notesFr : provider.notesEn}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
