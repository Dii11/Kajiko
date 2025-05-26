import React from 'react';
import { useSelector } from 'react-redux';

const TransactioHeader = () => {
    // Récupère la liste des transactions depuis le store Redux
    const transactions = useSelector((state) => state.transactions.list || []);

    // Calcule la somme des dépenses et des revenus
    const totalDepenses = transactions
        .filter(t => t.type === "dépense")
        .reduce((sum, t) => sum + Number(t.montant), 0);

    const totalRevenus = transactions
        .filter(t => t.type === "revenu")
        .reduce((sum, t) => sum + Number(t.montant), 0);

    const solde = totalRevenus - totalDepenses;

    return (
        <div className="flex flex-wrap gap-6 mb-6">
            <div className="bg-error/10 border-l-4 border-error p-4 rounded-lg min-w-[180px]">
                <div className="text-sm text-error font-semibold">💸 Total dépenses</div>
                <div className="text-2xl font-bold">{totalDepenses.toLocaleString()} Ar</div>
            </div>
            <div className="bg-success/10 border-l-4 border-success p-4 rounded-lg min-w-[180px]">
                <div className="text-sm text-success font-semibold">💰 Total revenus</div>
                <div className="text-2xl font-bold">{totalRevenus.toLocaleString()} Ar</div>
            </div>
            <div className="bg-info/10 border-l-4 border-info p-4 rounded-lg min-w-[180px]">
                <div className="text-sm text-info font-semibold">🔄 Solde</div>
                <div className={`text-2xl font-bold ${solde < 0 ? "text-error" : "text-info"}`}>
                    {solde.toLocaleString()} Ar
                </div>
            </div>
        </div>
    );
};

export default TransactioHeader;