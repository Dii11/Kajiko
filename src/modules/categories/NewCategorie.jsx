import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../features/categorySlice';

const NewCategorie = ({ onAjouter, onAnnuler }) => {
    const [nom, setNom] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addCategory({ nom, type })).unwrap();
            if (onAjouter) onAjouter();
        } catch (err) {
            alert("Erreur lors de l'ajout");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-base-100 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Nouvelle catégorie</h3>
            <div>
                <label className="label">Nom</label>
                <input
                    type="text"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
            </div>
            <div>
                <label className="label">Type</label>
                <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Choisir un type</option>
                    <option value="dépense">Dépense</option>
                    <option value="revenu">Revenu</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">Ajouter</button>
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={onAnnuler}
                >
                    Annuler
                </button>
            </div>
        </form>
    );
};

export default NewCategorie;