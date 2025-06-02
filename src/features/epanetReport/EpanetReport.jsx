import { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';
import { processINPFile } from './epanetUtils';
import jsPDF from 'jspdf';

export default function EpanetReport() {
  const [fileContent, setFileContent] = useState('');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      setFileContent(content);

      const result = await processINPFile(content);
      setReportData(result);
      setError('');
    } catch (err) {
      setError(`❌ Erro ao processar o arquivo .INP:\n\n${err.message}`);
      setReportData([]);
    }
  };

  const generatePDF = () => {
    if (reportData.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório da Rede Hidráulica - EPANET', 14, 20);

    doc.setFontSize(12);
    const headers = ['ID', 'Comprimento', 'Diâmetro', 'Rugosidade', 'Vazão', 'Pressão'];

    // Montar os dados da tabela para o jsPDF
    const rows = reportData.map(row => [
      row.id,
      row.length.toFixed(2),
      row.diameter.toFixed(2),
      row.roughness.toFixed(2),
      row.flow.toFixed(2),
      row.pressure.toFixed(2)
    ]);

    // Usar autoTable (plugin do jsPDF) para gerar a tabela
    // Se você ainda não tiver o plugin instalado:
    // npm install jspdf jspdf-autotable
    // e importar import 'jspdf-autotable';
    // Mas aqui vai um exemplo básico de texto em tabela (sem autotable):

    let startY = 30;
    const lineHeight = 10;

    // Cabeçalho
    headers.forEach((header, i) => {
      doc.text(header, 14 + i * 30, startY);
    });

    // Dados
    rows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        doc.text(String(cell), 14 + cellIndex * 30, startY + (rowIndex + 1) * lineHeight);
      });
    });

    doc.save('relatorio-epanet.pdf');
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        🧪 EPANET - Relatório da Rede Hidráulica
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <label htmlFor="inpFile">
          <Box
            component="span"
            sx={{
              px: 3,
              py: 1,
              bgcolor: 'primary.main',
              color: '#fff',
              borderRadius: 2,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Selecionar Arquivo .INP
          </Box>
        </label>
        <input
          id="inpFile"
          type="file"
          accept=".inp"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Box>

      {error ? (
        <Paper sx={{ p: 2, bgcolor: '#ffe6e6', color: '#b91c1c', border: '1px solid #f87171' }}>
          <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
            {error}
          </Typography>
        </Paper>
      ) : reportData.length > 0 ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={generatePDF}
            sx={{ mb: 2 }}
          >
            📄 Baixar Relatório em PDF
          </Button>

          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Comprimento</strong></TableCell>
                  <TableCell><strong>Diâmetro</strong></TableCell>
                  <TableCell><strong>Rugosidade</strong></TableCell>
                  <TableCell><strong>Vazão</strong></TableCell>
                  <TableCell><strong>Pressão</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                      '&:hover': { backgroundColor: '#e0f2fe' }
                    }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.length.toFixed(2)}</TableCell>
                    <TableCell>{row.diameter.toFixed(2)}</TableCell>
                    <TableCell>{row.roughness.toFixed(2)}</TableCell>
                    <TableCell>{row.flow.toFixed(2)}</TableCell>
                    <TableCell>{row.pressure.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography align="center" sx={{ mt: 2 }}>📂 Nenhum arquivo carregado ainda.</Typography>
      )}
    </Box>
  );
}
