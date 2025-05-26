import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBudgets } from "../../features/budgetSlice";
import BudgetForm from "./BudgetForm";

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des budgets actifs</h2>
        {!showForm && (
          <button className="btn btn-primary" onClick={handleNouveau}>
            Nouveau
          </button>
        )}
      </div>
      {showForm ? (
        <BudgetForm onAjouter={handleAjouter} onAnnuler={handleAnnuler} />
      ) : (
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
              {budgets.map((b) => (
                <tr key={b.id}>
                  <td>{b.categorie_nom}</td>
                  <td>{b.categorie_type}</td>
                  <td>{b.montant} €</td>
                  <td>{b.periode}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {status === "loading" && <div className="mt-2">Chargement...</div>}
          {status === "failed" && (
            <div className="mt-2 text-error">Erreur lors du chargement</div>
          )}
        </div>
      )}
    </div>
  );
}