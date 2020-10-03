import { Router } from 'express';

const routes = Router();

routes.post('/users', (request, response) => {
  return response.json({ message: 'teste' });
});

export default routes;
