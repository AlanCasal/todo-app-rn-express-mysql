import express from 'express';
import session from './session';
import todo from './todo';

const router = express.Router();

router.use('/', session);
router.use('/', todo);

export default router;
