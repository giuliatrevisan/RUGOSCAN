import { Workspace, Project, CountType, LinkProperty, NodeProperty } from 'epanet-js';



export async function processINPFile(inpText) {
  const workspace = new Workspace();
  await workspace.loadModule();

  const project = new Project(workspace);
  await workspace.writeFile('network.inp', inpText);

  await project.open('network.inp', 'report.rpt', 'output.out');
  await project.solveH();

  const numLinks = await project.getCount(CountType.LinkCount);
  const results = [];

  for (let i = 1; i <= numLinks; i++) {
    const id = await project.getLinkId(i);
    const nodes = await project.getLinkNodes(i);
    const length = await project.getLinkValue(i, LinkProperty.Length);
    const diameter = await project.getLinkValue(i, LinkProperty.Diameter);
    const roughness = await project.getLinkValue(i, LinkProperty.Roughness);
    const flow = await project.getLinkValue(i, LinkProperty.Flow);
    const pressure = await project.getNodeValue(nodes.node1, NodeProperty.Pressure);

    results.push({
      id,
      node1: nodes.node1,
      node2: nodes.node2,
      length,
      diameter,
      roughness,
      flow,
      pressure
    });
  }

  await project.close();
  return results; // ← retorna ARRAY DE OBJETOS
}
