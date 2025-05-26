import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
import { fetchTransactions } from '../features/transactionSlice'; // adapte le chemin si besoin
import { motion, AnimatePresence } from 'framer-motion';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement);

// Carte réutilisable avec graphique optionnel
const InfoCard = ({ icon, title, value, color = "text-2xl font-bold", chart, idx = 0 }) => (
  <motion.section
    className="bg-base-100 rounded shadow p-4 flex-1 min-w-[250px] max-w-xs flex flex-col items-center"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
  >
    <h2 className="font-bold text-lg mb-2">{icon} {title}</h2>
    <div className={color}>{value}</div>
    {chart && <div className="w-full mt-2">{chart}</div>}
  </motion.section>
);

const Report = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list || []);
  const status = useSelector((state) => state.transactions.status);

  // Fetch transactions au montage si besoin
  useEffect(() => {
    if (status === "idle" || !transactions.length) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status, transactions.length]);

  // Affichage loading/erreur
  if (status === "loading") {
    return <div className="p-8 text-center text-lg">Chargement des rapports...</div>;
  }
  if (status === "failed") {
    return <div className="p-8 text-center text-error">Erreur lors du chargement des transactions.</div>;
  }

  // 1. Dépenses du mois courant
  const now = new Date();
  const mois = now.getMonth() + 1;
  const annee = now.getFullYear();
  const transactionsMois = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() + 1 === mois && d.getFullYear() === annee && t.type === "dépense";
  });
  const totalDepensesMois = transactionsMois.reduce((sum, t) => sum + Number(t.montant), 0);

  // 2. Jours avec le plus de dépenses (mois courant)
  const depensesParJour = {};
  transactionsMois.forEach(t => {
    const d = new Date(t.date);
    const jour = d.getDate();
    depensesParJour[jour] = (depensesParJour[jour] || 0) + Number(t.montant);
  });
  const jours = Object.keys(depensesParJour).map(Number);
  const montantsJours = jours.map(j => depensesParJour[j]);
  const jourMax = jours.length ? jours[montantsJours.indexOf(Math.max(...montantsJours))] : null;

  // 3. Catégorie qui a explosé ce mois
  const depensesParCategorie = {};
  transactionsMois.forEach(t => {
    const cat = t.categorie_nom || "Autre";
    depensesParCategorie[cat] = (depensesParCategorie[cat] || 0) + Number(t.montant);
  });
  const categories = Object.keys(depensesParCategorie);
  const montantsCategories = categories.map(c => depensesParCategorie[c]);
  const categorieMax = categories.length ? categories[montantsCategories.indexOf(Math.max(...montantsCategories))] : null;

  // 4. Total des dépenses sur 3 mois
  const dateTroisMois = new Date();
  dateTroisMois.setMonth(dateTroisMois.getMonth() - 2);
  dateTroisMois.setDate(1);
  const transactions3Mois = transactions.filter(t => {
    const d = new Date(t.date);
    return t.type === "dépense" && d >= dateTroisMois && d <= now;
  });
  const totalDepenses3Mois = transactions3Mois.reduce((sum, t) => sum + Number(t.montant), 0);

  // 5. Export CSV
  const handleExport = () => {
    const rows = [
      ["Date", "Description", "Montant", "Type", "Catégorie"],
      ...transactions.map(t => [
        t.date, t.description, t.montant, t.type, t.categorie_nom || ""
      ])
    ];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      className="p-4 space-y-8"
    >
      {/* Cartes principales en flex wrap avec graphiques */}
      <motion.div
        className="flex flex-wrap gap-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        <InfoCard
          icon="💸"
          title="Dépenses ce mois-ci"
          value={`${totalDepensesMois.toLocaleString()} Ar`}
          color="text-2xl font-bold text-error"
          chart={
            jours.length > 0 ? (
              <Bar
                data={{
                  labels: jours.map(j => `Jour ${j}`),
                  datasets: [{
                    label: "Dépenses",
                    data: montantsJours,
                    backgroundColor: "#f87171"
                  }]
                }}
                options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false, height: 150 }}
              />
            ) : null
          }
          idx={0}
        />
        <InfoCard
          icon="📊"
          title="Dépenses sur 3 mois"
          value={`${totalDepenses3Mois.toLocaleString()} Ar`}
          color="text-2xl font-bold text-warning"
          idx={1}
        />
        <InfoCard
          icon="🔥"
          title="Catégorie max/mois"
          value={categorieMax || "-"}
          color="text-2xl font-bold text-info"
          chart={
            categories.length > 0 ? (
              <Pie
                data={{
                  labels: categories,
                  datasets: [{
                    data: montantsCategories,
                    backgroundColor: [
                      '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15'
                    ]
                  }]
                }}
                options={{ maintainAspectRatio: false, height: 150 }}
              />
            ) : null
          }
          idx={2}
        />
      </motion.div>

      {/* 2. Jours avec le plus de dépenses (détail) */}
      <motion.section
        className="bg-base-100 rounded shadow p-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-bold text-lg mb-2">📅 Jours où j'ai le plus dépensé</h2>
        {jours.length > 0 ? (
          <>
            <Bar
              data={{
                labels: jours.map(j => `Jour ${j}`),
                datasets: [{
                  label: "Dépenses",
                  data: montantsJours,
                  backgroundColor: "#f87171"
                }]
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
            <div className="mt-2">
              <span className="font-semibold">Jour le plus dépensier :</span> {jourMax ? `Jour ${jourMax}` : "-"}
            </div>
          </>
        ) : (
          <div className="text-gray-400">Aucune donnée</div>
        )}
      </motion.section>

      {/* 3. Catégorie qui a explosé ce mois (détail) */}
      <motion.section
        className="bg-base-100 rounded shadow p-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="font-bold text-lg mb-2">🔥 Catégorie la plus dépensière ce mois</h2>
        {categories.length > 0 ? (
          <>
            <Pie
              data={{
                labels: categories,
                datasets: [{
                  data: montantsCategories,
                  backgroundColor: [
                    '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15'
                  ]
                }]
              }}
            />
            <div className="mt-2">
              <span className="font-semibold">Catégorie la plus dépensière :</span> {categorieMax}
            </div>
          </>
        ) : (
          <div className="text-gray-400">Aucune donnée</div>
        )}
      </motion.section>

      {/* 5. Exporter les rapports */}
      <motion.section
        className="bg-base-100 rounded shadow p-4 flex items-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="font-bold text-lg">📤 Exporter mes rapports</h2>
        <button className="btn btn-primary btn-sm" onClick={handleExport}>
          Exporter en CSV
        </button>
      </motion.section>
    </motion.div>
  );
};

export default Report;