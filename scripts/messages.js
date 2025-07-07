import chalk from 'chalk';

export const welcome = () => {
  console.log(chalk.cyan('Welcome! This script will help you set up required environment variables for the application. Please answer the following questions:'));
}

export const finish = () => {
  console.log(chalk.green('All done! You can now start the application by running "npm run start".'));
}
