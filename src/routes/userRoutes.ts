import express from 'express';
import {authenticate} from "../middleware/authMiddleware";
import { getUsersController,
        registerController,
        loginController,
        blockUserController,
        getUserByIdController } from "../controllers/userController";

const router: express.Router = express.Router();

router.post('/api/register', registerController);

router.post('/api/login', loginController);

router.get('/api/users', authenticate, getUsersController);

router.post('/api/users/:id', authenticate, getUserByIdController);

router.post('/api/users/:id/block', authenticate, blockUserController);

export default router;