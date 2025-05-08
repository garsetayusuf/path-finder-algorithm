type Currency = 'EUR' | 'USD';

interface EdgeCosts {
  EUR: number;
  USD: number;
}

class Graph {
  nodes: Set<string>;
  edges: { [key: string]: string[] };
  currencies: { [key: string]: EdgeCosts };

  constructor() {
    this.nodes = new Set();
    this.edges = {};
    this.currencies = {};
  }

  addNode(node: string): void {
    this.nodes.add(node);
    if (!this.edges[node]) {
      this.edges[node] = [];
    }
  }

  addEdge(fromNode: string, toNode: string, costEUR: number, costUSD: number): void {
    this.addNode(fromNode);
    this.addNode(toNode);
    this.edges[fromNode].push(toNode);

    const edgeKey1 = `${fromNode}-${toNode}`;
    const edgeKey2 = `${toNode}-${fromNode}`;

    this.currencies[edgeKey1] = { EUR: costEUR, USD: costUSD };
    this.currencies[edgeKey2] = { EUR: costEUR, USD: costUSD };
  }

  getCost(fromNode: string, toNode: string, currency: Currency): number {
    const edgeKey = `${fromNode}-${toNode}`;
    if (this.currencies[edgeKey]) {
      return this.currencies[edgeKey][currency];
    }
    return Infinity;
  }
}

export default Graph;
