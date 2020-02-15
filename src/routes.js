import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// ROTA DE USUARIOS

routes.post('/sessions', UserController.store);
routes.post('/auth', UserController.auth);

// rota de teste (exemplo de como usar middle de autenticacao)

routes.get('/project', authMiddleware, ProjectController.test);

export default routes;
