"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChefHat, Lock } from "lucide-react";
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
];

function loadRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
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
