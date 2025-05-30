// src/App.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './shared/components/Sidebar';
import Navbar from './shared/components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    console.log('Logout confirmado');
    // Aqui você pode redirecionar, limpar auth, etc.
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onLogout={handleLogout} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeSidebar}
        />
      )}
      <div className="relative z-30">
        <Navbar
          onMenuToggle={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          onLogout={handleLogout}
        />
        <main className="p-4">
            <AppRoutes />
          </main>
      </div>
    </div>
  );
}
