import React from 'react';

const ReportHeader = ({ totalDepensesMois, totalDepenses3Mois, categorieMax }) => (
  <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold mb-1">Rapports détaillés</h1>
      <div className="text-sm text-gray-500">Analyse de vos dépenses et catégories</div>
    </div>
    <div className="flex gap-6">
      <div>
        <div className="text-xs text-error">Dépenses ce mois</div>
        <div className="font-bold text-error">{(totalDepensesMois ?? 0).toLocaleString()} Ar</div>
      </div>
      <div>
        <div className="text-xs text-warning">Dépenses 3 derniers mois</div>
        <div className="font-bold text-warning">{(totalDepenses3Mois ?? 0).toLocaleString()} Ar</div>
      </div>
      <div>
        <div className="text-xs text-info">Catégorie max/mois</div>
        <div className="font-bold text-info">{categorieMax || "-"}</div>
      </div>
    </div>
  </div>
);

export default ReportHeader;