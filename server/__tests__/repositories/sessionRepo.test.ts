import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/connection';
import {
	startSession,
	validateSession,
} from '../../database/repositories/sessionRepo';

jest.mock('uuid', () => ({
	v4: jest.fn(),
}));

jest.mock('../../database/connection', () => ({
	db: {
		execute: jest.fn(),
	},
}));

describe('sessionRepo', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('startSession', () => {
		it('should return false when database error occurs', async () => {
			(db.execute as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

			const result = await startSession();

			expect(db.execute).toHaveBeenCalledTimes(1);
			expect(result).toBe(false);
		});

		it('should create a new user and session', async () => {
			const mockUserId = 123;
			(db.execute as jest.Mock)
				.mockResolvedValueOnce([{ insertId: mockUserId } as ResultSetHeader])
				.mockResolvedValueOnce([{}]);

			const mockToken = 'mock-uuid-token';
			(uuidv4 as jest.Mock).mockReturnValueOnce(mockToken);

			const result = await startSession();

			expect(result).toBe(mockToken);
			expect(db.execute).toHaveBeenCalledTimes(2);
			expect(db.execute).toHaveBeenNthCalledWith(
				1,
				'INSERT INTO users () VALUES ()'
			);
			expect(db.execute).toHaveBeenNthCalledWith(
				2,
				'INSERT INTO sessions (token, user_id) VALUES (?, ?)',
				[mockToken, mockUserId]
			);
		});
	});

	describe('validateSession', () => {
		it('should return false for invalid session token', async () => {
			const mockToken = 'invalid-token';
			(db.execute as jest.Mock).mockResolvedValue([[] as RowDataPacket[]]);

			const result = await validateSession(mockToken);

			expect(db.execute).toHaveBeenCalledWith(
				'SELECT * FROM sessions WHERE token = ?',
				[mockToken]
			);
			expect(result).toBe(false);
		});

		it('should return false when database error occurs', async () => {
			const mockToken = 'error-token';
			(db.execute as jest.Mock).mockRejectedValue(new Error('DB error'));

			const result = await validateSession(mockToken);

			expect(db.execute).toHaveBeenCalledWith(
				'SELECT * FROM sessions WHERE token = ?',
				[mockToken]
			);
			expect(result).toBe(false);
		});

		it('should return true for valid session token', async () => {
			const mockToken = 'valid-token';
			(db.execute as jest.Mock).mockResolvedValue([
				[{ token: mockToken }] as RowDataPacket[],
			]);

			const result = await validateSession(mockToken);

			expect(db.execute).toHaveBeenCalledWith(
				'SELECT * FROM sessions WHERE token = ?',
				[mockToken]
			);
			expect(result).toBe(true);
		});
	});
});
