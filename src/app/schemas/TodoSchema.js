import { Schema, Mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';

const TodoSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
    },

    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
});

export default TodoSchema;
