import puppeteer from 'puppeteer';
import { SCREENSHOT_LOCATION } from '../utils/config.js';

class ScreenshotService {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      this.page = await this.browser.newPage();

      //await this.page.setViewport();
    }
    return { browser: this.browser, page: this.page };
  }

  async takeScreenshot() {
    try {
      const { page } = await this.initBrowser();

      await page.goto("http://localhost:3000/");
      await page.waitForSelector("#display");

      const element = await page.$("#display");

      await element.screenshot({ type: 'webp', path: `./public${SCREENSHOT_LOCATION}` });
      console.log(`Screenshot saved`);
      return { success: true };

    } catch (error) {
      console.error('Screenshot error:', error.message);
      return { success: false, error: error.message };
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

export default new ScreenshotService();
