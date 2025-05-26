import React from "react";

// Données statiques de suivi pour démo
const budgets = [
	{
		id: 1,
		categorie: "Alimentation",
		montant: 100000,
		depense: 65000,
		periode: "Juin 2025",
		joursRestants: 5,
		transactions: [
			{ id: 1, libelle: "Supermarché", montant: 30000 },
			{ id: 2, libelle: "Marché", montant: 20000 },
			{ id: 3, libelle: "Snacks", montant: 15000 },
		],
	},
	{
		id: 2,
		categorie: "Transport",
		montant: 40000,
		depense: 42000,
		periode: "Juin 2025",
		joursRestants: 5,
		transactions: [
			{ id: 1, libelle: "Taxi", montant: 20000 },
			{ id: 2, libelle: "Bus", montant: 22000 },
		],
	},
	{
		id: 3,
		categorie: "Loisirs",
		montant: 20000,
		depense: 10000,
		periode: "Juin 2025",
		joursRestants: 5,
		transactions: [
			{ id: 1, libelle: "Cinéma", montant: 10000 },
		],
	},
];

// Fonction pour déterminer le statut couleur
function getStatut(depense, montant) {
	const ratio = depense / montant;
	if (ratio < 0.8) return "success"; // 🟢
	if (ratio <= 1) return "warning"; // 🟡
	return "error"; // 🔴
}

export default function BudgetSuivi() {
	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-6">Suivi en temps réel des budgets</h2>
			<div className="overflow-x-auto">
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th>Catégorie</th>
							<th>Budget défini</th>
							<th>Dépenses</th>
							<th>Reste</th>
							<th>Statut</th>
							<th>Période</th>
							<th>Jours restants</th>
							<th>Progression</th>
						</tr>
					</thead>
					<tbody>
						{budgets.map((b) => {
							const reste = b.montant - b.depense;
							const ratio = Math.min(b.depense / b.montant, 1);
							const statut = getStatut(b.depense, b.montant);
							return (
								<tr key={b.id}>
									<td>{b.categorie}</td>
									<td>{b.montant.toLocaleString()} Ar</td>
									<td>{b.depense.toLocaleString()} Ar</td>
									<td className={reste < 0 ? "text-error" : ""}>
										{reste.toLocaleString()} Ar
									</td>
									<td>
										<span className={`badge badge-${statut}`}>
											{statut === "success" && "🟢 Sécurité"}
											{statut === "warning" && "🟡 Limite"}
											{statut === "error" && "🔴 Dépassé"}
										</span>
									</td>
									<td>{b.periode}</td>
									<td>{b.joursRestants} jours</td>
									<td className="w-48">
										<progress
											className={`progress progress-${statut} w-full`}
											value={Math.min((b.depense / b.montant) * 100, 100)}
											max="100"
										></progress>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* Détail des transactions (facultatif) */}
			<div className="mt-8">
				<h3 className="font-semibold mb-2">Détail des transactions (exemple)</h3>
				{budgets.map((b) => (
					<div key={b.id} className="mb-4">
						<div className="font-bold">{b.categorie}</div>
						<ul className="ml-4 list-disc">
							{b.transactions.map((t) => (
								<li key={t.id}>
									{t.libelle} : {t.montant.toLocaleString()} Ar
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}