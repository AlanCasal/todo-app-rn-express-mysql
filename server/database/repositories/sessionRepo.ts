import { ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { Session, SessionToken } from '@/utils/types';
import { db } from '../connection';
import { handleDatabaseError } from '../utils';

export async function startSession(): Promise<SessionToken | false> {
	try {
		const [result] = await db.execute<ResultSetHeader>(
			'INSERT INTO users () VALUES ()'
		);

		const token = uuidv4();
		const userId = result.insertId;

		await db.execute('INSERT INTO sessions (token, user_id) VALUES (?, ?)', [
			token,
			userId,
		]);

		return token;
	} catch (err) {
		return handleDatabaseError(err);
	}
}

export async function validateSession(token: SessionToken) {
	try {
		const [sessions] = await db.execute<Session[]>(
			'SELECT * FROM sessions WHERE token = ?',
			[token]
		);

		if (sessions.length === 0) return false;

		return true;
	} catch (err) {
		return handleDatabaseError(err);
	}
}
