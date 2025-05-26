import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Données statiques de démo
const alertes = [
  {
    id: 1,
    categorie: "Transport",
    depenseJour: 8000,
    joursRestants: 3,
    budget: 40000,
    depense: 34000,
    seuil: 80,
    gravite: "prévision",
    periode: "Juin 2025",
    alerteActive: true,
    notification: "email",
  },
  {
    id: 2,
    categorie: "Alimentation",
    depenseJour: 12000,
    joursRestants: 0,
    budget: 100000,
    depense: 105000,
    seuil: 100,
    gravite: "dépassement",
    periode: "Juin 2025",
    alerteActive: true,
    notification: "mobile",
  },
  {
    id: 3,
    categorie: "Loisirs",
    depenseJour: 2000,
    joursRestants: 10,
    budget: 20000,
    depense: 10000,
    seuil: 90,
    gravite: "sécurité",
    periode: "Juin 2025",
    alerteActive: false,
    notification: "aucune",
  },
];

const seuils = [80, 90, 100];
const gravites = ["prévision", "dépassement", "sécurité"];

export default function BudgetAlert() {
  const [filtrePeriode, setFiltrePeriode] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const [filtreGravite, setFiltreGravite] = useState("");

  // Filtrage intelligent
  const alertesFiltrees = alertes.filter((a) =>
    (!filtrePeriode || a.periode === filtrePeriode) &&
    (!filtreCategorie || a.categorie === filtreCategorie) &&
    (!filtreGravite || a.gravite === filtreGravite)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      className="p-4 bg-base-100 rounded-2xl"
    >
      <h2 className="text-xl font-bold mb-6">Alertes & Prévisions de budget</h2>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="select select-bordered"
          value={filtrePeriode}
          onChange={e => setFiltrePeriode(e.target.value)}
        >
          <option value="">Toutes les périodes</option>
          {[...new Set(alertes.map(a => a.periode))].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={filtreCategorie}
          onChange={e => setFiltreCategorie(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {[...new Set(alertes.map(a => a.categorie))].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={filtreGravite}
          onChange={e => setFiltreGravite(e.target.value)}
        >
          <option value="">Tous niveaux</option>
          {gravites.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Tableau des alertes */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Période</th>
              <th>Budget</th>
              <th>Dépenses</th>
              <th>Prévision</th>
              <th>Seuil d’alerte</th>
              <th>Gravité</th>
              <th>Notification</th>
              <th>Activer</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {alertesFiltrees.map((a, idx) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3, delay: idx * 0.07 }}
                >
                  <td>{a.categorie}</td>
                  <td>{a.periode}</td>
                  <td>{a.budget.toLocaleString()} Ar</td>
                  <td>{a.depense.toLocaleString()} Ar</td>
                  <td>
                    {a.gravite === "prévision"
                      ? <>Si vous continuez à dépenser <b>{a.depenseJour.toLocaleString()} Ar/jour</b>,<br />
                        vous dépasserez le budget dans <b>{a.joursRestants} jours</b></>
                      : a.gravite === "dépassement"
                        ? <>Budget dépassé !</>
                        : <>Sécurité</>
                    }
                  </td>
                  <td>
                    <span className="badge badge-info">{a.seuil}%</span>
                  </td>
                  <td>
                    <span className={
                      a.gravite === "dépassement"
                        ? "badge badge-error"
                        : a.gravite === "prévision"
                          ? "badge badge-warning"
                          : "badge badge-success"
                    }>
                      {a.gravite}
                    </span>
                  </td>
                  <td>
                    {a.notification === "email" && "📧 Email"}
                    {a.notification === "mobile" && "📱 Mobile"}
                    {a.notification === "aucune" && "🔕 Aucune"}
                  </td>
                  <td>
                    <input type="checkbox" className="toggle toggle-success"
                      checked={a.alerteActive}
                      readOnly
                    />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Graphique prévisionnel (démo simple) */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="font-semibold mb-2">Graphique prévisionnel (démo)</h3>
        <div className="flex gap-8">
          {alertesFiltrees.map((a, idx) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="w-64"
            >
              <div className="mb-2 font-bold">{a.categorie}</div>
              <progress
                className={`progress progress-${a.gravite === "dépassement"
                  ? "error"
                  : a.gravite === "prévision"
                    ? "warning"
                    : "success"
                  } w-full`}
                value={Math.min((a.depense / a.budget) * 100, 120)}
                max="120"
              ></progress>
              <div className="text-xs mt-1">
                {a.depense.toLocaleString()} Ar / {a.budget.toLocaleString()} Ar
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Système de notification personnalisé (démo) */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="font-semibold mb-2">Paramètres de notification</h3>
        <ul className="list-disc ml-6 text-sm">
          <li>Choisissez le seuil d’alerte : {seuils.map(s => <span key={s} className="badge badge-info mx-1">{s}%</span>)}</li>
          <li>Recevoir une alerte par : 📧 Email, 📱 Mobile, ou désactiver 🔕</li>
          <li>Désactiver les alertes pour certaines catégories (voir colonne "Activer")</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}