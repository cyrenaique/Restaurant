"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Truck, Lock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

type Provider = {
  id: string;
  name: string;
  category: string;
  contact: string;
  notes: string;
  createdAt: string;
};

const STORAGE_KEY = "restaurant-providers";
const PASSWORD = "chef2024";

const DEFAULT_PROVIDERS: Provider[] = [
  {
    id: "prov-1",
    name: "Marché de Saint-Malo (Halles au Blé)",
    category: "Fruits, Légumes, Produits frais",
    contact: "Place de la Poissonnerie, Intra-Muros, 35400 Saint-Malo\nMardi & Vendredi matin",
    notes: "Marché couvert au cœur des remparts. Excellents légumes de saison, herbes fraîches, produits laitiers bretons.",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-2",
    name: "Criée de Saint-Malo",
    category: "Poissons & Fruits de mer",
    contact: "Port de la Houle, 35400 Saint-Malo\nTél: 02 99 56 XX XX",
    notes: "Poisson frais du jour, arrivages de la Manche. Bar, lieu jaune, sole, homard, coquilles Saint-Jacques en saison.",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-3",
    name: "Boucherie Le Malouin",
    category: "Viandes",
    contact: "Rue de l'Orme, 35400 Saint-Malo\nTél: 02 99 40 XX XX",
    notes: "Bœuf de race bretonne, filet mignon, côte de bœuf. Demander la viande pour tartare (ultra fraîche).",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-4",
    name: "Fromagerie Bordier",
    category: "Beurre, Fromages",
    contact: "9 Rue de l'Orme, 35400 Saint-Malo\nTél: 02 99 40 88 79",
    notes: "Le célèbre beurre Bordier ! Beurre demi-sel pour les tartines, beurre aux algues. Fromages affinés (Comté, chèvre).",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-5",
    name: "Épicerie Russe Kalinka (Rennes)",
    category: "Produits russes & est-européens",
    contact: "Rennes (35000) — livraison possible\nCommande en ligne ou par téléphone",
    notes: "Hareng salé pour la шуба, cornichons malossol, crème fraîche épaisse (smetana), saucisses fumées pour la solianka.",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-6",
    name: "Boulangerie Le Fournil Malouin",
    category: "Pain & Viennoiseries",
    contact: "Rue Jacques Cartier, 35400 Saint-Malo\nTél: 02 99 56 XX XX",
    notes: "Pain de campagne au levain pour les tartines. Commander la veille pour les grandes quantités.",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-7",
    name: "Les Légumes de la Baie",
    category: "Maraîcher bio",
    contact: "Saint-Jouan-des-Guérets (à 10 min)\nLivraison mardi et vendredi",
    notes: "Légumes bio de saison : betteraves, carottes, pommes de terre, oignons, poivrons. Parfait pour le borchtch et la shakshuka.",
    createdAt: "27/06/2026",
  },
  {
    id: "prov-8",
    name: "Cidrerie de la Côte d'Émeraude",
    category: "Cidre & Boissons",
    contact: "Cancale / Dinan (à 15 min)\nCommande par caisse",
    notes: "Cidre breton pour le filet mignon aux pommes. Aussi jus de pomme artisanal.",
    createdAt: "27/06/2026",
  },
];

function loadProviders(): Provider[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const saved: Provider[] = JSON.parse(data);
      const savedIds = new Set(saved.map((p) => p.id));
      const missing = DEFAULT_PROVIDERS.filter((p) => !savedIds.has(p.id));
      if (missing.length > 0) {
        const merged = [...saved, ...missing];
        saveProviders(merged);
        return merged;
      }
      return saved;
    }
    saveProviders(DEFAULT_PROVIDERS);
    return DEFAULT_PROVIDERS;
  } catch {
    return [];
  }
}

function saveProviders(providers: Provider[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
}

export default function ProvidersPage() {
  const { locale } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (authenticated) {
      setProviders(loadProviders());
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const provider: Provider = {
      id: Date.now().toString(),
      name: newName.trim(),
      category: newCategory.trim(),
      contact: newContact.trim(),
      notes: newNotes.trim(),
      createdAt: new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US"),
    };
    const updated = [provider, ...providers];
    setProviders(updated);
    saveProviders(updated);
    setNewName("");
    setNewCategory("");
    setNewContact("");
    setNewNotes("");
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(t("providers.deleteConfirm", locale));
    if (!confirmed) return;
    const updated = providers.filter((p) => p.id !== id);
    setProviders(updated);
    saveProviders(updated);
  };

  if (!authenticated) {
    return (
      <div className="py-20 bg-sand-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-wine-700" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            {t("providers.title", locale)}
          </h1>
          <p className="text-gray-500 text-sm mb-6">{t("providers.subtitle", locale)}</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                {t("providers.passwordLabel", locale)}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{t("providers.wrongPassword", locale)}</p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              {t("providers.enter", locale)}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="section-heading mb-1">{t("providers.title", locale)}</h1>
            <p className="text-gray-500 text-sm">{t("providers.subtitle", locale)}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            {t("providers.addProvider", locale)}
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <form onSubmit={handleAddProvider} className="bg-white rounded-2xl shadow-md p-8 mb-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("providers.providerName", locale)}
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("providers.category", locale)}
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("providers.contact", locale)}
              </label>
              <textarea
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("providers.notes", locale)}
              </label>
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-outline"
              >
                {t("providers.cancel", locale)}
              </button>
              <button type="submit" className="btn-primary">
                {t("providers.save", locale)}
              </button>
            </div>
          </form>
        )}

        {/* Provider list */}
        {providers.length === 0 ? (
          <div className="text-center py-16">
            <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">{t("providers.noProviders", locale)}</p>
          </div>
        ) : (
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(provider.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </button>
                {expandedId === provider.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    {provider.contact && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-wine-700 mb-2">
                          {t("providers.contact", locale)}
                        </h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{provider.contact}</p>
                      </div>
                    )}
                    {provider.notes && (
                      <div>
                        <h4 className="text-sm font-semibold text-wine-700 mb-2">
                          {t("providers.notes", locale)}
                        </h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{provider.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
