import { SessionToken } from './index';

declare global {
	namespace Express {
		interface Request {
			token?: SessionToken;
		}
	}
}

export {};
