import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export default function LogoutDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deseja sair?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja encerrar a sessão?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
}