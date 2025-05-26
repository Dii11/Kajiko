import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../features/transactionSlice';
import { fetchBudgets } from '../../features/budgetSlice';
import { useNavigate } from 'react-router-dom'; // Ajout import
import { Pie, Line } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { motion } from "framer-motion";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const ResumeCards = ({ revenus, depenses, solde }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-success/10 border-l-4 border-success p-4 rounded-lg flex items-center gap-3">
      <span className="text-2xl">💰</span>
      <div>
        <div className="text-sm text-success font-semibold">Total revenus (mois)</div>
        <div className="text-xl font-bold">{revenus.toLocaleString()} Ar</div>
      </div>
    </div>
    <div className="bg-error/10 border-l-4 border-error p-4 rounded-lg flex items-center gap-3">
      <span className="text-2xl">🔻</span>
      <div>
        <div className="text-sm text-error font-semibold">Total dépenses (mois)</div>
        <div className="text-xl font-bold">{depenses.toLocaleString()} Ar</div>
      </div>
    </div>
    <div className="bg-info/10 border-l-4 border-info p-4 rounded-lg flex items-center gap-3">
      <span className="text-2xl">💼</span>
      <div>
        <div className="text-sm text-info font-semibold">Solde actuel</div>
        <div className="text-xl font-bold">{solde.toLocaleString()} Ar</div>
      </div>
    </div>
  </div>
);

const DepensesParCategorie = ({ depensesParCategorie }) => {
  const data = {
    labels: depensesParCategorie.map(cat => cat.categorie),
    datasets: [
      {
        data: depensesParCategorie.map(cat => cat.montant),
        backgroundColor: [
          '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15'
        ],
      },
    ],
  };
  return (
    <div className="bg-base-100 rounded shadow p-4 w-150">
      <div className="font-semibold mb-2">📊 Dépenses par catégorie</div>
      {depensesParCategorie.length > 0 ? (
        <Pie data={data} />
      ) : (
        <div className="text-gray-400 text-center h-48 flex items-center justify-center">Aucune donnée</div>
      )}
    </div>
  );
};

const EvolutionGraph = ({ transactionsMois }) => {
  // Génère les jours du mois courant
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  // Calcule les revenus/dépenses par jour
  const revenusParJour = Array(daysInMonth).fill(0);
  const depensesParJour = Array(daysInMonth).fill(0);

  transactionsMois.forEach(t => {
    const d = new Date(t.date);
    const day = d.getDate() - 1;
    if (t.type === "revenu") revenusParJour[day] += Number(t.montant);
    if (t.type === "dépense") depensesParJour[day] += Number(t.montant);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Dépenses',
        data: depensesParJour,
        borderColor: '#ef4444',
        backgroundColor: '#f87171',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Revenus',
        data: revenusParJour,
        borderColor: '#22c55e',
        backgroundColor: '#34d399',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-base-100 rounded shadow p-4">
      <div className="font-semibold mb-2">📈 Évolution dépenses/revenus</div>
      {transactionsMois.length > 0 ? (
        <Line data={data} />
      ) : (
        <div className="text-gray-400 text-center h-48 flex items-center justify-center">Aucune donnée</div>
      )}
    </div>
  );
};

const Raccourcis = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-base-100 rounded shadow p-4 flex flex-col gap-2">
      <div className="font-semibold mb-2">🧠 Raccourcis rapides</div>
      <button className="btn btn-primary btn-sm" onClick={() => navigate('/home/transactions/')}>
        ➕ Ajouter une transaction
      </button>
      <button className="btn btn-secondary btn-sm" onClick={() => navigate('/home/budget/list')}>
        ➕ Ajouter un budget
      </button>
      <button className="btn btn-accent btn-sm" onClick={() => navigate('/home/categories/')}>
        ➕ Nouvelle catégorie
      </button>
    </div>
  );
};

const Alertes = ({ alertes }) => (
  <div className="bg-base-100 rounded shadow p-4">
    <div className="font-semibold mb-2">🔔 Alertes actives</div>
    <ul className="text-sm">
      {alertes.length === 0 && <li className="text-gray-400">Aucune alerte</li>}
      {alertes.map((a, i) => (
        <li key={i} className={a.type === "danger" ? "text-error" : "text-warning"}>
          {a.emoji} {a.message}
        </li>
      ))}
    </ul>
  </div>
);

const TopCategories = ({ topCategories }) => (
  <div className="bg-base-100 rounded shadow p-4">
    <div className="font-semibold mb-2">🧾 Catégories les plus dépensières</div>
    <ol className="list-decimal ml-4 text-sm">
      {topCategories.map((cat, i) => (
        <li key={i}>
          {cat.categorie} — {cat.montant.toLocaleString()} Ar ({cat.pourcentage}%)
        </li>
      ))}
    </ol>
  </div>
);

