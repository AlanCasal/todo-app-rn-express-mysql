import { Response } from 'express';
import {
	createTodoController,
	deleteTodoController,
	getTodosController,
	updateTodoController,
} from '../../controllers/todo';
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from '../../database/repositories/todoRepo';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils';
import { AuthenticatedRequest } from '../../utils/types';

jest.mock('../../database/repositories/todoRepo');

let req: AuthenticatedRequest;
let res: Response;

beforeEach(() => {
	req = {
		params: { id: '1' },
		token: 'token',
	} as unknown as AuthenticatedRequest;

	res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
		send: jest.fn(),
	} as unknown as Response;

	jest.clearAllMocks();
});

describe('getTodosController', () => {
	const getTodosMock = getTodos as jest.Mock;

	it('should send a status code of 401 and an error message if getTodos returns false', async () => {
		getTodosMock.mockResolvedValueOnce(false);

		await getTodosController(req, res);

		expect(getTodosMock).toHaveBeenCalledWith(req.token);
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.INVALID_OR_EXPIRED_SESSION_TOKEN,
		});
	});

	it('should send a status code of 200 and an array of todos if getTodos returns an array', async () => {
		const todosArray = [
			{ id: 1, title: 'Test Todo 1', completed: false },
			{ id: 2, title: 'Test Todo 2', completed: true },
		];

		getTodosMock.mockResolvedValueOnce(todosArray);

		await getTodosController(req, res);

		expect(getTodosMock).toHaveBeenCalledWith(req.token);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith(todosArray);
	});
});

describe('createTodoController', () => {
	const createTodoMock = createTodo as jest.Mock;

	beforeEach(() => {
		req.body = { title: 'Test Todo' };
	});

	it('should send a status code of 400 when title is not a string', async () => {
		req.body = { title: 123 };

		await createTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.INVALID_TODO_TITLE,
		});
		expect(createTodoMock).not.toHaveBeenCalled();
	});

	it('should send a status code of 500 and an error message if createTodo returns false', async () => {
		createTodoMock.mockResolvedValue(false);

		await createTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.FAILED_TO_CREATE_TODO,
		});
	});

	it('should send a status code of 201 and the id of the created todo if createTodo returns a string', async () => {
		createTodoMock.mockResolvedValue('1');

		await createTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.send).toHaveBeenCalledWith({ id: '1' });
	});
});

describe('deleteTodoController', () => {
	const deleteTodoMock = deleteTodo as jest.Mock;

	it('should send a status code of 500 and an error message if deleteTodo returns false', async () => {
		deleteTodoMock.mockResolvedValue(false);

		await deleteTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.FAILED_TO_DELETE_TODO,
		});
	});

	it('should send a status code of 200 and a success message if deleteTodo returns true', async () => {
		deleteTodoMock.mockResolvedValue(true);

		await deleteTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: SUCCESS_MESSAGES.TODO_DELETED,
		});
	});
});

describe('updateTodoController', () => {
	const updateTodoMock = updateTodo as jest.Mock;

	beforeEach(() => {
		req.params = { id: '1' };
		req.body = {};
	});

	it('should send 400 when invalid fields are included', async () => {
		req.body = {
			title: 'Valid Title',
			invalidField: 'some value',
		};

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.INVALID_UPDATE_FIELDS,
		});
		expect(updateTodoMock).not.toHaveBeenCalled();
	});

	it('should send 400 when title is not a string', async () => {
		req.body = { title: 123 };

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.INVALID_TODO_TITLE,
		});
		expect(updateTodoMock).not.toHaveBeenCalled();
	});

	it('should send 400 when completed is not a boolean', async () => {
		req.body = { completed: 'true' };

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.INVALID_COMPLETED_STATUS,
		});
		expect(updateTodoMock).not.toHaveBeenCalled();
	});

	it('should accept valid title update', async () => {
		req.body = { title: 'Valid New Title' };
		updateTodoMock.mockResolvedValue(true);

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: SUCCESS_MESSAGES.TODO_UPDATED,
		});
	});

	it('should accept valid completed update', async () => {
		req.body = { completed: true };
		updateTodoMock.mockResolvedValue(true);

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: SUCCESS_MESSAGES.TODO_UPDATED,
		});
	});

	it('should send a status code of 404 and an error message if updateTodo returns false', async () => {
		updateTodoMock.mockResolvedValue(false);

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.TODO_NOT_FOUND,
		});
	});

	it('should send a status code of 200 and a success message if updateTodo returns true', async () => {
		updateTodoMock.mockResolvedValue(true);

		await updateTodoController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: SUCCESS_MESSAGES.TODO_UPDATED,
		});
	});
});
