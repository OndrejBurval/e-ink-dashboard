import express from 'express';
import cronController from '../controllers/cron.controller.js';

const router = express.Router();

router.get('/status', (req, res) => cronController.status(req, res));
router.post('/start', (req, res) => cronController.start(req, res));
router.post('/stop', (req, res) => cronController.stop(req, res));

export default router;
