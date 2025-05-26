import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/categorySlice';
import { addBudget } from '../../features/budgetSlice';

const BudgetForm = ({ onAjouter, onAnnuler }) => {
    const [categorie, setCategorie] = useState('');
    const [montant, setMontant] = useState('');
    const [periode, setPeriode] = useState('');

    const dispatch = useDispatch();

    // Récupère la liste des catégories depuis le store Redux
    const categories = useSelector((state) => state.categories.list || []);
 
    // Récupère les catégories au montage du composant
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBudget({ categorie, montant, periode }))
          .unwrap()
          .then(() => {
            if (onAjouter) onAjouter();
          })
          .catch(() => alert("Erreur lors de l'ajout du budget"));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-base-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Nouveau budget</h3>
            <div>
                <label className="label">Catégorie</label>
                <select
                    className="select select-bordered w-full"
                    value={categorie}
                    onChange={e => setCategorie(e.target.value)}
                    required
                >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nom} ({cat.type})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="label">Montant</label>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={montant}
                    onChange={e => setMontant(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="label">Période</label>
                <select
                    className="select select-bordered w-full"
                    value={periode}
                    onChange={e => setPeriode(e.target.value)}
                    required
                >
                    <option value="">Choisir une période</option>
                    <option value="Mensuel">Mensuel</option>
                    <option value="Hebdomadaire">Hebdomadaire</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">Ajouter</button>
                {onAnnuler && (
                    <button type="button" className="btn btn-ghost" onClick={onAnnuler}>
                        Annuler
                    </button>
                )}
            </div>
        </form>
    );
};

export default BudgetForm;