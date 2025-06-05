import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Info, BookOpen, BarChart2 } from 'lucide-react'; // Adiciona BarChart2 para Dashboards
import EpanetInfoDialog from './EpanetInfoDialog';

export default function Sidebar({ isOpen }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const items = [
    { label: 'Relatório', path: '/', icon: <LayoutDashboard size={18} /> },
    { label: 'Tutorial', path: '/tutorial', icon: <BookOpen size={18} /> },
    { label: 'Dashboards', path: '/dashboards', icon: <BarChart2 size={18} /> }, // Ícone diferente aqui
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white text-gray-800 p-6 shadow-lg border-r
        transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h1 className="text-2xl font-bold mb-8 tracking-wide">RUGOSCAN</h1>
        <ul className="space-y-4 mb-8">
          {items.map(({ label, path, icon }) => (
            <li key={label}>
              <Link
                to={path}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-transparent hover:border-indigo-500 hover:bg-gray-50 hover:shadow transition-all"
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md border border-transparent text-left text-blue-600 hover:border-blue-400 hover:bg-blue-50 hover:shadow transition-all"
        >
          <Info size={18} />
          <span>Sobre o EPANET</span>
        </button>
      </aside>

      <EpanetInfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
