import { Router } from 'express';

import UserController from './app/controllers/UserController';
import FriendshipController from './app/controllers/FriendshipController';
import ProjectController from './app/controllers/ProjectController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// USER ROUTES

// GET
routes.get('/user/', authMiddleware, UserController.index);

// POST
routes.post('/user/', UserController.store);
routes.post('/user/auth', UserController.auth);

// PUT
routes.put('/user/', authMiddleware, UserController.update);

// DELETE
routes.delete('/user/', authMiddleware, UserController.delete);

// FRIENDSHIP ROUTES

// POST
routes.post('/friend/', authMiddleware, FriendshipController.store);

// DELETE
routes.post('/friend/delete', authMiddleware, FriendshipController.delete);

// ROTA DE PROJECT (TEST)

// rota de teste (exemplo de como usar middle de autenticacao)
routes.get('/project', authMiddleware, ProjectController.test);

// rota principal ( Em breve )
routes.get('/', function(req, res) {
    res.sendFile('views/index.html', { root: __dirname });
});

export default routes;
