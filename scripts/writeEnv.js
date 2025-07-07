// scripts/writeEnv.js
import fs from 'fs';

const writeEnv = (answers, filename = '.env.local') => {
  const envContent = Object.entries(answers)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');
  fs.writeFileSync(filename, envContent);
  console.log(`${filename} file created successfully!`);
}

export default writeEnv;
