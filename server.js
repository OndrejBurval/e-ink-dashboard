import chalk from 'chalk';
import app from './app.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}: http://localhost:${PORT}`));
});
