import { DatabaseError, Session, SessionToken } from '../utils/types';
import { db } from './connection';
import { QUERIES } from './constants';

export function handleDatabaseError(err: unknown): false {
	const dbError = err as DatabaseError;
	// eslint-disable-next-line no-console
	console.error('[Database Error]:', {
		message: dbError.sqlMessage,
		code: dbError.code,
		state: dbError.sqlState,
	});
	return false;
}

export async function getUserIdFromToken(
	token: SessionToken
): Promise<number | false> {
	try {
		const [sessions] = await db.execute<Session[]>(QUERIES.GET_USER_ID, [
			token,
		]);
		return sessions.length ? sessions[0].user_id : false;
	} catch (err) {
		return handleDatabaseError(err);
	}
}

export const successMessage = (method: string) => `${method} successfully.`;

export const errorMessage = (method: string) =>
	`Failed to ${method}. Please try again.`;
