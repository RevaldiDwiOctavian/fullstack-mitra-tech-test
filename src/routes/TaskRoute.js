import express from 'express';
import * as taskController from '../controllers/TaskController.js'

const router = express.Router();


router.post('/tasks', taskController.createTask);
router.get('/tasks/:taskId', taskController.getTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

export default router;