const TransactionsRecentes = ({ transactions }) => (
  <div className="bg-base-100 rounded shadow p-4">
    <div className="font-semibold mb-2">📆 Transactions récentes</div>
    <ul className="text-sm">
      {transactions.slice(0, 5).map((t, i) => (
        <li key={i}>
          {t.date} - {t.description} {t.type === "revenu" ? "+" : "-"}{Number(t.montant).toLocaleString()} Ar
        </li>
      ))}
    </ul>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  // Récupération des transactions et budgets depuis le store Redux
  const transactions = useSelector((state) => state.transactions.list || []);
  const budgets = useSelector((state) => state.budgets.list || []);

  // Fetch des données au montage
  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchBudgets());
    // ...ajoute d'autres fetch si besoin (ex: fetchCategories)...
  }, [dispatch]);

  // Calculs pour le mois en cours
  const now = new Date();
  const mois = now.getMonth() + 1;
  const annee = now.getFullYear();

  // Filtrer les transactions du mois en cours
  const transactionsMois = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() + 1 === mois && d.getFullYear() === annee;
  });

  // Total revenus/mois
  const totalRevenus = transactionsMois
    .filter(t => t.type === "revenu")
    .reduce((sum, t) => sum + Number(t.montant), 0);

  // Total dépenses/mois
  const totalDepenses = transactionsMois
    .filter(t => t.type === "dépense")
    .reduce((sum, t) => sum + Number(t.montant), 0);

  // Total budgets/mois (somme des montants de tous les budgets du store)
  const totalBudgets = budgets
    .reduce((sum, b) => sum + Number(b.montant), 0);

  // Solde/mois
  const solde = totalRevenus - totalDepenses;

  // Dépenses par catégorie
  const depensesParCategorieObj = {};
  transactionsMois
    .filter(t => t.type === "dépense")
    .forEach(t => {
      const cat = t.categorie_nom || "Autre";
      depensesParCategorieObj[cat] = (depensesParCategorieObj[cat] || 0) + Number(t.montant);
    });
  const totalDepensesCat = Object.values(depensesParCategorieObj).reduce((a, b) => a + b, 0);
  const depensesParCategorie = Object.entries(depensesParCategorieObj).map(([categorie, montant]) => ({
    categorie,
    montant,
    pourcentage: totalDepensesCat ? Math.round((montant / totalDepensesCat) * 100) : 0
  }));

  // Top catégories
  const topCategories = depensesParCategorie
    .sort((a, b) => b.montant - a.montant)
    .slice(0, 3);

  // Transactions récentes
  const transactionsTriees = [...transactionsMois].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Alertes budgets (utilisation des budgets du store)
  const alertes = [];
  budgets.forEach(budget => {
    const depenseCat = depensesParCategorieObj[budget.categorie_nom] || 0;
    const ratio = budget.montant ? depenseCat / budget.montant : 0;
    if (ratio > 1) {
      alertes.push({
        type: "danger",
        emoji: "🟥",
        message: `${budget.categorie_nom} dépasse le budget de ${Math.round((ratio - 1) * 100)}%`
      });
    } else if (ratio > 0.9) {
      alertes.push({
        type: "warning",
        emoji: "🟨",
        message: `${budget.categorie_nom} atteint ${Math.round(ratio * 100)}% du budget`
      });
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-success/10 border-l-4 border-success p-4 rounded-lg">
          <div className="text-sm text-success font-semibold">Total revenus (mois)</div>
          <div className="text-2xl font-bold">{totalRevenus.toLocaleString()} Ar</div>
        </div>
        <div className="bg-error/10 border-l-4 border-error p-4 rounded-lg">
          <div className="text-sm text-error font-semibold">Total dépenses (mois</div>
          <div className="text-2xl font-bold">{totalDepenses.toLocaleString()} Ar</div>
        </div>
        <div className="bg-info/10 border-l-4 border-info p-4 rounded-lg">
          <div className="text-sm text-info font-semibold">Solde actuel</div>
          <div className="text-2xl font-bold">{solde.toLocaleString()} Ar</div>
        </div>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-lg">
          <div className="text-sm text-warning font-semibold">Total budgets</div>
          <div className="text-2xl font-bold">{totalBudgets.toLocaleString()} Ar</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DepensesParCategorie depensesParCategorie={depensesParCategorie} />
        <EvolutionGraph transactionsMois={transactionsMois} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Alertes alertes={alertes} />
        <Raccourcis />
        <TopCategories topCategories={topCategories} />
        <TransactionsRecentes transactions={transactionsTriees} />
      </div>
    </motion.div>
  );
};

export default Dashboard;