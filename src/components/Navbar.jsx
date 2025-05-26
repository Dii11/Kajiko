import { Bell, NotebookIcon, Search } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ProfileHeadrer from '../modules/profil/ProfileHeadrer';
import BudgetHeader from '../modules/budget/BudgetHeader';
import CategoriesHeader from '../modules/categories/CategoriesHeader';
import TransactioHeader from '../modules/transaction/TransactioHeader';
import DashboardHeader from '../modules/Dashboard/DashboardHeader';
import ReportHeader from '../modules/ReportHeader';
import img from '../assets/logo.webp'
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fonction pour choisir le header selon le chemin
  const renderHeader = () => {
    if (location.pathname.startsWith('/home/transactions')) {
      return <TransactioHeader />;
    }
    if (location.pathname.startsWith('/home/budget')) {
      return <BudgetHeader />;
    }
    if (location.pathname.startsWith('/home/categories')) {
      return <CategoriesHeader />;
    }
    if (location.pathname.startsWith('/home/profile')) {
      return <ProfileHeadrer />;
    }
    if (location.pathname.startsWith('/home/reports')) {
      return <ReportHeader />;
    }
    // Par défaut, dashboard
    return <DashboardHeader />;
  };

  // Changement de thème avec choix explicite
  const handleThemeChange = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'night') {
      document.documentElement.setAttribute('data-theme', 'fantasy');
    } else {
      document.documentElement.setAttribute('data-theme', 'night');
    }
  };

  // Déconnexion (à adapter selon ta logique)
  const handleLogout = () => {
    // ...logique de déconnexion (clear token, etc)...
    navigate('/login');
  };

  return (
    <div className="bg-slate-900 shadow-lg m-4 p-4 rounded-3xl ">
      <section className="flex justify-between rounded-lg m-4 p-5 text-secondary">
<img src={img} alt='logo' width={100}/>
        <div className="hidden md:block nav flex gap-10">
          <NavLink
            to="/home/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'border-b-4 border-primary bg-base-200 text-primary'
                  : 'hover:bg-base-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/home/transactions"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'border-b-4 border-primary bg-base-200 text-primary'
                  : 'hover:bg-base-100'
              }`
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to="/home/budget"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'border-b-4 border-primary bg-base-200 text-primary'
                  : 'hover:bg-base-100'
              }`
            }
          >
            Budget
          </NavLink>
          <NavLink
            to="/home/categories"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'border-b-4 border-primary bg-base-200 text-primary'
                  : 'hover:bg-base-100'
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/home/profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'border-b-4 border-primary bg-base-200 text-primary'
                  : 'hover:bg-base-100'
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/home/reports"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'border-b-4 border-primary bg-base-200 text-primary'
                  : 'hover:bg-base-100'
              }`
            }
          >
            Reports
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden md:block rounded-full border-accent ">
            <Search />
          </div>
          <div className="rounded-full border-accent ">
            <Bell />
          </div>
          {/* Avatar avec sous-menu */}
          <div className="relative" ref={menuRef}>
            <div
              className="avatar avatar-online avatar-placeholder cursor-pointer"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <div className="bg-slate-600 text-neutral-content w-10 rounded-full flex items-center justify-center">
                <span className="text-xl">AI</span>
              </div>
            </div>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-lg z-50 py-2">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-base-200"
                  onClick={() => { setMenuOpen(false); navigate('/home/profile'); }}
                >
                  Informations personnelles
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-base-200"
                  onClick={handleThemeChange}
                >
                  {document.documentElement.getAttribute('data-theme') === 'night'
                    ? 'Mode clair'
                    : 'Mode sombre'}
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-base-200 text-error"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mt-10">{renderHeader()}</section>
    </div>
  );
};

export default Navbar;