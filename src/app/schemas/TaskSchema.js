import { Schema, Mongoose } from 'mongoose';

const TaskSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date
    },
    // subject_id: {

    // },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default TaskSchema;
