import './bootstrap';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

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
            mongoose
                .connect(process.env.DB_CONNECTION, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                .then(() => {
                    console.log('Successfully connected with database...');
                })
                .catch(err => {
                    console.error(`Mongoose connection error: ${err}`);
                    process.exit(1);
                });
        }
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors({
            origin: process.env.FRONT_URL,
            optionsSucessStatus: 200
        }));
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
