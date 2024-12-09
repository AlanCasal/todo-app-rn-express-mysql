import { Request, Response } from 'express';
import {
	startSessionController,
	validateSessionController,
} from '../../controllers/session';
import * as sessionRepo from '../../database/repositories/sessionRepo';
import { ERROR_MESSAGES } from '../../utils';

jest.mock('../../database/repositories/sessionRepo');

const req = {} as Request;
const res = {
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
	send: jest.fn(),
} as unknown as Response;

const startSessionMock = sessionRepo.startSession as jest.Mock;
describe('startSessionController', () => {
	it('should send a status code of 500 and an error message if starting a session fails', async () => {
		startSessionMock.mockResolvedValue(false);

		await startSessionController(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.FAILED_TO_START_SESSION,
		});
	});

	it('should send a status code of 200 and a token if starting a session succeeds', async () => {
		startSessionMock.mockResolvedValue('token');

		await startSessionController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ token: 'token' });
	});
});

const validateSessionMock = sessionRepo.validateSession as jest.Mock;
describe('validateSessionController', () => {
	it('should send a status code of 401 and an error message if the session is invalid', async () => {
		validateSessionMock.mockResolvedValue(false);

		await validateSessionController(req, res);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({
			message: ERROR_MESSAGES.INVALID_OR_EXPIRED_SESSION_TOKEN,
		});
	});

	it('should send a status code of 200 and true if the session is valid', async () => {
		validateSessionMock.mockResolvedValue(true);

		await validateSessionController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith(true);
	});
});
