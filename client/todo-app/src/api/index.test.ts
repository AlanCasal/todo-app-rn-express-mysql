import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
	fetchTodos,
	addTodo,
	validateSession,
	startSession,
	updateTodo,
	deleteTodo,
} from '.';
import { API_URL } from '../utils';

// Mock axios
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('API Integration', () => {
	const mockedHeaders = expect.objectContaining({
		headers: { Authorization: 'test-token' },
	});
	beforeEach(() => {
		jest.clearAllMocks();
		mockedAsyncStorage.getItem.mockResolvedValue('test-token');
	});

	describe('validateSession', () => {
		it('should validate session with auth header', async () => {
			const mockResponse = {
				status: 200,
				data: true,
			};
			mockedAxios.get.mockResolvedValueOnce(mockResponse);

			const result = await validateSession();

			expect(mockedAxios.get).toHaveBeenCalledWith(
				`${API_URL}/validate-session`,
				expect.objectContaining({
					headers: { Authorization: 'test-token' },
				})
			);

			expect(result.status).toBe(200);
			expect(result.data).toBe(true);
		});

		it('should handle invalid session', async () => {
			const mockResponse = {
				status: 401,
				data: { valid: false },
			};
			mockedAxios.get.mockResolvedValueOnce(mockResponse);

			const result = await validateSession();

			expect(result.status).toBe(401);
			expect(result.data.valid).toBe(false);
		});
	});

	describe('startSession', () => {
		it('should start a new session successfully', async () => {
			const mockResponse = {
				status: 200,
				data: { token: 'new-token' },
			};
			mockedAxios.post.mockResolvedValueOnce(mockResponse);

			const result = await startSession();

			expect(mockedAxios.post).toHaveBeenCalledWith(
				`${API_URL}/start-session`,
				undefined,
				mockedHeaders
			);
			expect(result.status).toBe(200);
			expect(result.data).toEqual({ token: 'new-token' });
		});

		it('should handle session start failure', async () => {
			const mockResponse = {
				status: 500,
				data: { error: 'Server error' },
			};
			mockedAxios.post.mockResolvedValueOnce(mockResponse);

			const result = await startSession();

			expect(result.status).toBe(500);
			expect(result.data).toEqual({ error: 'Server error' });
		});
	});

	describe('fetchTodos', () => {
		it('should fetch todos successfully', async () => {
			const mockResponse = {
				status: 200,
				data: [{ id: 1, title: 'Test Todo', completed: false }],
			};
			mockedAxios.get.mockResolvedValueOnce(mockResponse);

			const result = await fetchTodos();

			expect(mockedAxios.get).toHaveBeenCalledWith(
				`${API_URL}/todos`,
				mockedHeaders
			);
			expect(result.status).toBe(200);
			expect(result.data).toEqual([
				{ id: 1, title: 'Test Todo', completed: false },
			]);
		});

		it('should handle fetch todos failure', async () => {
			const error = new Error('Network error');
			mockedAxios.get.mockRejectedValueOnce(error);

			await expect(fetchTodos()).rejects.toThrow('Network error');
		});
	});

	describe('updateTodo', () => {
		it('should update todo successfully', async () => {
			const mockResponse = {
				data: { id: 1, title: 'Updated Todo', completed: true },
			};
			mockedAxios.put.mockResolvedValueOnce(mockResponse);

			const result = await updateTodo(1, {
				title: 'Updated Todo',
				completed: true,
			});

			expect(mockedAxios.put).toHaveBeenCalledWith(
				`${API_URL}/todos/1`,
				{ title: 'Updated Todo', completed: true },
				mockedHeaders
			);
			expect(result).toEqual({ id: 1, title: 'Updated Todo', completed: true });
		});

		it('should handle update todo failure', async () => {
			const error = new Error('Update failed');
			mockedAxios.put.mockRejectedValueOnce(error);

			await expect(updateTodo(1, { title: 'Updated Todo' })).rejects.toThrow(
				'Update failed'
			);
		});
	});

	describe('addTodo', () => {
		it('should add todo successfully', async () => {
			const mockResponse = {
				data: { id: 1, title: 'New Todo', completed: false },
			};
			mockedAxios.post.mockResolvedValueOnce(mockResponse);

			const result = await addTodo('New Todo');

			expect(mockedAxios.post).toHaveBeenCalledWith(
				`${API_URL}/todos`,
				{ title: 'New Todo' },
				mockedHeaders
			);
			expect(result).toEqual({ id: 1, title: 'New Todo', completed: false });
		});

		it('should handle add todo failure', async () => {
			const error = new Error('Add failed');
			mockedAxios.post.mockRejectedValueOnce(error);

			await expect(addTodo('New Todo')).rejects.toThrow('Add failed');
		});
	});

	describe('deleteTodo', () => {
		it('should delete todo successfully', async () => {
			const mockId = 1;
			const mockResponse = {
				data: { message: 'Todo deleted' },
			};

			mockedAxios.delete.mockResolvedValueOnce(mockResponse);

			const resultData = await deleteTodo(mockId);

			expect(mockedAxios.delete).toHaveBeenCalledWith(
				`${API_URL}/todos/${mockId}`,
				mockedHeaders
			);

			expect(resultData).toEqual({ message: 'Todo deleted' });
		});

		it('should handle delete todo failure', async () => {
			const error = new Error('Delete failed');
			mockedAxios.delete.mockRejectedValueOnce(error);

			await expect(deleteTodo(1)).rejects.toThrow('Delete failed');
		});
	});
});
