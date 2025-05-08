import { Request, Response } from 'express';
import { findCheapestPath } from './paymentService';

function getCheapestPath(req: Request, res: Response): void {
  const { start, end, currency } = req.query;
  const result = findCheapestPath(start as string, end as string, currency as 'EUR' | 'USD');

  res.json({
    path: result.path?.join(' -> ') || null,
    cost: result.cost,
    currency: currency,
  });
}

export { getCheapestPath };
