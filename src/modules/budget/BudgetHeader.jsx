import { NavLink } from "react-router-dom";
import { BarChart2, AlertCircle } from "lucide-react";

const navItems = [
  {
    key: "list",
    to: "/home/budget/list",
    icon: <BarChart2 className="inline w-5 h-5 mr-1" />,
    label: "Liste des budgets actifs",
    desc: "Affichage des catégories avec montant fixé",
  },
  {
    key: "suivi",
    to: "/home/budget/suivi",
    icon: <BarChart2 className="inline w-5 h-5 mr-1" />,
    label: "Suivi en temps réel",
    desc: "% dépensé, reste, indicateurs visuels",
  },
  {
    key: "alert",
    to: "/home/budget/alert",
    icon: <AlertCircle className="inline w-5 h-5 mr-1 text-error" />,
    label: "Alerte dépassement",
    desc: "Icône ou couleur quand une catégorie est dépassée",
  },
];

const BudgetHeader = () => {
  return (
    <nav className="flex flex-wrap gap-4 mb-6 ml-8">
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center px-4 py-2 rounded-lg border transition
            ${isActive
              ? "bg-primary text-white border-primary"
              : "bg-base-100 text-primary border-base-200 hover:bg-base-200"}`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span className="font-semibold">{item.label}</span>
          <span className="text-xs text-gray-500">{item.desc}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BudgetHeader;