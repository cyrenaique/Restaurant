"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChefHat, Lock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

type Recipe = {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  createdAt: string;
};

const STORAGE_KEY = "restaurant-recipes";
const PASSWORD = "chef2024";

const DEFAULT_RECIPES: Recipe[] = [
  {
    id: "default-1",
    name: "Borchtch (Борщ)",
    ingredients: `500g de betteraves rouges, épluchées et râpées
300g de chou blanc, émincé
2 pommes de terre, coupées en dés
1 carotte, râpée
1 oignon, émincé
2 gousses d'ail, hachées
400g de bœuf (poitrine ou paleron)
2 cuillères à soupe de concentré de tomate
1 cuillère à soupe de vinaigre de vin rouge
1 feuille de laurier
Aneth frais
Crème fraîche épaisse pour servir
Sel, poivre`,
    instructions: `1. Faire bouillir le bœuf dans 2L d'eau avec la feuille de laurier pendant 1h30. Écumer régulièrement.
2. Retirer la viande, la couper en morceaux. Filtrer le bouillon.
3. Dans une cocotte, faire revenir l'oignon et la carotte dans un peu d'huile pendant 5 min.
4. Ajouter les betteraves râpées et le concentré de tomate. Cuire 10 min à feu doux.
5. Verser le bouillon, ajouter les pommes de terre et le chou. Cuire 20 min.
6. Remettre la viande, ajouter le vinaigre, l'ail. Assaisonner.
7. Laisser reposer 30 min avant de servir (le borchtch est meilleur réchauffé).
8. Servir avec une cuillère de crème fraîche et de l'aneth frais.`,
    createdAt: "26/06/2026",
  },
  {
    id: "default-2",
    name: "Solianka (Солянка)",
    ingredients: `300g de bœuf bouilli (reste du bouillon)
150g de saucisses fumées, coupées en rondelles
100g de jambon, en dés
2 cornichons malossol, coupés en dés
2 cuillères à soupe de câpres
1 oignon, émincé
2 cuillères à soupe de concentré de tomate
100g d'olives noires
1 citron, en rondelles
1,5L de bouillon de bœuf
Aneth et persil frais
Crème fraîche pour servir
Sel, poivre, feuille de laurier`,
    instructions: `1. Dans une cocotte, faire revenir l'oignon dans du beurre jusqu'à coloration.
2. Ajouter le concentré de tomate, cuire 3 min en remuant.
3. Ajouter les cornichons et les câpres, cuire 5 min.
4. Verser le bouillon de bœuf, porter à ébullition.
5. Ajouter le bœuf coupé en morceaux, les saucisses et le jambon.
6. Cuire 15 min à feu doux. Ajouter les olives.
7. Assaisonner avec sel, poivre, feuille de laurier.
8. Servir avec une rondelle de citron, de la crème fraîche et des herbes fraîches.`,
    createdAt: "26/06/2026",
  },
  {
    id: "default-8",
    name: "Сельдь под шубой (Hareng en Manteau)",
    ingredients: `400g de filets de hareng salé (ou hareng fumé)
3 betteraves rouges, cuites
3 pommes de terre, cuites
2 carottes, cuites
2 œufs durs
1 oignon moyen, finement émincé
200g de mayonnaise
Sel, poivre
Aneth frais pour décorer`,
    instructions: `1. Dessaler les filets de hareng dans du lait froid pendant 2h (si hareng salé). Couper en petits morceaux.
2. Cuire les betteraves, pommes de terre, carottes et œufs. Laisser refroidir, puis râper séparément.
3. Monter la salade en couches dans un plat ou un cercle :
   - 1ère couche : hareng coupé en morceaux
   - 2ème couche : oignon émincé
   - 3ème couche : pommes de terre râpées + mayonnaise
   - 4ème couche : carottes râpées + mayonnaise
   - 5ème couche : œufs râpés + mayonnaise
   - 6ème couche : betteraves râpées + mayonnaise
4. Lisser la surface avec une couche finale de mayonnaise.
5. Réfrigérer au minimum 4h (idéalement toute la nuit) pour que les saveurs se mélangent.
6. Décorer avec de l'aneth frais et des jaunes d'œuf émiettés.
7. Servir bien froid.`,
    createdAt: "27/06/2026",
  },
  {
    id: "default-7",
    name: "Shakshuka (Шакшука)",
    ingredients: `4 œufs
400g de tomates concassées (ou 6 tomates fraîches)
2 poivrons rouges, coupés en dés
1 oignon, émincé
3 gousses d'ail, hachées
1 cuillère à café de cumin moulu
1 cuillère à café de paprika fumé
1/2 cuillère à café de piment d'Espelette
1 cuillère à soupe de concentré de tomate
Persil ou coriandre frais
Huile d'olive
Sel, poivre
Pain croustillant pour servir`,
    instructions: `1. Dans une grande poêle (avec couvercle), faire chauffer l'huile d'olive à feu moyen.
2. Faire revenir l'oignon et les poivrons pendant 8 min jusqu'à ce qu'ils soient tendres.
3. Ajouter l'ail, le cumin, le paprika et le piment. Cuire 1 min en remuant.
4. Ajouter les tomates concassées et le concentré de tomate. Saler, poivrer.
5. Laisser mijoter 10-15 min jusqu'à ce que la sauce épaississe.
6. Creuser 4 puits dans la sauce avec le dos d'une cuillère.
7. Casser un œuf dans chaque puits. Saler légèrement les œufs.
8. Couvrir et cuire 5-8 min à feu doux jusqu'à ce que les blancs soient pris mais les jaunes encore coulants.
9. Parsemer d'herbes fraîches. Servir directement dans la poêle avec du pain croustillant.`,
    createdAt: "27/06/2026",
  },
  {
    id: "default-3",
    name: "Filet Mignon aux Pommes",
    ingredients: `1 filet mignon de porc (environ 500g)
3 pommes (type Golden ou Reinette)
50g de beurre
2 cuillères à soupe de miel
10cl de crème fraîche
10cl de cidre breton
1 branche de thym
Sel, poivre
Huile d'olive`,
    instructions: `1. Préchauffer le four à 180°C.
2. Assaisonner le filet mignon de sel, poivre et thym.
3. Dans une cocotte allant au four, saisir le filet mignon sur toutes les faces dans un peu d'huile d'olive.
4. Enfourner pour 25 min.
5. Pendant ce temps, éplucher et couper les pommes en quartiers.
6. Dans une poêle, faire fondre le beurre, ajouter les pommes et le miel. Caraméliser 10 min.
7. Déglacer avec le cidre, laisser réduire 5 min.
8. Sortir le filet mignon, le laisser reposer 5 min sous aluminium.
9. Déglacer la cocotte avec la crème fraîche.
10. Trancher le filet mignon, servir avec les pommes caramélisées et la sauce.`,
    createdAt: "26/06/2026",
  },
  {
    id: "default-4",
    name: "Tartare de Bœuf au Couteau",
    ingredients: `400g de filet de bœuf ou rumsteck (très frais)
2 échalotes, finement ciselées
2 cuillères à soupe de câpres
4 cornichons, finement coupés
1 jaune d'œuf par personne
Moutarde de Dijon
Tabasco
Sauce Worcestershire
Huile d'olive
Persil plat, ciselé
Sel, poivre du moulin
Ciboulette`,
    instructions: `1. Couper la viande au couteau en petits dés réguliers (ne pas utiliser de hachoir).
2. Réserver au frais dans un bol.
3. Préparer l'assaisonnement : mélanger échalotes, câpres, cornichons, moutarde, un trait de Tabasco et de Worcestershire, huile d'olive.
4. Au moment de servir, mélanger délicatement la viande avec l'assaisonnement.
5. Dresser à l'aide d'un cercle sur chaque assiette.
6. Déposer un jaune d'œuf sur le dessus.
7. Parsemer de ciboulette et persil.
8. Servir immédiatement avec des frites maison et une salade verte.`,
    createdAt: "26/06/2026",
  },
  {
    id: "default-5",
    name: "Côte de Bœuf (pour 2 personnes)",
    ingredients: `1 côte de bœuf de 800g à 1kg (sortie du frigo 1h avant)
Gros sel, poivre du moulin
30g de beurre
2 branches de thym
2 gousses d'ail en chemise
Fleur de sel pour servir
Accompagnement : pommes de terre grenaille rôties, salade verte`,
    instructions: `1. Sortir la côte de bœuf du réfrigérateur 1h avant la cuisson.
2. Préchauffer le four à 200°C.
3. Assaisonner généreusement la viande de gros sel et poivre.
4. Dans une poêle en fonte très chaude, saisir la côte de bœuf 3 min de chaque côté jusqu'à obtenir une belle croûte dorée.
5. Transférer dans un plat allant au four. Ajouter le beurre, le thym et l'ail.
6. Enfourner 15 min pour une cuisson saignante, 20 min pour à point.
7. Arroser régulièrement avec le jus de cuisson.
8. Sortir du four, couvrir d'aluminium et laisser reposer 10 min.
9. Trancher, parsemer de fleur de sel.
10. Servir avec des pommes grenaille rôties et une salade.`,
    createdAt: "26/06/2026",
  },
  {
    id: "default-6",
    name: "Tartines Garnies (Base)",
    ingredients: `Pain de campagne au levain, tranché épais
Beurre demi-sel (Bretagne !)

GARNITURE FROMAGE :
Comté affiné 18 mois, roquette, noix, miel

GARNITURE CHARCUTERIE :
Jambon cru, coppa, cornichons, moutarde à l'ancienne

GARNITURE ŒUF :
Œuf au plat ou poché, lardons, ciboulette

GARNITURE SALADE :
Chèvre frais, mesclun, tomates cerises, vinaigrette au miel`,
    instructions: `1. Trancher le pain de campagne en tranches épaisses (2 cm).
2. Griller légèrement au four ou au grille-pain.
3. Tartiner de beurre demi-sel breton.
4. Garnir selon la variante choisie :

FROMAGE : Disposer les tranches de Comté, la roquette, les noix concassées. Filet de miel.

CHARCUTERIE : Étaler la moutarde, disposer jambon cru et coppa. Accompagner de cornichons.

ŒUF : Cuire les lardons, poser sur le pain. Ajouter un œuf au plat par-dessus. Ciboulette.

SALADE : Tartiner le chèvre frais, ajouter le mesclun et les tomates. Arroser de vinaigrette au miel.

5. Servir avec une salade verte assaisonnée.`,
    createdAt: "26/06/2026",
  },
  {
    id: "default-7",
    name: "Borchtch Froid (Свекольник)",
    ingredients: `3 betteraves moyennes, cuites et râpées
1 concombre, coupé en petits dés
3 œufs durs, hachés
1 botte de radis, émincés
1 botte d'aneth frais, ciselé
1 botte de ciboulette, ciselée
500 ml de kéfir (ou yaourt liquide)
500 ml d'eau froide ou bouillon de betterave refroidi
Jus de citron (1-2 c. à soupe)
Sel, poivre
Crème fraîche pour servir`,
    instructions: `1. Cuire les betteraves à l'eau (1h) ou au four (papillote, 1h30). Laisser refroidir complètement.
2. Râper les betteraves. Conserver le bouillon de cuisson et le laisser refroidir.
3. Couper le concombre en petits dés, émincer les radis.
4. Hacher les œufs durs grossièrement.
5. Dans un grand saladier, mélanger le kéfir avec l'eau froide (ou le bouillon de betterave refroidi).
6. Ajouter les betteraves râpées, le concombre, les radis, les œufs.
7. Assaisonner avec le jus de citron, sel et poivre.
8. Ajouter l'aneth et la ciboulette, mélanger.
9. Réfrigérer au moins 2h (idéalement une nuit).
10. Servir bien froid avec une cuillerée de crème fraîche et un œuf dur coupé en deux.

Note : Peut se préparer la veille. Plus c'est froid, meilleur c'est !`,
    createdAt: "28/06/2026",
  },
  {
    id: "default-8",
    name: "Chachlik (Шашлык)",
    ingredients: `1 kg d'épaule d'agneau ou de porc (coupée en cubes de 4 cm)
3 oignons, émincés en rondelles
4 gousses d'ail, écrasées
100 ml d'huile d'olive
50 ml de vinaigre de vin rouge
1 c. à café de paprika fumé
1 c. à café de coriandre moulue
1 c. à café de cumin
Sel, poivre noir
Sumac (pour servir)

SAUCE TKEMALI :
200 g de prunes acides (ou mirabelles vertes)
2 gousses d'ail
1 bouquet de coriandre fraîche
1 piment rouge
Sel, sucre`,
    instructions: `MARINADE (la veille) :
1. Couper la viande en cubes réguliers de 4 cm.
2. Mélanger l'huile, le vinaigre, l'ail, le paprika, la coriandre, le cumin, sel et poivre.
3. Ajouter les oignons émincés et la viande. Bien mélanger.
4. Couvrir et mariner au réfrigérateur 12-24h minimum.

SAUCE TKEMALI :
1. Cuire les prunes dans un peu d'eau (15 min).
2. Mixer avec l'ail, la coriandre, le piment, sel et une pincée de sucre.
3. Réserver au frais.

CUISSON :
1. Sortir la viande 1h avant la cuisson (température ambiante).
2. Enfiler sur des brochettes métalliques, en alternant viande et oignon.
3. Griller au barbecue (ou four grill 250°C) 12-15 min, en tournant régulièrement.
4. La viande doit être légèrement rosée à l'intérieur.
5. Servir avec la sauce tkemali, des oignons frais, du sumac et du pain lavash.

Accompagnement : Salade de tomates-concombres à l'huile d'olive et herbes fraîches.`,
    createdAt: "28/06/2026",
  },
];

function loadRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const saved: Recipe[] = JSON.parse(data);
      const savedIds = new Set(saved.map((r) => r.id));
      const missing = DEFAULT_RECIPES.filter((r) => !savedIds.has(r.id));
      if (missing.length > 0) {
        const merged = [...saved, ...missing];
        saveRecipes(merged);
        return merged;
      }
      return saved;
    }
    // First visit: seed with default recipes
    saveRecipes(DEFAULT_RECIPES);
    return DEFAULT_RECIPES;
  } catch {
    return [];
  }
}

function saveRecipes(recipes: Recipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export default function RecipesPage() {
  const { locale } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newInstructions, setNewInstructions] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showMargins, setShowMargins] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setRecipes(loadRecipes());
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

  const handleAddRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const recipe: Recipe = {
      id: Date.now().toString(),
      name: newName.trim(),
      ingredients: newIngredients.trim(),
      instructions: newInstructions.trim(),
      createdAt: new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US"),
    };
    const updated = [recipe, ...recipes];
    setRecipes(updated);
    saveRecipes(updated);
    setNewName("");
    setNewIngredients("");
    setNewInstructions("");
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(t("recipes.deleteConfirm", locale));
    if (!confirmed) return;
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    saveRecipes(updated);
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="py-20 bg-sand-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-wine-700" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            {t("recipes.title", locale)}
          </h1>
          <p className="text-gray-500 text-sm mb-6">{t("recipes.subtitle", locale)}</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                {t("recipes.passwordLabel", locale)}
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
                <p className="text-red-500 text-xs mt-1">{t("recipes.wrongPassword", locale)}</p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              {t("recipes.enter", locale)}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Margins data
  const margins = [
    { name: "Borchtch (Борщ)", price: 9, cost: 2.8, category: "Entrée" },
    { name: "Solianka (Солянка)", price: 10, cost: 3.5, category: "Entrée" },
    { name: "Shakshuka (Шакшука)", price: 11, cost: 2.5, category: "Entrée" },
    { name: "Borchtch Froid (Свекольник)", price: 9, cost: 2.2, category: "Entrée" },
    { name: "Hareng en Manteau (Сельдь под шубой)", price: 10, cost: 3.2, category: "Entrée" },
    { name: "Filet Mignon aux Pommes", price: 22, cost: 8.5, category: "Plat" },
    { name: "Tartare de Bœuf au Couteau", price: 19, cost: 7.0, category: "Plat" },
    { name: "Côte de Bœuf (2 pers.)", price: 38, cost: 15.0, category: "Plat" },
    { name: "Chachlik (Шашлык)", price: 18, cost: 6.5, category: "Plat" },
    { name: "Tartine Fromage", price: 12, cost: 3.5, category: "Tartine" },
    { name: "Tartine Charcuterie", price: 13, cost: 4.2, category: "Tartine" },
    { name: "Tartine Œuf", price: 11, cost: 2.8, category: "Tartine" },
    { name: "Tartine Salade", price: 11, cost: 2.5, category: "Tartine" },
    { name: "Muscadet (verre)", price: 5, cost: 1.2, category: "Vin" },
    { name: "Sancerre Blanc (verre)", price: 7, cost: 2.0, category: "Vin" },
    { name: "Chinon Rouge (verre)", price: 6, cost: 1.5, category: "Vin" },
    { name: "Bourgueil Rouge (verre)", price: 6, cost: 1.4, category: "Vin" },
    { name: "Vouvray Demi-Sec (verre)", price: 6, cost: 1.5, category: "Vin" },
    { name: "Rosé d'Anjou (verre)", price: 5, cost: 1.1, category: "Vin" },
    { name: "Cidre Breton (bouteille)", price: 12, cost: 3.5, category: "Cidre" },
    { name: "Bière Artisanale", price: 5, cost: 1.8, category: "Bière" },
    { name: "Thé Russe au Samovar", price: 4, cost: 0.6, category: "Boisson chaude" },
    { name: "Thé Ivan-Tchaï", price: 4, cost: 0.8, category: "Boisson chaude" },
    { name: "Café", price: 2.5, cost: 0.4, category: "Boisson chaude" },
    { name: "Jus de Pomme Artisanal", price: 3.5, cost: 1.0, category: "Sans alcool" },
    { name: "Mors aux Airelles", price: 4, cost: 0.8, category: "Sans alcool" },
    { name: "Limonade Maison", price: 4, cost: 0.7, category: "Sans alcool" },
  ];

  // Recipes dashboard
  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="section-heading mb-1">{t("recipes.title", locale)}</h1>
            <p className="text-gray-500 text-sm">{t("recipes.subtitle", locale)}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            {t("recipes.addRecipe", locale)}
          </button>
        </div>

        {/* Margins Section */}
        <div className="bg-white rounded-2xl shadow-sm mb-8 overflow-hidden">
          <button
            onClick={() => setShowMargins(!showMargins)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-wine-600" />
              <h2 className="font-display text-lg font-bold text-gray-900">
                Marges estimées par plat
              </h2>
            </div>
            <span className="text-gray-400 text-xl">{showMargins ? "−" : "+"}</span>
          </button>
          {showMargins && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-4">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-semibold text-gray-700">Plat</th>
                      <th className="text-right py-2 px-2 font-semibold text-gray-700">Prix</th>
                      <th className="text-right py-2 px-2 font-semibold text-gray-700">Coût mat.</th>
                      <th className="text-right py-2 px-2 font-semibold text-gray-700">Marge €</th>
                      <th className="text-right py-2 pl-2 font-semibold text-gray-700">Marge %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {margins.map((item, i) => {
                      const margin = item.price - item.cost;
                      const pct = ((margin / item.price) * 100).toFixed(0);
                      return (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2.5 pr-4">
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <span className="ml-2 text-xs text-gray-400">{item.category}</span>
                          </td>
                          <td className="text-right py-2.5 px-2 text-gray-700">{item.price} €</td>
                          <td className="text-right py-2.5 px-2 text-gray-500">{item.cost.toFixed(1)} €</td>
                          <td className="text-right py-2.5 px-2 font-semibold text-green-700">{margin.toFixed(1)} €</td>
                          <td className="text-right py-2.5 pl-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                              Number(pct) >= 70 ? "bg-green-100 text-green-800" :
                              Number(pct) >= 60 ? "bg-lime-100 text-lime-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {pct}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200">
                      <td className="py-3 pr-4 font-bold text-gray-900">Moyenne</td>
                      <td className="text-right py-3 px-2 font-bold text-gray-700">
                        {(margins.reduce((s, m) => s + m.price, 0) / margins.length).toFixed(1)} €
                      </td>
                      <td className="text-right py-3 px-2 font-bold text-gray-500">
                        {(margins.reduce((s, m) => s + m.cost, 0) / margins.length).toFixed(1)} €
                      </td>
                      <td className="text-right py-3 px-2 font-bold text-green-700">
                        {(margins.reduce((s, m) => s + (m.price - m.cost), 0) / margins.length).toFixed(1)} €
                      </td>
                      <td className="text-right py-3 pl-2">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                          {(margins.reduce((s, m) => s + ((m.price - m.cost) / m.price) * 100, 0) / margins.length).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-4 italic">
                * Coûts matières premières estimés (hors charges fixes, personnel, loyer). Objectif marge matière : 65-75%.
              </p>
            </div>
          )}
        </div>

        {/* Add Form */}
        {showForm && (
          <form onSubmit={handleAddRecipe} className="bg-white rounded-2xl shadow-md p-8 mb-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("recipes.recipeName", locale)}
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
                {t("recipes.ingredients", locale)}
              </label>
              <textarea
                value={newIngredients}
                onChange={(e) => setNewIngredients(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("recipes.instructions", locale)}
              </label>
              <textarea
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-outline"
              >
                {t("recipes.cancel", locale)}
              </button>
              <button type="submit" className="btn-primary">
                {t("recipes.save", locale)}
              </button>
            </div>
          </form>
        )}

        {/* Recipe list */}
        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">{t("recipes.noRecipes", locale)}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">{recipe.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{recipe.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(recipe.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </button>
                {expandedId === recipe.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    {recipe.ingredients && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-wine-700 mb-2">
                          {t("recipes.ingredients", locale)}
                        </h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{recipe.ingredients}</p>
                      </div>
                    )}
                    {recipe.instructions && (
                      <div>
                        <h4 className="text-sm font-semibold text-wine-700 mb-2">
                          {t("recipes.instructions", locale)}
                        </h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{recipe.instructions}</p>
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
