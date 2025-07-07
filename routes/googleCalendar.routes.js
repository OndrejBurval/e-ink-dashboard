import express from 'express';
import calendarController from '../controllers/calendarController.js';

const router = express.Router();

// GET /calendar/config - Get calendar service configuration status
router.get('/config', calendarController.getConfigStatus);

// GET /calendar/test - Test calendar connection and list available calendars
router.get('/test', calendarController.testConnection);

// GET /calendar/calendars - List all available calendars
router.get('/calendars', calendarController.listCalendars);

// GET /calendar/calendars/:calendarId - Get calendar details
router.get('/calendars/:calendarId', calendarController.getCalendarDetails);

// GET /calendar/events - Get calendar events
router.get('/events', calendarController.getEvents);

// POST /calendar/events - Create a calendar event
router.post('/events', calendarController.createEvent);

export default router;
