import Graph from '@/modules/payment/graphModel';
import { findCheapestPath } from '@/modules/payment/paymentService';

describe('Payment Service', () => {
  it('should find the cheapest path', () => {
    const graph = new Graph();
    // Add nodes and edges to the graph for testing
    graph.addEdge('Client', 'BNP', 0, 0);
    graph.addEdge('BNP', 'SMBC', 10, 5);
    graph.addEdge('SMBC', 'DEUT', 6, 22);

    // Mock the createBankNetwork function to return the test graph
    jest.spyOn(require('../../src/shared/utils/bankNetwork'), 'createBankNetwork').mockReturnValue(graph);

    const result = findCheapestPath('Client', 'DEUT', 'EUR');

    expect(result.path).toEqual(['Client', 'BNP', 'SMBC', 'DEUT']);
    expect(result.cost).toBe(16); // 0 (Client-BNP) + 10 (BNP-SMBC) + 6 (SMBC-DEUT)
  });

  it('should return no path if no path exists', () => {
    const graph = new Graph();
    // Add nodes and edges to the graph for testing
    graph.addEdge('Client', 'BNP', 0, 0);
    graph.addEdge('ING', 'KBC', 8, 5);

    // Mock the createBankNetwork function to return the test graph
    jest.spyOn(require('../../src/shared/utils/bankNetwork'), 'createBankNetwork').mockReturnValue(graph);

    const result = findCheapestPath('Client', 'KBC', 'EUR');

    expect(result.path).toBeNull();
    expect(result.cost).toBe(Infinity);
  });
});
