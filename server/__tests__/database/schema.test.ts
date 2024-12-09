/* eslint-disable @typescript-eslint/naming-convention */
import { RowDataPacket } from 'mysql2';
import { db } from '../../database/connection';

describe('Database Schema', () => {
	const getTableInfo = async (tableName: string) => {
		const [rows] = await db.execute<RowDataPacket[]>(`DESCRIBE ${tableName}`);
		return rows;
	};

	describe('users table', () => {
		it('should have correct structure', async () => {
			const columns = await getTableInfo('users');

			expect(columns).toHaveLength(1);
			expect(columns[0]).toMatchObject({
				Field: 'id',
				Type: 'int',
				Null: 'NO',
				Key: 'PRI',
				Extra: 'auto_increment',
			});
		});
	});

	describe('todos table', () => {
		it('should have correct structure', async () => {
			const columns = await getTableInfo('todos');

			expect(columns).toHaveLength(4);
			expect(columns).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						Field: 'id',
						Type: 'int',
						Null: 'NO',
						Key: 'PRI',
						Extra: 'auto_increment',
					}),
					expect.objectContaining({
						Field: 'title',
						Type: 'varchar(255)',
						Null: 'NO',
					}),
					expect.objectContaining({
						Field: 'completed',
						Type: 'tinyint(1)',
						Default: '0',
					}),
					expect.objectContaining({
						Field: 'user_id',
						Type: 'int',
						Null: 'NO',
						Key: 'MUL',
					}),
				])
			);
		});
	});

	describe('sessions table', () => {
		it('should have correct structure', async () => {
			const columns = await getTableInfo('sessions');

			expect(columns).toHaveLength(3);
			expect(columns).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						Field: 'token',
						Type: 'varchar(255)',
						Null: 'NO',
						Key: 'PRI',
					}),
					expect.objectContaining({
						Field: 'user_id',
						Type: 'int',
						Null: 'NO',
						Key: 'MUL',
					}),
					expect.objectContaining({
						Field: 'created_at',
						Type: 'datetime',
						Default: 'CURRENT_TIMESTAMP',
					}),
				])
			);
		});
	});

	describe('foreign keys', () => {
		it('should have correct foreign key constraints', async () => {
			const [fkConstraints] = await db.execute<RowDataPacket[]>(`
	              SELECT
	                  TABLE_NAME,
	                  COLUMN_NAME,
	                  REFERENCED_TABLE_NAME,
	                  REFERENCED_COLUMN_NAME
	              FROM information_schema.KEY_COLUMN_USAGE
	              WHERE REFERENCED_TABLE_NAME IS NOT NULL
	              AND TABLE_SCHEMA = DATABASE()
	              ORDER BY TABLE_NAME
	          `);

			expect(fkConstraints).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						TABLE_NAME: 'sessions',
						COLUMN_NAME: 'user_id',
						REFERENCED_TABLE_NAME: 'users',
						REFERENCED_COLUMN_NAME: 'id',
					}),
					expect.objectContaining({
						TABLE_NAME: 'todos',
						COLUMN_NAME: 'user_id',
						REFERENCED_TABLE_NAME: 'users',
						REFERENCED_COLUMN_NAME: 'id',
					}),
				])
			);
		});
	});
});
