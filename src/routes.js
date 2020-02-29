import { Router } from 'express';

import UserController from './app/controllers/UserController';
import FriendshipController from './app/controllers/FriendshipController';
import TaskController from './app/controllers/TaskController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// -------- USER ROUTES --------

// GET
routes.get('/user/', authMiddleware, UserController.index);

// POST
routes.post('/user/', UserController.store);
routes.post('/user/auth/', UserController.auth);

// PUT
routes.put('/user/', authMiddleware, UserController.update);

// DELETE
routes.delete('/user/', authMiddleware, UserController.delete);

// -------- FRIENDSHIP ROUTES --------

// GET
routes.get('/friend/', authMiddleware, FriendshipController.index);

// POST
routes.post('/friend/', authMiddleware, FriendshipController.store);

// DELETE
routes.delete('/friend/', authMiddleware, FriendshipController.delete);

// -------- TASK ROUTES --------

// GET
routes.get('/task/', authMiddleware, TaskController.index);

// POST
routes.post('/task/', authMiddleware, TaskController.store);

// DELETE
routes.delete('/task/', authMiddleware, TaskController.delete);

// rota principal ( Em breve )
routes.get('/', function(req, res) {
    res.sendFile('views/index.html', { root: __dirname });
});

export default routes;
