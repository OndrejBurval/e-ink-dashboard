import puppeteer from "puppeteer-core";
import {
  SCREENSHOT_LOCATION,
  SCREENSHOT_LOCATION_OUTPUT,
} from "../utils/config.js";
import chalk from "chalk";
import sharp from "sharp";

class ScreenshotService {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initBrowser() {
    if (!this.browser) {
      console.info(chalk.yellow("⏱️  Initializing browser..."));
      try {
        this.browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          executablePath: "/usr/bin/chromium-browser",
        });
        this.page = await this.browser.newPage();
      } catch (error) {
        console.error(
          chalk.red("❌ Browser initialization error:", error.message)
        );
        throw error;
      }

      //await this.page.setViewport();
    }
    return { browser: this.browser, page: this.page };
  }

  async takeScreenshot() {
    const TIMER_LABEL = "⏱️  Screenshot timer";
    try {
      console.time(TIMER_LABEL);
      const { page } = await this.initBrowser();

      await page.goto("http://localhost:8000/");
      await page.waitForSelector("#display");

      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2,
      });

      const element = await page.$("#display");

      await element.screenshot({
        type: "webp",
        path: `./public/${SCREENSHOT_LOCATION}`,
        quality: 100,
        omitBackground: false,
      });

      await sharp(`./public/${SCREENSHOT_LOCATION}`)
        .greyscale()
        .threshold(128)
        .toFormat("png")
        .toFile(`./public/${SCREENSHOT_LOCATION_OUTPUT}`, (err, info) => {
          if (err) throw err;
          console.log("Saved BMP:", info);
        });

      console.timeEnd(TIMER_LABEL);
      const date = new Date().toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      console.log(
        chalk.green(`✅ Screenshot saved: ${SCREENSHOT_LOCATION} (${date})`)
      );
      return { success: true };
    } catch (error) {
      console.timeEnd(TIMER_LABEL);
      console.log(chalk.red("Screenshot error:", error.message));
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
