import { Request, Response } from 'express';
import {
	startSession,
	validateSession,
} from '../database/repositories/sessionRepo';
import { ERROR_MESSAGES } from '../utils';
import { AuthenticatedRequest } from '../utils/types';

export const startSessionController = async (req: Request, res: Response) => {
	const token = await startSession();

	if (!token)
		res.status(500).json({ message: ERROR_MESSAGES.FAILED_TO_START_SESSION });
	else res.status(200).json({ token });
};

export const validateSessionController = async (
	req: Request,
	res: Response
) => {
	const authenticatedReq = req as AuthenticatedRequest;
	const isValid = await validateSession(authenticatedReq.token);

	if (!isValid)
		res
			.status(401)
			.json({ message: ERROR_MESSAGES.INVALID_OR_EXPIRED_SESSION_TOKEN });
	else res.status(200).send(isValid);
};
