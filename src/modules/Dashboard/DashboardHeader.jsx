import React from 'react';

const DashboardHeader = ({
  periode = "Mois en cours",
  onPeriodeChange,
  solde = "--",
  revenus = "--",
  depenses = "--"
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <div className="text-sm text-gray-500">Aperçu global de vos finances</div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Période :</label>
        <select
          className="select select-bordered select-sm"
          value={periode}
          onChange={e => onPeriodeChange && onPeriodeChange(e.target.value)}
        >
          <option value="mois">Mois en cours</option>
          <option value="semaine">Semaine</option>
          <option value="annee">Année</option>
        </select>
      </div>
      <div className="flex gap-4">
        <div>
          <div className="text-xs text-info">Solde</div>
          <div className="font-bold text-info">{solde} Ar</div>
        </div>
        <div>
          <div className="text-xs text-success">Revenus</div>
          <div className="font-bold text-success">{revenus} Ar</div>
        </div>
        <div>
          <div className="text-xs text-error">Dépenses</div>
          <div className="font-bold text-error">{depenses} Ar</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;