import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/categorySlice';
import { addTransaction } from '../../features/transactionSlice';

const TransactionForm = ({ onAjouter, onAnnuler }) => {
    const [description, setDescription] = useState('');
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('dépense');
    const [date, setDate] = useState('');
    const [categorie, setCategorie] = useState('');

    const dispatch = useDispatch();

    // Récupère les catégories du store Redux
    const categories = useSelector((state) => state.categories.list || []);

    // Récupère les catégories au montage du composant
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTransaction({ description, montant, type, date, categorie }))
            .unwrap()
            .then(() => {
                if (onAjouter) onAjouter(); // ← Cette ligne ferme le formulaire et retourne à la liste
            })
            .catch(() => alert("Erreur lors de l'ajout de la transaction"));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-base-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Nouvelle transaction</h3>
            <div>
                <label className="label">Catégorie</label>
                <select
                    className="select select-bordered w-full"
                    value={categorie}
                    onChange={e => setCategorie(e.target.value)}
                    required
                >
                    <option value="">Choisir une catégorie</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nom} ({cat.type})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="label">Description</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Ex: Taxi, Salaire..."
                />
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
                <label className="label">Type</label>
                <select
                    className="select select-bordered w-full"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    required
                >
                    <option value="dépense">Dépense</option>
                    <option value="revenu">Revenu</option>
                </select>
            </div>
            <div>
                <label className="label">Date</label>
                <input
                    type="date"
                    className="input input-bordered w-full"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
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

export default TransactionForm;