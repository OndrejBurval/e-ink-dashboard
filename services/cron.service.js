import cron from 'node-cron';
import chalk from 'chalk';
import screenshotService from './screenshot.service.js';
import { runPythonScript, showImageOnEPaper } from '../cli/python/pythonRunner.mjs';
import { SCREENSHOT_LOCATION, SCREENSHOT_LOCATION_OUTPUT_BMP, CRON_SCHEDULE } from '../utils/config.js';

class CronService {
  constructor() {
    this.task = null;
    this.isRunning = false; // whether cron is scheduled
    this.lastRun = null; // date string of last execution
    this.lastResult = null; // { success, error? }
  }

  schedule() {
    if (this.task) {
      return this.task;
    }
    // Every 15 minutes
    this.task = cron.schedule(CRON_SCHEDULE, async () => {
      console.log(chalk.cyan('⏱️  Cron: running pipeline'));
      this.lastRun = new Date().toLocaleString('cs-CZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      try {
        const result = await screenshotService.runPipeline(async () => {
          await runPythonScript(
            './cli/python/img_to_bmp.py',
            `./public/${SCREENSHOT_LOCATION}`,
            `./public/${SCREENSHOT_LOCATION_OUTPUT_BMP}`
          );
          await showImageOnEPaper(`./public/${SCREENSHOT_LOCATION_OUTPUT_BMP}`);
        });
        this.lastResult = { success: result.success, error: result.error };
        console.log(chalk.green('✅ Cron: display updated'));
      } catch (error) {
        this.lastResult = { success: false, error: error.message };
        console.error(chalk.red('❌ Cron error:'), error.message);
      }
    }, { scheduled: false });

    return this.task;
  }

  start() {
    this.schedule();
    if (!this.task.running) {
      this.task.start();
    }
    this.isRunning = true;
  }

  stop() {
    if (this.task) {
      this.task.stop();
    }
    this.isRunning = false;
  }

  status() {
    return {
      running: this.isRunning,
      lastRun: this.lastRun,
      lastResult: this.lastResult,
      schedule: CRON_SCHEDULE,
    };
  }
}

export default new CronService();
