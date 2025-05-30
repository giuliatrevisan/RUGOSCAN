import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Button, IconButton } from '@mui/material';
import LogoutDialog from './LogoutDialog';

export default function Navbar({ onMenuToggle, isSidebarOpen, onLogout }) {
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
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </nav>

      <LogoutDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false);
          onLogout?.();
        }}
      />
    </>
  );
}