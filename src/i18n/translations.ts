export type Locale = "fr" | "en";

export const translations = {
  nav: {
    home: { fr: "Accueil", en: "Home" },
    menu: { fr: "La Carte", en: "Menu" },
    about: { fr: "À Propos", en: "About" },
    contact: { fr: "Contact", en: "Contact" },
    recipes: { fr: "Recettes", en: "Recipes" },
    providers: { fr: "Nos Producteurs", en: "Our Producers" },
  },
  hero: {
    subtitle: {
      fr: "Cuisine franco-russe au cœur de Saint-Malo",
      en: "Franco-Russian cuisine in the heart of Saint-Malo",
    },
    tagline: {
      fr: "Un voyage culinaire entre la Bretagne et la Russie",
      en: "A culinary journey between Brittany and Russia",
    },
    cta: {
      fr: "Découvrir la carte",
      en: "Discover our menu",
    },
  },
  menu: {
    title: { fr: "La Carte", en: "Our Menu" },
    subtitle: {
      fr: "Des saveurs authentiques, entre tradition russe et gastronomie française",
      en: "Authentic flavors, blending Russian tradition with French gastronomy",
    },
    starters: { fr: "Entrées & Soupes", en: "Starters & Soups" },
    mains: { fr: "Plats Principaux", en: "Main Courses" },
    tartines: { fr: "Tartines", en: "Open Sandwiches" },
    tartinesDesc: {
      fr: "Pain de campagne garni — servi avec salade verte",
      en: "Country bread topped — served with green salad",
    },
  },
  about: {
    title: { fr: "À Propos", en: "About Us" },
    story: {
      fr: "Notre restaurant mêle les traditions culinaires russes et françaises dans le cadre exceptionnel de Saint-Malo, cité corsaire de Bretagne. Nous proposons des plats généreux préparés avec des produits frais et locaux, sublimés par des recettes venues de loin.",
      en: "Our restaurant blends Russian and French culinary traditions in the exceptional setting of Saint-Malo, the corsair city of Brittany. We offer generous dishes prepared with fresh, local ingredients, elevated by recipes from afar.",
    },
    location: {
      fr: "Situé dans les remparts de Saint-Malo, notre restaurant vous accueille dans un cadre chaleureux avec vue sur la mer.",
      en: "Located within the walls of Saint-Malo, our restaurant welcomes you in a warm setting with sea views.",
    },
  },
  contact: {
    title: { fr: "Contact", en: "Contact" },
    address: { fr: "Adresse", en: "Address" },
    phone: { fr: "Téléphone", en: "Phone" },
    hours: { fr: "Horaires", en: "Hours" },
    hoursDetail: {
      fr: "Mardi – Dimanche : 12h00 – 14h30, 19h00 – 22h30\nFermé le lundi",
      en: "Tuesday – Sunday: 12:00 PM – 2:30 PM, 7:00 PM – 10:30 PM\nClosed on Monday",
    },
  },
  recipes: {
    title: { fr: "Mes Recettes", en: "My Recipes" },
    subtitle: {
      fr: "Espace privé — recettes personnelles",
      en: "Private area — personal recipes",
    },
    passwordLabel: { fr: "Mot de passe", en: "Password" },
    enter: { fr: "Entrer", en: "Enter" },
    wrongPassword: {
      fr: "Mot de passe incorrect",
      en: "Incorrect password",
    },
    addRecipe: { fr: "Ajouter une recette", en: "Add a recipe" },
    recipeName: { fr: "Nom de la recette", en: "Recipe name" },
    ingredients: { fr: "Ingrédients", en: "Ingredients" },
    instructions: { fr: "Instructions", en: "Instructions" },
    save: { fr: "Enregistrer", en: "Save" },
    cancel: { fr: "Annuler", en: "Cancel" },
    noRecipes: {
      fr: "Aucune recette pour l'instant. Ajoutez votre première recette !",
      en: "No recipes yet. Add your first recipe!",
    },
    deleteConfirm: {
      fr: "Supprimer cette recette ?",
      en: "Delete this recipe?",
    },
  },
  providers: {
    title: { fr: "Fournisseurs", en: "Suppliers" },
    subtitle: {
      fr: "Espace privé — fournisseurs locaux",
      en: "Private area — local suppliers",
    },
    passwordLabel: { fr: "Mot de passe", en: "Password" },
    enter: { fr: "Entrer", en: "Enter" },
    wrongPassword: {
      fr: "Mot de passe incorrect",
      en: "Incorrect password",
    },
    addProvider: { fr: "Ajouter un fournisseur", en: "Add a supplier" },
    providerName: { fr: "Nom du fournisseur", en: "Supplier name" },
    category: { fr: "Catégorie", en: "Category" },
    contact: { fr: "Contact", en: "Contact" },
    notes: { fr: "Notes", en: "Notes" },
    save: { fr: "Enregistrer", en: "Save" },
    cancel: { fr: "Annuler", en: "Cancel" },
    noProviders: {
      fr: "Aucun fournisseur pour l'instant. Ajoutez votre premier fournisseur !",
      en: "No suppliers yet. Add your first supplier!",
    },
    deleteConfirm: {
      fr: "Supprimer ce fournisseur ?",
      en: "Delete this supplier?",
    },
  },
  footer: {
    rights: {
      fr: "Tous droits réservés.",
      en: "All rights reserved.",
    },
    location: {
      fr: "Saint-Malo, Bretagne, France",
      en: "Saint-Malo, Brittany, France",
    },
  },
  common: {
    switchLang: { fr: "EN", en: "FR" },
  },
} as const;

export function t(
  key: string,
  locale: Locale
): string {
  const keys = key.split(".");
  let value: any = translations;
  for (const k of keys) {
    value = value?.[k];
  }
  return value?.[locale] ?? key;
}
