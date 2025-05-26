import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBudgets } from "../../features/budgetSlice";
import BudgetForm from "./BudgetForm";
import { motion, AnimatePresence } from "framer-motion";

export default function BudgetList() {
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budgets.list || []);
  const status = useSelector((state) => state.budgets.status);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBudgets());
    }
  }, [dispatch, status]);

  const handleNouveau = () => setShowForm(true);
  const handleAnnuler = () => setShowForm(false);
  const handleAjouter = () => setShowForm(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      className="p-4 bg-base-100 rounded-2xl"
    >
      <div className="flex justify-between items-center mb-4 "> 
        <h2 className="text-xl font-bold">Liste des budgets actifs</h2>
        {!showForm && (
          <button className="btn btn-primary" onClick={handleNouveau}>
            Nouveau
          </button>
        )}
      </div>
      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <BudgetForm onAjouter={handleAjouter} onAnnuler={handleAnnuler} />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Catégorie</th>
                    <th>Type</th>
                    <th>Montant</th>
                    <th>Période</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {budgets.map((b) => (
                      <motion.tr
                        key={b.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td>{b.categorie_nom}</td>
                        <td>{b.categorie_type}</td>
                        <td>{b.montant} €</td>
                        <td>{b.periode}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {status === "loading" && <div className="mt-2">Chargement...</div>}
              {status === "failed" && (
                <div className="mt-2 text-error">Erreur lors du chargement</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}