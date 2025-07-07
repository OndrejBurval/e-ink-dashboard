import express from 'express';
import screenshotController from '../controllers/screenshot.controller.js';

const router = express.Router();

// POST /screenshot - Take a screenshot
router.post('/', screenshotController.takeScreenshot);

export default router;
