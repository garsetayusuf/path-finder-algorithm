import express from 'express';
import { errorHandler } from './shared/middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router from './routes';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
