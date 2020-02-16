import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProjectController from './app/controllers/ProjectController';

import authMiddleware from './app/middlewares/auth';
import soon from './views';

const routes = new Router();

// ROTA DE USUARIOS

// GET
routes.get('/user/', authMiddleware, UserController.index);

// POST
routes.post('/user/', UserController.store);
routes.post('/user/auth', authMiddleware, UserController.auth);

// PUT
routes.put('/user/', UserController.update);

// rota de teste (exemplo de como usar middle de autenticacao)
routes.get('/project', authMiddleware, ProjectController.test);

// rota principal ( Em breve )
routes.get('/', (req, res) => {
    res.send(soon)
});

export default routes;