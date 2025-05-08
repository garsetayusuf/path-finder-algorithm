import express from 'express';
import paymentRoutes from './paymentRoutes';

const router = express.Router();

router.use('/payment', paymentRoutes);

export default router;
