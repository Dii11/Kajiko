import { Bell, NotebookIcon, Search } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileHeadrer from '../modules/profil/ProfileHeadrer';

const Navbar = () => {
  return (
    <div className="bg-slate-900 shadow-lg m-4 p-4 rounded-3xl">
      <section className="flex justify-between rounded-lg m-4 p-5 text-secondary">
        <div>Logo</div>
        <div className="nav flex gap-10">
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
          <div className="rounded-full border-accent ">
            <Search />
          </div>
          <div className="rounded-full ">
            <Search />
          </div>
          <div className="rounded-full border-accent ">
            <Bell />
          </div>
          <div className="avatar avatar-online avatar-placeholder">
            <div className="bg-slate-600 text-neutral-content w-10 rounded-full">
              <span className="text-xl">AI</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <ProfileHeadrer />
      </section>
    </div>
  );
};

export default Navbar;