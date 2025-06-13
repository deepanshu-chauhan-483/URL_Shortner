import express from 'express';
import { handleRedirect } from '../controllers/redirectController.js';

const router = express.Router();
router.get('/short/:code', handleRedirect);

export default router;
