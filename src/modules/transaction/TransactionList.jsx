import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions, addTransaction } from '../../features/transactionSlice';
import TransactionForm from './TransactionForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionList() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list || []);
  const status = useSelector((state) => state.transactions.status);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status]);

  const handleNouveau = () => setShowForm(true);
  const handleAnnuler = () => setShowForm(false);

  const handleAjouter = async (transactionData) => {
    await dispatch(addTransaction(transactionData)).unwrap();
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      className="p-4 bg-base-100 rounded-2xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des transactions</h2>
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
            <TransactionForm onAjouter={handleAjouter} onAnnuler={handleAnnuler} />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}

          >
            <div className="overflow-x-auto ">
              <table className="table table-zebra w-full ">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Montant</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Catégorie</th>
                    <th>Budget associé</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {transactions.map((t) => (
                      <motion.tr
                        key={t.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td>{t.description}</td>
                        <td className={t.type === "dépense" ? "text-error" : "text-success"}>
                          {t.type === "dépense" ? "-" : "+"}{Number(t.montant).toLocaleString()} Ar
                        </td>
                        <td>
                          <span className={`badge badge-${t.type === "dépense" ? "error" : "success"}`}>
                            {t.type}
                          </span>
                        </td>
                        <td>{t.date}</td>
                        <td>
                          {t.categorie_nom
                            ? `${t.categorie_nom} (${t.categorie_type})`
                            : <span className="text-gray-400">-</span>
                          }
                        </td>
                        <td>
                          {t.budget_id
                            ? `${t.budget_montant?.toLocaleString()} Ar (${t.budget_periode})`
                            : <span className="text-gray-400">-</span>
                          }
                        </td>
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