import { Router } from "express";
import * as userController from '../controllers/user-controller.js'

const router = Router();

router.post('/users', userController.post);

export default router;