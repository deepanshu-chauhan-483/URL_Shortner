import express from 'express';
import { createShortURL } from '../controllers/urlController.js';

import { getUserUrls} from '../controllers/urlController.js';
import { auth } from '../utils/authMiddleware.js';

const router = express.Router();
router.get('/user', auth, getUserUrls)
router.post('/shorten', auth, createShortURL);

export default router;
