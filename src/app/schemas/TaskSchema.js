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
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    // subject_id: {

    // },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    todo_list: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
});

export default TaskSchema;
