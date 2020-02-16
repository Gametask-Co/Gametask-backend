import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

import dotenv from 'dotenv';
dotenv.config();

class App {
    constructor() {
        this.server = express();

        this.database();
        this.middlewares();
        this.routes();
    }

    database() {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
