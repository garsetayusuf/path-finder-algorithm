import request from 'supertest';
import express from 'express';
import { getCheapestPath } from '@/modules/payment/paymentController';
import { findCheapestPath } from '@/modules/payment/paymentService';

jest.mock('@/modules/payment/paymentService');

const app = express();
app.get('/cheapest-path', getCheapestPath);

describe('Payment Controller', () => {
  it('should return the cheapest path', async () => {
    const result = ['Client', 'BNP', 'SMBC', 'DEUT'];
    const cost = 16;
    const mockResult = { path: result, cost: cost, currency: 'EUR' };
    (findCheapestPath as jest.Mock).mockReturnValue(mockResult);

    const response = await request(app).get('/cheapest-path').query({ start: 'Client', end: 'DEUT', currency: 'EUR' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      path: result.join(' -> '),
      cost: cost,
      currency: 'EUR',
    });
  });

  it('should return no path if no path exists', async () => {
    const mockResult = { path: null, cost: Infinity, currency: 'EUR' };
    (findCheapestPath as jest.Mock).mockReturnValue(mockResult);

    const response = await request(app).get('/cheapest-path').query({ start: 'Client', end: 'KBC', currency: 'EUR' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      path: null,
      cost: null,
      currency: 'EUR',
    });
  });
});
