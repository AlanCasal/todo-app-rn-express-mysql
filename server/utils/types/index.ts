import { Request } from 'express';
import { RowDataPacket } from 'mysql2';

export enum CorsMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type DbResult<T> = Promise<T | false>;

export interface User {
	id: number;
}

export interface Todo extends RowDataPacket {
	id: number;
	title: string;
	completed: boolean;
	user_id: number;
}

export interface Session extends RowDataPacket {
	token: string;
	user_id: number;
	created_at: Date;
}

export interface TodoUpdates {
	title?: string;
	completed?: boolean;
}

export interface TodoRequest {
	title?: string;
	completed?: boolean;
}

export interface DatabaseError {
	code: string;
	errno: number;
	sqlMessage: string;
	sqlState: string;
}

export interface QueryResult {
	affectedRows: number;
	insertId?: number;
	changedRows?: number;
}

export type SessionToken = string;
export interface AuthenticatedRequest extends Request {
	token: SessionToken;
}
