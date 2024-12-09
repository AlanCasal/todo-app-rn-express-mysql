import { Response } from 'express';
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from '../database/repositories/todoRepo';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils';
import { AuthenticatedRequest } from '../utils/types';

export const getTodosController = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const todos = await getTodos(req.token);

	if (todos === false)
		res
			.status(401)
			.json({ message: ERROR_MESSAGES.INVALID_OR_EXPIRED_SESSION_TOKEN });
	else res.status(200).send(todos);
};

export const createTodoController = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const { title } = req.body;

	if (!title || typeof title !== 'string') {
		res.status(400).json({ message: ERROR_MESSAGES.INVALID_TODO_TITLE });
		return;
	}

	const id = await createTodo(req.token, title.trim());

	if (!id) {
		res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_CREATE_TODO });
		return;
	}

	res.status(201).send({ id });
};

export const deleteTodoController = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const id = parseInt(req.params.id);
	const success = await deleteTodo(req.token, id);

	if (!success) {
		res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_DELETE_TODO });
		return;
	}

	res.status(200).json({ message: SUCCESS_MESSAGES.TODO_DELETED });
};

export const updateTodoController = async (
	req: AuthenticatedRequest,
	res: Response
) => {
	const id = parseInt(req.params.id);
	const { title, completed, ...otherFields } = req.body;

	if (Object.keys(otherFields).length > 0) {
		res.status(400).json({
			message: ERROR_MESSAGES.INVALID_UPDATE_FIELDS,
		});
		return;
	}

	if (title !== undefined && typeof title !== 'string') {
		res.status(400).json({ message: ERROR_MESSAGES.INVALID_TODO_TITLE });
		return;
	}

	if (completed !== undefined && typeof completed !== 'boolean') {
		res.status(400).json({ message: ERROR_MESSAGES.INVALID_COMPLETED_STATUS });
		return;
	}

	const success = await updateTodo(req.token, id, req.body);
	if (!success) {
		res.status(404).json({ message: ERROR_MESSAGES.TODO_NOT_FOUND });
		return;
	}
	res.status(200).json({ message: SUCCESS_MESSAGES.TODO_UPDATED });
};
