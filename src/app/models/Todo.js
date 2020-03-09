import { model } from 'mongoose';
import TodoSchema from '../schemas/TodoSchema';

export default model('Todo', TodoSchema);
