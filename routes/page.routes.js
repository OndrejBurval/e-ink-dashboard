import express from 'express';
import pageController from '../controllers/page.controller.js';

const router = express.Router();

// GET / - Home page
router.get('/', pageController.home);

export default router;
