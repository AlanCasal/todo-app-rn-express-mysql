export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export type TodoUpdate = Partial<Pick<Todo, 'title' | 'completed'>>;

export type UpdateTodoHandler = (id: Todo['id'], updates: TodoUpdate) => void;
export type DeleteTodoHandler = (id: Todo['id']) => void;
export type AddTodoHandler = (title: Todo['title']) => Promise<boolean>;

export type ApiResponse<T> = {
	data: T;
};

export type SessionToken = {
	token: string;
};

export type ErrorResponseData = {
	message?: string;
};
