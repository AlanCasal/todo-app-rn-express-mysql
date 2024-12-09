import express, { Response } from 'express';
import {
	createTodoController,
	deleteTodoController,
	getTodosController,
	updateTodoController,
} from '../controllers/todo';
import { requireAuth } from '../middlewares';
import { ERROR_MESSAGES } from '../utils';
import { AuthenticatedRequest } from '../utils/types';

const router = express.Router();

const asyncHandler = (
	fn: (
		req: AuthenticatedRequest,
		res: Response,
		next: express.NextFunction
	) => Promise<void | Response>
) => {
	return (req: express.Request, res: Response, next: express.NextFunction) => {
		Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);
	};
};

const validateTodoInput = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const { title } = req.body;

	if (!title || typeof title !== 'string' || title.trim().length === 0) {
		res.status(400).json({ message: ERROR_MESSAGES.VALID_TITLE_IS_REQUIRED });
		return;
	}
	next();
};

router.get('/todos', requireAuth, asyncHandler(getTodosController));

router.post(
	'/todos',
	requireAuth,
	validateTodoInput,
	asyncHandler(createTodoController)
);

router.delete('/todos/:id', requireAuth, asyncHandler(deleteTodoController));

router.put('/todos/:id', requireAuth, asyncHandler(updateTodoController));

export default router;
