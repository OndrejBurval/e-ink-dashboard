import GoogleCalendarService from '../services/googleCalendar.service.js';
import WeatherService from '../services/weather.service.js';

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

      res.render('index', { calendar, timestamp, weather });
    } catch (error) {
      console.error('Page controller error:', error.message);
      res.status(500).send('Page rendering failed');
    }
  }
}

export default new PageController();
