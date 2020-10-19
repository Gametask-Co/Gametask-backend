import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import './database';

import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333!!');
});

export default app;
