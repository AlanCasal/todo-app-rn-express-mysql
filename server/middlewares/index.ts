/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { errorMessage } from '../database/utils';
import { ERROR_MESSAGES } from '../utils';
import {
	AuthenticatedRequest,
	CorsMethods,
	SessionToken,
} from '../utils/types';

export const corsOptions = {
	methods: [
		CorsMethods.GET,
		CorsMethods.POST,
		CorsMethods.PUT,
		CorsMethods.DELETE,
	],
	credentials: true,
};

export const requireAuth: RequestHandler = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: ERROR_MESSAGES.NO_TOKEN_PROVIDED });
		return;
	}

	(req as AuthenticatedRequest).token = token as SessionToken;
	next();
};

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(500).json({ message: errorMessage(req.method.toLowerCase()) });
};
