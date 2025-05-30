import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { processINPFile } from './epanetUtils';

export default function EpanetReport() {
  const [fileContent, setFileContent] = useState('');
  const [report, setReport] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const content = await file.text();
    setFileContent(content);

    try {
      const generatedReport = await processINPFile(content);
      setReport(generatedReport);
    } catch (error) {
      setReport(`Erro ao processar: ${error.message}`);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Análise de Arquivo .INP
      </Typography>

      <input type="file" accept=".inp" onChange={handleFileChange} />
      <Button variant="contained" sx={{ mt: 2 }}>
        Processar
      </Button>

      {report && (
        <pre style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{report}</pre>
      )}
    </div>
  );
}
