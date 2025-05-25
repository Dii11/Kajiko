// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, List, Filter, BarChart2, Wallet, User, ChevronLeft, Menu } from 'lucide-react';

const menuItems = [
  { path: '/home/', name: 'Dashboard', icon: <PieChart className="w-5 h-5" /> },
  { path: '/home/transactions', name: 'Transactions', icon: <List className="w-5 h-5" /> },
  { path: '/home/categories', name: 'Catégories', icon: <Filter className="w-5 h-5" /> },
  { path: '/home/reports', name: 'Rapports', icon: <BarChart2 className="w-5 h-5" /> },
  { path: '/home/budget', name: 'Budget', icon: <Wallet className="w-5 h-5" /> },
  { path: '/home/profile', name: 'Profil', icon: <User className="w-5 h-5" /> },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-80'} h-screen bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl relative overflow-hidden transition-all duration-300 ease-in-out`}>
      {/* Bouton de réduction/expansion */}
      <button
        className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition"
        onClick={() => setIsCollapsed((prev) => !prev)}
        aria-label={isCollapsed ? "Déplier le menu" : "Réduire le menu"}
      >
        {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Logo et titre */}
      <div className="px-6 mb-8 mt-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className={`text-lg font-semibold text-gray-900 transition-all duration-300 ${isCollapsed ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100'} overflow-hidden whitespace-nowrap`}>
            Kajiko
          </h1>
        </div>
      </div>

      {/* Section Menu */}
      <div className="px-6 mb-8">
        <div className={`text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 px-1 transition-all duration-300 ${isCollapsed ? 'opacity-0 scale-0 h-0' : 'opacity-100 scale-100 h-auto'} overflow-hidden`}>
          MENU
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/home/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:bg-gray-100/80'
                } ${isCollapsed ? 'justify-center' : ''}`
              }
              title={isCollapsed ? item.name : ''}
            >
              {({ isActive }) => (
                <>
                  <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <span className={`font-medium text-sm transition-all duration-300 ${isCollapsed ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100'} overflow-hidden whitespace-nowrap`}>
                    {item.name}
                  </span>
                  {isActive && !isCollapsed && (
                    <div className="absolute right-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                  {isActive && isCollapsed && (
                    <div className="absolute -right-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Section Activités - masquée quand collapsed */}
      {!isCollapsed && (
        <div className="px-6 transition-all duration-300 animate-in fade-in slide-in-from-right"
             style={{ animationDuration: '300ms', animationDelay: '150ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTIVITÉ RÉCENTE
            </div>
            <div className="flex gap-1">
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors">
                <ChevronLeft className="w-3 h-3 text-gray-600 rotate-180" />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors">
                <ChevronLeft className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                T
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">Transaction ajoutée</div>
                <div className="text-xs text-gray-500">Il y a 2 minutes</div>
              </div>
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                B
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">Budget mis à jour</div>
                <div className="text-xs text-gray-500">Il y a 1 heure</div>
              </div>
              <div className="text-xs text-gray-400">•••</div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                R
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">Rapport généré</div>
                <div className="text-xs text-gray-500">Il y a 3 heures</div>
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                C
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">Catégorie créée</div>
                <div className="text-xs text-gray-500">Hier</div>
              </div>
            </div>
          </div>

          {/* Bouton Voir toutes les activités */}
          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span className="text-sm">Voir toutes les activités</span>
          </button>
        </div>
      )}

      {/* Mode collapsed - indicateurs d'activité simplifiés */}
      {isCollapsed && (
        <div className="px-4 mt-8 space-y-4">
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              4
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Nouvelles</div>
          </div>
        </div>
      )}

      {/* Effet de fond décoratif */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
    </div>
  );
};

export default Sidebar;