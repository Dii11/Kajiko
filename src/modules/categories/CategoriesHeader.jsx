import React from 'react';
import { motion } from 'framer-motion';
import NewCategorie from './NewCategorie';
import CategorieList from './CategorieListe';

const CategoriesHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
            className="mb-6 flex justify-between items-center"
        >
            <h2 className="text-2xl font-bold mb-4 text-accent">Liste des catégories</h2>
            <section className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Rechercher une catégorie..."
                    className="input input-bordered w-full max-w-xs"
                />
                <select className="select select-bordered">
                    <option value="">Filtrer par type</option>
                    <option value="dépense">Dépense</option>
                    <option value="revenu">Revenu</option>
                </select>
            </section>
        </motion.div>
    );
};

export default CategoriesHeader;