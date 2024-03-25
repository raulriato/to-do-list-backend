import { Router } from "express";
import * as taskController from '../controllers/task-controller.js'

const router = Router();

router.post('/tasks', taskController.post);

export default router;