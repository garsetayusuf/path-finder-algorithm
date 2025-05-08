import { getCheapestPath } from '@/modules/payment/paymentController';
import express from 'express';

const paymentRoutes = express.Router();

paymentRoutes.get('/cheapest-path', getCheapestPath);

export default paymentRoutes;
