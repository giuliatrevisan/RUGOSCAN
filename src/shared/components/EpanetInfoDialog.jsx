
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function EpanetInfoDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Sobre o EPANET
        <IconButton
  aria-label="close"
  onClick={onClose}
  sx={{
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
  }}
>
  <HighlightOffIcon />
</IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>
          O EPANET é um software gratuito desenvolvido pela EPA (Agência de Proteção Ambiental dos EUA) 
          que permite simular o comportamento hidráulico e a qualidade da água em redes de distribuição pressurizadas. 
          Ele é amplamente utilizado por engenheiros e pesquisadores na modelagem de sistemas de abastecimento.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          href="https://www.epa.gov/water-research/epanet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Baixar EPANET
        </Button>
        <Button onClick={onClose} color="secondary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
