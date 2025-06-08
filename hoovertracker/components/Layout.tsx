import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { CalendarDaysIcon, HeartIcon, BookOpenIcon, Cog6ToothIcon, HomeIcon } from './Icons'; 

interface LayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 ease-in-out
      ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'}`
    }
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </NavLink>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <header className="bg-slate-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-orange-500 text-center">{APP_NAME}</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6 mb-20 sm:mb-4"> {/* Added mb for bottom nav space */}
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 shadow-lg z-50">
        <div className="container mx-auto flex justify-around items-center h-16 px-2">
          <NavItem to="/" icon={<HomeIcon className="w-6 h-6" />} label="Home" />
          <NavItem to="/tracker" icon={<CalendarDaysIcon className="w-6 h-6" />} label="Tracker" />
          <NavItem to="/decoder" icon={<HeartIcon className="w-6 h-6" />} label="Decoder" />
          <NavItem to="/journal" icon={<BookOpenIcon className="w-6 h-6" />} label="Journal" />
          <NavItem to="/settings" icon={<Cog6ToothIcon className="w-6 h-6" />} label="Settings" />
        </div>
      </nav>
    </div>
  );
};