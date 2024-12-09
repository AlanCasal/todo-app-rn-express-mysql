/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import { db } from './database/connection';
import { setupDatabase } from './database/setup';
import { corsOptions, errorHandler } from './middlewares';
import routes from './routes';

const waitForDatabase = async () => {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		try {
			await setupDatabase();
			await db.query('SELECT 1');
			console.log('Database connection successful');
			break;
		} catch (err) {
			console.error('Database error:', err);
			console.log('Waiting for database...');
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}
};

const startServer = async () => {
	await waitForDatabase();

	const app = express();
	app.use(express.json());
	app.use(cors(corsOptions));
	app.use('/', routes);
	app.use(errorHandler);

	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

startServer().catch(console.error);
