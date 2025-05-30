import { Project } from 'epanet-js';

export async function processINPFile(inpContent) {
  const project = new Project();

  try {
    await project.open();
    await project.loadInput(inpContent);

    const report = await project.runReport(); // Isso gera o texto do relatório EPANET
    await project.close();

    return report;
  } catch (error) {
    throw new Error('Erro ao rodar a simulação EPANET: ' + error.message);
  }
}
