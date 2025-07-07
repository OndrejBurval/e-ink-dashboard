// scripts/install.js
import askEnv from './askEnv.js';
import writeEnv from './writeEnv.js';
import { welcome, finish } from './messages.js';

const main = async () => {
  welcome();
  const answers = await askEnv();
  writeEnv(answers);
  finish();
}

main();
