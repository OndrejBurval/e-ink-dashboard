import screenshotService from '../services/screenshot.service.js';

class ScreenshotController {
  async takeScreenshot(req, res) {
    try {
      const result = await screenshotService.takeScreenshot();
      res.redirect('/');
    } catch (error) {
      console.error('Screenshot controller error:', error.message);
      res.status(500).json({ error: 'Screenshot failed' });
    }
  }
}

export default new ScreenshotController();
