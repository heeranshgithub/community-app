import express from 'express';
import 'express-async-errors';
import treeRouter from './routes/treeRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectToDB from './db/connectToDB.js';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import morgan from 'morgan';

import authenticateUser from './middlewares/auth.js';

const app = express();
dotenv.config();

app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tree', authenticateUser, treeRouter);
app.use('/api/v1/user', userRouter);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectToDB(process.env.MONGODB_URI);
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
