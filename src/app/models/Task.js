import { model } from 'mongoose';
import TaskSchema from '../schemas/TaskSchema';

export default model('Task', TaskSchema);
