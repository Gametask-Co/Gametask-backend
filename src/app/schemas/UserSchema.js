import { Schema, Mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    birthday: {
        type: Date,
        require: true
    },

    password_hash: {
        type: String,
        required: true,
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    friend_list: [
        {
            friend_id: String
        }
    ],

    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password_hash, 10);
    this.password_hash = hash;

    next();
});

export default UserSchema;
