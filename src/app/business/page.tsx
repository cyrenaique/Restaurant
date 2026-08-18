"use client";

import { useState } from "react";
import { Lock, TrendingUp, Building2, Euro, BarChart3 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PASSWORD = "chef2024";

export default function BusinessPage() {
  const { locale } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="py-20 bg-sand-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-wine-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-wine-700" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Business Plan
          </h1>
          <p className="text-gray-500 text-sm mb-6">Accès privé</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Mot de passe
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
                <p className="text-red-500 text-xs mt-1">Mot de passe incorrect</p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Entrer
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
        <div className="text-center mb-12">
          <h1 className="section-heading mb-2">Business Plan — Restaurant Franco-Russe</h1>
          <p className="text-gray-500 text-sm">Saint-Malo | ~10 tables (30-40 couverts) | Étude août 2026</p>
        </div>

        {/* Concept */}
        <Section icon={<Building2 className="w-5 h-5" />} title="Profil du Concept">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Couverts" value="30-40" />
            <StatCard label="Surface cible" value="70-100 m²" />
            <StatCard label="Ticket moyen" value="~26 €" />
            <StatCard label="Food cost" value="~32%" />
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Cuisine franco-russe unique à Saint-Malo. Plats chauds l&apos;hiver (borchtch, solianka), 
            froids l&apos;été (свекольник). Vins de Loire, thés russes, cidre breton. 
            Niche sans concurrent direct dans la zone.
          </p>
        </Section>

        {/* Achat Fonds de Commerce */}
        <Section icon={<Euro className="w-5 h-5" />} title="Achat — Fonds de Commerce (avec équipement)">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">Gamme</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Surface</th>
                  <th className="text-left py-2 px-2 font-semibold text-gray-700">Couverts</th>
                  <th className="text-right py-2 pl-2 font-semibold text-gray-700">Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 text-gray-900">Entrée de gamme (hors Intra-Muros)</td>
                  <td className="py-2.5 px-2 text-gray-600">65-80 m²</td>
                  <td className="py-2.5 px-2 text-gray-600">28-35</td>
                  <td className="py-2.5 pl-2 text-right font-semibold text-gray-900">85 000 – 150 000 €</td>
                </tr>
                <tr className="border-b border-gray-50 bg-wine-50/30">
                  <td className="py-2.5 pr-4 text-gray-900 font-medium">Milieu de gamme (bon emplacement) ⭐</td>
                  <td className="py-2.5 px-2 text-gray-600">80-100 m²</td>
                  <td className="py-2.5 px-2 text-gray-600">30-42</td>
                  <td className="py-2.5 pl-2 text-right font-bold text-wine-700">150 000 – 325 000 €</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 text-gray-900">Premium (Intra-Muros / front de mer)</td>
                  <td className="py-2.5 px-2 text-gray-600">100-150 m²</td>
                  <td className="py-2.5 px-2 text-gray-600">40-90</td>
                  <td className="py-2.5 pl-2 text-right font-semibold text-gray-900">315 000 – 650 000 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">
            Sources : IAD, Propriétés Privées, Murs & Fonds, CessionPME — août 2026
          </p>
        </Section>

        {/* Location */}
        <Section icon={<Building2 className="w-5 h-5" />} title="Location — Bail Commercial (3/6/9)">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">Emplacement</th>
                  <th className="text-right py-2 pl-2 font-semibold text-gray-700">Loyer mensuel HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 text-gray-900">Hors remparts (Paramé, Saint-Servan)</td>
                  <td className="py-2.5 pl-2 text-right font-semibold text-gray-900">900 – 1 500 €/mois</td>
                </tr>
                <tr className="border-b border-gray-50 bg-wine-50/30">
                  <td className="py-2.5 pr-4 text-gray-900 font-medium">Proche Intra-Muros / axe passant ⭐</td>
                  <td className="py-2.5 pl-2 text-right font-bold text-wine-700">1 200 – 2 200 €/mois</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 text-gray-900">Intra-Muros centre</td>
                  <td className="py-2.5 pl-2 text-right font-semibold text-gray-900">2 200 – 3 600 €/mois</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <p className="text-green-800 text-sm font-medium">
              💡 Recommandation : Saint-Servan ou Paramé, ~1 300-1 600 €/mois. 
              Meilleur rapport risque/potentiel pour un petit établissement.
            </p>
          </div>
        </Section>

        {/* Budget démarrage */}
        <Section icon={<Euro className="w-5 h-5" />} title="Budget Global — Démarrage en Location">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">Poste</th>
                  <th className="text-right py-2 pl-2 font-semibold text-gray-700">Estimation</th>
                </tr>
              </thead>
              <tbody>
                <BudgetRow label="Droit au bail / Pas-de-porte" value="20 000 – 60 000 €" />
                <BudgetRow label="Loyer (6 mois d'avance)" value="7 200 – 10 800 €" />
                <BudgetRow label="Équipement cuisine (si non inclus)" value="15 000 – 40 000 €" />
                <BudgetRow label="Mobilier salle (10 tables + chaises)" value="5 000 – 12 000 €" />
                <BudgetRow label="Mise aux normes / déco" value="10 000 – 25 000 €" />
                <BudgetRow label="Licence IV (si nécessaire)" value="5 000 – 15 000 €" />
                <BudgetRow label="Trésorerie démarrage" value="15 000 – 25 000 €" />
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <td className="py-3 pr-4 font-bold text-gray-900 text-base">TOTAL</td>
                  <td className="py-3 pl-2 text-right font-bold text-wine-700 text-base">80 000 – 190 000 €</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Section>

        {/* Rentabilité */}
        <Section icon={<BarChart3 className="w-5 h-5" />} title="Rentabilité Prévisionnelle">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">Indicateur</th>
                  <th className="text-right py-2 pl-2 font-semibold text-gray-700">Estimation</th>
                </tr>
              </thead>
              <tbody>
                <BudgetRow label="Ticket moyen (food + drinks)" value="~26 €" />
                <BudgetRow label="Couverts/jour (moyenne année)" value="25-35" />
                <BudgetRow label="CA mensuel estimé" value="16 000 – 23 000 €" />
                <BudgetRow label="CA annuel" value="195 000 – 280 000 €" />
                <BudgetRow label="Marge matière (votre carte)" value="~68% → food cost ~32%" />
                <BudgetRow label="Charges personnel" value="~30-35% du CA" />
                <BudgetRow label="Loyer + charges" value="~10-12% du CA" />
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <td className="py-3 pr-4 font-bold text-gray-900 text-base">Résultat net estimé</td>
                  <td className="py-3 pl-2 text-right font-bold text-green-700 text-base">15 000 – 42 000 €/an</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">
            Basé sur 300 jours d&apos;ouverture, saisonnalité Saint-Malo (haute saison avril-octobre).
          </p>
        </Section>

        {/* Avantages */}
        <Section icon={<TrendingUp className="w-5 h-5" />} title="Avantages Concurrentiels">
          <div className="grid gap-3">
            <Advantage title="Niche unique" desc="Pas de concurrent franco-russe à Saint-Malo ni en Bretagne Nord." />
            <Advantage title="Site web professionnel" desc="Déjà en ligne avec menu, boissons, producteurs locaux — référencement immédiat." />
            <Advantage title="Marge boissons élevée" desc="Thés russes (~85%), vins Loire (~75%), cidre breton — excellent mix." />
            <Advantage title="Saisonnalité atténuée" desc="Clientèle locale fidèle + tourisme fort (avril-octobre). Plats chauds hiver / froids été." />
            <Advantage title="Circuit court valorisé" desc="Page producteurs publique — valorise l'engagement local auprès des clients." />
            <Advantage title="Menu adaptable" desc="Entrées à 9-11€, plats à 18-38€, tartines à 11-13€ — large gamme de prix." />
          </div>
        </Section>

        {/* Recommandation finale */}
        <div className="bg-wine-50 border border-wine-200 rounded-2xl p-8 mt-8">
          <h3 className="font-display text-lg font-bold text-wine-900 mb-3">📌 Recommandation</h3>
          <p className="text-wine-800 text-sm leading-relaxed">
            Pour 10 tables, privilégier un local de <strong>70-90 m²</strong> en <strong>Saint-Servan ou Paramé</strong> à 
            environ <strong>1 300-1 600 €/mois</strong>. L&apos;Intra-Muros est tentant (flux touristique) mais les loyers 
            (2 500 €+) compriment la marge pour un petit établissement. Un emplacement sur un axe passant avec 
            possibilité de terrasse offre le meilleur compromis visibilité / coût.
          </p>
          <p className="text-wine-700 text-sm mt-3">
            Budget total de démarrage réaliste : <strong>100 000 – 150 000 €</strong> (location avec cuisine équipée).
          </p>
        </div>

      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-wine-600">{icon}</div>
        <h2 className="font-display text-xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sand-50 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-display font-bold text-wine-700 text-lg">{value}</p>
    </div>
  );
}

function BudgetRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-50">
      <td className="py-2.5 pr-4 text-gray-700">{label}</td>
      <td className="py-2.5 pl-2 text-right font-semibold text-gray-900">{value}</td>
    </tr>
  );
}

function Advantage({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-sand-50 rounded-lg p-4">
      <span className="text-green-600 mt-0.5">✓</span>
      <div>
        <p className="font-medium text-gray-900 text-sm">{title}</p>
        <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
