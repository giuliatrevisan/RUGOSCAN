import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Paper, Button,
} from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#1976d2', '#0288d1', '#00acc1', '#26c6da', '#80deea'];

export default function EpanetDashboard() {
  const [reportData, setReportData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const parsedData = parseInpFile(content);
      setReportData(parsedData);
    };
    reader.readAsText(file);
  };

  const parseInpFile = (content) => {
    const lines = content.split(/\r?\n/);
    const pipes = [];
    const junctionPressures = {};
    const demands = {};
    let currentSection = '';

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith(';')) continue;

      if (line.startsWith('[')) {
        currentSection = line.toUpperCase();
        continue;
      }

      const parts = line.split(/\s+/);

      if (currentSection === '[PIPES]') {
        const [id, node1, node2, length, diameter, roughness] = parts;
        pipes.push({
          id,
          node1,
          node2,
          length: parseFloat(length),
          diameter: parseFloat(diameter),
          roughness: parseFloat(roughness),
          flow: 0,
          pressure: 0
        });
      }

      if (currentSection === '[DEMANDS]') {
        const [nodeId, demand] = parts;
        demands[nodeId] = (demands[nodeId] || 0) + parseFloat(demand);
      }

      if (currentSection === '[JUNCTIONS]') {
        const [nodeId, _, elevation] = parts;
        junctionPressures[nodeId] = parseFloat(elevation);
      }
    }

    for (const pipe of pipes) {
      const flow1 = demands[pipe.node1] || 0;
      const flow2 = demands[pipe.node2] || 0;
      pipe.flow = (flow1 + flow2) / 2;

      const pres1 = junctionPressures[pipe.node1] || 0;
      const pres2 = junctionPressures[pipe.node2] || 0;
      pipe.pressure = (pres1 + pres2) / 2;
    }

    return pipes;
  };

  if (reportData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          📂 Nenhum dado disponível. Carregue um arquivo .INP primeiro.
        </Typography>
        <Button variant="contained" component="label">
          Upload .INP
          <input hidden type="file" accept=".inp" onChange={handleFileUpload} />
        </Button>
      </Box>
    );
  }

  const totalLength = reportData.reduce((acc, r) => acc + r.length, 0);
  const avgDiameter = reportData.reduce((acc, r) => acc + r.diameter, 0) / reportData.length;
  const avgRoughness = reportData.reduce((acc, r) => acc + r.roughness, 0) / reportData.length;
  const avgFlow = reportData.reduce((acc, r) => acc + r.flow, 0) / reportData.length;
  const avgPressure = reportData.reduce((acc, r) => acc + r.pressure, 0) / reportData.length;

  // Novo agrupamento por diâmetro real
  const diameterMap = {};
  reportData.forEach(pipe => {
    const dia = pipe.diameter;
    diameterMap[dia] = (diameterMap[dia] || 0) + 1;
  });

  const diameterDistribution = Object.entries(diameterMap).map(([diameter, count]) => ({
    label: `${diameter} mm`,
    value: count
  }));

  return (
    <Box sx={{ p: 5, width: '100vw', boxSizing: 'border-box' }}>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Button variant="outlined" component="label">
          Trocar arquivo
          <input hidden type="file" accept=".inp" onChange={handleFileUpload} />
        </Button>
      </Box>
  
      <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
        📊 EPANET - Dashboard da Rede Hidráulica
      </Typography>
  
      <Grid container spacing={2} mb={4} justifyContent="center" alignItems="stretch">
        {[
          { label: 'Comprimento Total ', value: totalLength.toFixed(2) },
          { label: 'Diâmetro Médio ', value: avgDiameter.toFixed(2) },
          { label: 'Rugosidade Média', value: avgRoughness.toFixed(2) },
          { label: 'Vazão Média ', value: avgFlow.toFixed(2) },
          { label: 'Pressão Média ', value: avgPressure.toFixed(2) }
        ].map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={2.4}
            key={index}
            sx={{ display: 'flex' }}
          >
            <Card sx={{ boxShadow: 3, flexGrow: 1 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="h6" color="primary.dark">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
  
      <Grid container spacing={5} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 5, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              📏 Comprimento por Tubo
            </Typography>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={reportData.slice(0, 10)}>
                <XAxis dataKey="id" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="length" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
  
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 5, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              🔘 Distribuição de Diâmetro (valores reais)
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
              <ResponsiveContainer width="100%" height={360}>
                <PieChart>
                  <Pie
                    data={diameterDistribution}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
             
                  >
                    {diameterDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} tubos`} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
  
}
