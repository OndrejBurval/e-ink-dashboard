import screenshotService from '../services/screenshot.service.js';
import { runPythonScript, showImageOnEPaper } from '../cli/python/pythonRunner.mjs';
import { SCREENSHOT_LOCATION_OUTPUT_BMP, SCREENSHOT_LOCATION } from '../utils/config.js';
class ScreenshotController {
  async takeScreenshot(req, res) {
    let error = null;

    try {
      const result = await screenshotService.takeScreenshot();
    } catch (error) {
      console.error('Screenshot controller error:', error.message);
      error = error.message;
      res.status(500).json({ error: 'Screenshot failed' });
    }

    try {
      runPythonScript(
        "./cli/python/img_to_bmp.py",
        `./public/${SCREENSHOT_LOCATION}`,
        `./public/${SCREENSHOT_LOCATION_OUTPUT_BMP}`
      );
      showImageOnEPaper(`./public/${SCREENSHOT_LOCATION_OUTPUT_BMP}`);
    } catch (error) {
      console.error('Python script failed:', error.message);
    }

    if (error) {
      res.status(500).json({ error: 'Screenshot failed' });
    }  else {
      res.redirect('/');
    }
  }
}

export default new ScreenshotController();
