export const QUERIES = {
	GET_SESSION: 'SELECT * FROM sessions WHERE token = ?',
	VERIFY_TODO_OWNER: 'SELECT * FROM todos WHERE id = ? AND user_id = ?',
	GET_USER_ID: 'SELECT user_id FROM sessions WHERE token = ?',
	GET_TODOS: 'SELECT * FROM todos WHERE user_id = ?',
	CREATE_USER: 'INSERT INTO users () VALUES ()',
	CREATE_SESSION: 'INSERT INTO sessions (token, user_id) VALUES (?, ?)',
	CREATE_TODO: 'INSERT INTO todos (title, user_id) VALUES (?, ?)',
	DELETE_TODO: 'DELETE FROM todos WHERE id = ?',
	UPDATE_TODO: 'UPDATE todos SET {{updates}} WHERE id = ? AND user_id = ?',
} as const;
