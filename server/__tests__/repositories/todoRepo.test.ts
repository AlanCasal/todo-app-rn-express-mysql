import { db } from '../../database/connection';
import {
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
} from '../../database/repositories/todoRepo';
import { getUserIdFromToken } from '../../database/utils';
import { Todo } from '../../utils/types';

jest.mock('../../database/connection', () => ({
	db: {
		execute: jest.fn(),
	},
}));

jest.mock('../../database/utils', () => ({
	getUserIdFromToken: jest.fn(),
	handleDatabaseError: jest.fn().mockReturnValue(false),
}));

describe('todoRepo', () => {
	const mockToken = 'valid-token';
	const mockUserId = 1;
	const mockTodoId = 1;

	beforeEach(() => {
		jest.clearAllMocks();
		(getUserIdFromToken as jest.Mock).mockResolvedValue(mockUserId);
	});

	const expectUserIdCheck = async (expectedValue: number | false) => {
		expect(getUserIdFromToken).toHaveBeenCalledWith(mockToken);
		expect(await getUserIdFromToken(mockToken)).toBe(expectedValue);
	};

	describe('getTodos', () => {
		it('should return false for invalid token', async () => {
			(getUserIdFromToken as jest.Mock).mockResolvedValueOnce(false);

			const result = await getTodos(mockToken);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
		});

		it('should return todos for valid user', async () => {
			const mockTodos = [{ id: 1, title: 'Test Todo', completed: false }];

			(db.execute as jest.Mock).mockResolvedValueOnce([mockTodos]);

			const result = await getTodos(mockToken);

			await expectUserIdCheck(mockUserId);
			expect(result).toEqual(mockTodos);
			expect(db.execute).toHaveBeenCalledWith(expect.any(String), [mockUserId]);
		});

		it('should return false on database error', async () => {
			(db.execute as jest.Mock).mockRejectedValueOnce(
				new Error('Database error')
			);

			const result = await getTodos(mockToken);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
		});
	});

	describe('createTodo', () => {
		const mockTitle = 'New Todo';
		const mockInsertId = 123;

		it('should return false for invalid token', async () => {
			(getUserIdFromToken as jest.Mock).mockResolvedValueOnce(false);

			const result = await createTodo(mockToken, mockTitle);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
		});

		it('should create todo successfully', async () => {
			(db.execute as jest.Mock).mockResolvedValueOnce([
				{ insertId: mockInsertId },
			]);

			const result = await createTodo(mockToken, mockTitle);

			await expectUserIdCheck(mockUserId);
			expect(db.execute).toHaveBeenCalledWith(expect.any(String), [
				mockTitle,
				mockUserId,
			]);
			expect(result).toBe(mockInsertId);
		});

		it('should return false on database error', async () => {
			(db.execute as jest.Mock).mockRejectedValueOnce(
				new Error('Database error')
			);

			const result = await createTodo(mockToken, mockTitle);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
		});
	});

	describe('updateTodo', () => {
		const mockUpdates: Partial<Pick<Todo, 'completed' | 'title'>> = {
			completed: true,
			title: 'Updated Todo',
		};

		it('should return false for invalid token', async () => {
			(getUserIdFromToken as jest.Mock).mockResolvedValueOnce(false);

			const result = await updateTodo(mockToken, mockTodoId, mockUpdates);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
		});

		it('should update todo successfully', async () => {
			(db.execute as jest.Mock)
				.mockResolvedValueOnce([[{ id: mockTodoId }]])
				.mockResolvedValueOnce([{ affectedRows: 1 }]);

			const result = await updateTodo(mockToken, mockTodoId, mockUpdates);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(true);
			expect(db.execute).toHaveBeenCalledTimes(2);
			expect(db.execute).toHaveBeenLastCalledWith(expect.any(String), [
				1,
				'Updated Todo',
				mockTodoId,
				mockUserId,
			]);
		});

		it('should return false if todo does not belong to user', async () => {
			(db.execute as jest.Mock).mockResolvedValueOnce([[]]);

			const result = await updateTodo(mockToken, mockTodoId, mockUpdates);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
			expect(db.execute).toHaveBeenCalledTimes(1);
		});
	});

	describe('deleteTodo', () => {
		it('should return false for invalid token', async () => {
			(getUserIdFromToken as jest.Mock).mockResolvedValueOnce(false);

			const result = await deleteTodo(mockToken, mockTodoId);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(false);
		});

		it('should return false if todo does not belong to user', async () => {
			(db.execute as jest.Mock).mockResolvedValueOnce([[]]);

			const result = await deleteTodo(mockToken, mockTodoId);

			expect(result).toBe(false);
		});

		it('should delete todo successfully', async () => {
			(db.execute as jest.Mock).mockResolvedValueOnce([{ affectedRows: 1 }]);

			const result = await deleteTodo(mockToken, mockTodoId);

			await expectUserIdCheck(mockUserId);
			expect(result).toBe(true);
		});
	});
});
