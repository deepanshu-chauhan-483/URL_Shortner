import express from 'express';
import { getAnalytics, getByTag } from '../controllers/analyticsController.js';

const router = express.Router();
router.get('/:code', getAnalytics);
router.get('/tag/:tag', getByTag);

export default router;
