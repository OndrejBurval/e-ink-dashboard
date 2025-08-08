import { spawn } from 'child_process';

/**
 * Runs the Python script to convert PNG to BMP.
 * @param {string} pythonScript Path to the python script.
 * @param {string} inputPath Path to the input PNG file.
 * @param {string} outputPath Path to the output BMP file.
 * @returns {Promise<void>} Resolves on success, rejects on error.
 */
export function runPythonScript(pythonScript, inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [pythonScript, inputPath, outputPath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
}

/**
 * Runs the Python script to display an image on the E-Paper.
 * @param {string} bmpPath Path to the BMP file to display.
 * @returns {Promise<void>} Resolves on success, rejects on error.
 */
export function showImageOnEPaper(bmpPath) {
  const pythonScript = 'cli/python/display.py'; // Path to your Python script
  const pythonProcess = spawn('python3', [pythonScript, bmpPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data.toString()}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log('E-Paper display updated successfully!');
    } else {
      console.error(`Display script exited with code ${code}`);
    }
  });
}
