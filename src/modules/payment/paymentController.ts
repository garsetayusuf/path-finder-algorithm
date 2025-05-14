import { Request, Response } from 'express';
import { findCheapestPath } from './paymentService';

function getCheapestPath(req: Request, res: Response): void {
  const { start, end, currency } = req.query;

  if (typeof start !== 'string' || typeof end !== 'string' || (currency !== 'EUR' && currency !== 'USD')) {
    res.status(400).json({ message: 'Missing or invalid query parameters.' });
    return;
  }

  const result = findCheapestPath(start as string, end as string, currency as 'EUR' | 'USD');

  res.json({
    path: result.path?.join(' -> ') || null,
    cost: result.cost,
    currency: currency,
  });
}

export { getCheapestPath };
