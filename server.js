import chalk from 'chalk';
import app from './app.js';
import cronService from './services/cron.service.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}: http://localhost:${PORT}`));
  // Start cron by default so it runs every 15 minutes
  try {
    cronService.start();
    console.log(chalk.blue('Cron scheduler started (*/15 * * * *)'));
  } catch (e) {
    console.log(chalk.red('Failed to start cron scheduler:'), e.message);
  }
});
