import './boostrap';

import express from 'express';
import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

import routes from './routes';

class App {
    constructor() {
        this.server = express();

        this.database();
        this.middlewares();
        this.routes();
    }

    async database() {
        if (process.env.NODE_ENV == 'test') {
            const mongod = new MongoMemoryServer();
            const uri = await mongod.getUri();
            mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } else {
            mongoose.connect(process.env.DB_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
