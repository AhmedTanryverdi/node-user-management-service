        import express from 'express';
        import {authenticate} from "../middleware/authMiddleware";
        import { getUsersController,
                registerUserController,
                loginUserController,
                blockUserController,
                getUserByIdController } from "../controllers/userController";

        const router: express.Router = express.Router();

        router.post('/api/register', registerUserController);

        router.post('/api/login', loginUserController);

        router.get('/api/users', authenticate, getUsersController);

        router.post('/api/users/:id', authenticate, getUserByIdController);

        router.post('/api/users/:id/block', authenticate, blockUserController);

        export default router;