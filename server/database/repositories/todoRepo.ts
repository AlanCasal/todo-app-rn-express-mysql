import { ResultSetHeader } from 'mysql2';
import { Todo, SessionToken, DbResult } from '@/utils/types';
import { db } from '../connection';
import { QUERIES } from '../constants';
import { getUserIdFromToken, handleDatabaseError } from '../utils';

export async function getTodos(token: SessionToken): DbResult<Todo[]> {
	const userId = await getUserIdFromToken(token);
	if (!userId) return false;

	try {
		const [todos] = await db.execute<Todo[]>(QUERIES.GET_TODOS, [userId]);
		return todos;
	} catch (err) {
		return handleDatabaseError(err);
	}
}

export async function createTodo(
	token: SessionToken,
	title: string
): Promise<number | false> {
	try {
		const userId = await getUserIdFromToken(token);
		if (!userId) return false;

		const [result] = await db.execute<ResultSetHeader>(
			'INSERT INTO todos (title, user_id) VALUES (?, ?)',
			[title, userId]
		);

		return result.insertId;
	} catch (err) {
		return handleDatabaseError(err);
	}
}

export async function updateTodo(
	token: SessionToken,
	id: Todo['id'],
	updates: Partial<Pick<Todo, 'completed' | 'title'>>
) {
	try {
		const userId = await getUserIdFromToken(token);
		if (!userId) return false;

		const [todos] = await db.execute<Todo[]>(QUERIES.VERIFY_TODO_OWNER, [
			id,
			userId,
		]);
		if (todos.length === 0) return false;

		const updatesArray = [];
		const values = [];
		if ('completed' in updates) {
			updatesArray.push('completed = ?');
			values.push(updates.completed ? 1 : 0);
		}
		if ('title' in updates) {
			updatesArray.push('title = ?');
			values.push(updates.title);
		}

		if (updatesArray.length === 0) return false;

		const query = QUERIES.UPDATE_TODO.replace(
			'{{updates}}',
			updatesArray.join(', ')
		);
		values.push(id, userId);

		const [result] = await db.execute<ResultSetHeader>(query, values);
		return result.affectedRows > 0;
	} catch (err) {
		return handleDatabaseError(err);
	}
}

export async function deleteTodo(token: SessionToken, id: number) {
	try {
		const userId = await getUserIdFromToken(token);

		if (!userId) return false;

		const [todos] = await db.execute<Todo[]>(QUERIES.VERIFY_TODO_OWNER, [
			id,
			userId,
		]);

		if (todos.length === 0) return false;

		await db.execute('DELETE FROM todos WHERE id = ?', [id]);

		return true;
	} catch (err) {
		return handleDatabaseError(err);
	}
}
