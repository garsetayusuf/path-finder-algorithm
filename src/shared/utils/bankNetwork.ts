import Graph from '@/modules/payment/graphModel';

function createBankNetwork(): Graph {
  const graph = new Graph();

  // Add all banks (nodes)
  const banks = ['Client', 'BNP', 'ING', 'Lloyds', 'SMBC', 'KBC', 'DEUT', 'CITI', 'HSBC', 'BOFA'];
  banks.forEach((bank) => {
    graph.addNode(bank);
  });

  // Define bank fees
  const bankFees: { [key: string]: [number, number] } = {
    BNP: [10, 5], // [EUR, USD]
    ING: [8, 5],
    Lloyds: [12, 4],
    SMBC: [6, 22],
    KBC: [7, 14],
    DEUT: [11, 2],
    CITI: [5, 6],
    HSBC: [9, 4],
    BOFA: [9, 3],
  };

  // Add connections from the diagram (edges)
  const connections = [
    ['Client', 'BNP'],
    ['Client', 'ING'],
    ['BNP', 'SMBC'],
    ['BNP', 'Lloyds'],
    ['ING', 'KBC'],
    ['Lloyds', 'SMBC'],
    ['SMBC', 'DEUT'],
    ['KBC', 'DEUT'],
    ['DEUT', 'CITI'],
    ['CITI', 'BOFA'],
    ['BOFA', 'HSBC'],
    ['BOFA', 'KBC'],
    ['SMBC', 'BOFA'],
  ];

  // Add edges with their respective costs
  connections.forEach(([fromBank, toBank]) => {
    // Add costs only if both banks are not the client
    if (fromBank === 'Client' || toBank === 'Client') {
      // No fees for direct client connections
      graph.addEdge(fromBank, toBank, 0, 0);
    } else {
      // Add fees for both banks
      const [fromFeeEUR, fromFeeUSD] = bankFees[fromBank] || [0, 0];
      const [toFeeEUR, toFeeUSD] = bankFees[toBank] || [0, 0];

      // Total cost for this edge is the sum of both banks' fees
      const totalEUR = fromFeeEUR + toFeeEUR;
      const totalUSD = fromFeeUSD + toFeeUSD;

      graph.addEdge(fromBank, toBank, totalEUR, totalUSD);
    }
  });

  return graph;
}

export { createBankNetwork };
