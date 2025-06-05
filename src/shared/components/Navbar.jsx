import React, { useState } from 'react';
import { Menu, Info } from 'lucide-react';  // Troquei o ícone LogOut por Info
import { Button, IconButton } from '@mui/material';
import EpanetInfoDialog from './EpanetInfoDialog';  // Importa o diálogo igual no Sidebar

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow w-full">
        {!isSidebarOpen && (
          <IconButton onClick={onMenuToggle} className="text-gray-800">
            <Menu />
          </IconButton>
        )}

        <div className="flex-1" />

        <Button
          variant="text"
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 text-gray-800"
        >
          <Info className="h-4 w-4" />
          Sobre o EPANET
        </Button>
      </nav>

      <EpanetInfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
