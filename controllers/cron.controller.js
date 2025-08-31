import cronService from '../services/cron.service.js';

class CronController {
  status(req, res) {
    res.json(cronService.status());
  }

  start(req, res) {
    cronService.start();
    res.redirect('/');
  }

  stop(req, res) {
    cronService.stop();
    res.redirect('/');
  }
}

export default new CronController();
