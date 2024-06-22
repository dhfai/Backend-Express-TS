import express from 'express';
import { AuthController } from '../controller/AuthController';

export const publicApiRouter = express.Router();


publicApiRouter.post('/api/register', AuthController.register);
publicApiRouter.post('/api/login', AuthController.login);
