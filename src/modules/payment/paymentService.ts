import { pathFinderAlgorithm } from '@/shared/utils/pathFindingAlgorithm';
import { createBankNetwork } from '../../shared/utils/bankNetwork';

function findCheapestPath(start: string, end: string, currency: 'EUR' | 'USD') {
  const graph = createBankNetwork();
  return pathFinderAlgorithm(graph, start, end, currency);
}

export { findCheapestPath };
