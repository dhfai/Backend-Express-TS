import express from 'express';
import cors from 'cors';
import { publicApiRouter } from '../routes/api.routes';
import { errorMiddleware } from '../middleware/error-middleware';
import { privateRouter } from '../routes/private.routes';

export const web = express();
web.use(express.json());
web.use(cors());
web.use(errorMiddleware);
web.use(publicApiRouter);
web.use(privateRouter);