import Graph from '@/modules/payment/graphModel';

type PathResult = {
  path: string[] | null;
  cost: number;
};

function pathFinderAlgorithm(graph: Graph, start: string, end: string, currency: 'EUR' | 'USD'): PathResult {
  // Convert Set to array for easier manipulation
  const nodes = Array.from(graph.nodes);

  // Initialize distances with infinity for all nodes except start
  const distances: { [key: string]: number } = {};
  nodes.forEach((node) => {
    distances[node] = Infinity;
  });
  distances[start] = 0;

  // Initialize previous nodes dict for path reconstruction
  const previous: { [key: string]: string | null } = {};
  nodes.forEach((node) => {
    previous[node] = null;
  });

  // Set of unvisited nodes
  const unvisited = new Set(nodes);

  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current: string | null = null;
    let smallestDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        current = node;
      }
    }

    // If we've reached the end or if the smallest distance is infinity, stop
    if (current === end || smallestDistance === Infinity) {
      break;
    }

    // Remove the current node from unvisited
    unvisited.delete(current!);

    // Check all neighbors of the current node
    for (const neighbor of graph.edges[current!] || []) {
      // Calculate new distance to neighbor
      const cost = graph.getCost(current!, neighbor, currency);
      const distance = distances[current!] + cost;

      // Update if this path is better
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
      }
    }
  }

  // Reconstruct the path
  const path: string[] = [];
  let current: string | null = end;
  const totalCost = distances[end]; // This holds the total cost of the path

  // If end is unreachable
  if (distances[end] === Infinity) {
    return { path: null, cost: Infinity };
  }

  // Reconstruct the path from end to start (in reverse)
  while (current) {
    path.push(current);
    current = previous[current];
  }

  // Reverse to get path from start to end
  path.reverse();

  return { path, cost: totalCost };
}

export { pathFinderAlgorithm };
