import GoogleCalendarService from '../services/googleCalendar.service.js';
import WeatherService from '../services/weather.service.js';
import { SCREENSHOT_LOCATION } from '../utils/config.js';
import fs from 'fs';

class PageController {
  async home(req, res) {
    try {
      const calendar = await GoogleCalendarService.getCalendarEvents();
      const weather = await WeatherService.getWeatherData();

      const timestamp = new Date().toLocaleString('cs-CZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const screenshotExists = fs.existsSync(`./public${SCREENSHOT_LOCATION}`);
      const screenshot = screenshotExists ? SCREENSHOT_LOCATION : null;

      res.render('index', { calendar, timestamp, weather, screenshot });
    } catch (error) {
      console.error('Page controller error:', error.message);
      res.status(500).send('Page rendering failed');
    }
  }
}

export default new PageController();
