import express from 'express';
import {
	startSessionController,
	validateSessionController,
} from '../controllers/session';
import { requireAuth } from '../middlewares';

const router = express.Router();

router.post('/start-session', startSessionController);

router.get('/validate-session', requireAuth, validateSessionController);

export default router;
