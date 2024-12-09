import { Request, Response, NextFunction } from 'express';
import { errorMessage } from '../../database/utils';
import { requireAuth, errorHandler, corsOptions } from '../../middlewares';
import { ERROR_MESSAGES } from '../../utils';

describe('Middleware Tests', () => {
	describe('corsOptions', () => {
		it('should have correct configuration', () => {
			expect(corsOptions).toEqual({
				methods: ['GET', 'POST', 'PUT', 'DELETE'],
				credentials: true,
			});
		});
	});

	describe('requireAuth', () => {
		let mockReq: Partial<Request>;
		let mockRes: Partial<Response>;
		let mockNext: NextFunction;

		beforeEach(() => {
			mockReq = {
				headers: {},
			};
			mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			mockNext = jest.fn();
		});

		it('should return 401 when no token is provided', () => {
			requireAuth(mockReq as Request, mockRes as Response, mockNext);

			expect(mockRes.status).toHaveBeenCalledWith(401);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: ERROR_MESSAGES.NO_TOKEN_PROVIDED,
			});
			expect(mockNext).not.toHaveBeenCalled();
		});

		it('should call next() when token is provided', () => {
			mockReq.headers = { authorization: 'valid-token' };

			requireAuth(mockReq as Request, mockRes as Response, mockNext);

			expect(mockNext).toHaveBeenCalled();
			expect(mockRes.status).not.toHaveBeenCalled();
			expect(mockRes.json).not.toHaveBeenCalled();
		});
	});

	describe('errorHandler', () => {
		let mockReq: Partial<Request>;
		let mockRes: Partial<Response>;
		let mockNext: NextFunction;
		let mockError: Error;

		beforeEach(() => {
			mockReq = {
				method: 'GET' as string,
			};
			mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			mockNext = jest.fn();
			mockError = new Error('Test error');
		});

		it('should return 500 with correct error message', () => {
			errorHandler(
				mockError,
				mockReq as Request,
				mockRes as Response,
				mockNext
			);

			const method = mockReq.method as string;
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: errorMessage(method.toLowerCase()),
			});
		});
	});
});
