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

function loadRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
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
