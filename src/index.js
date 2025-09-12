const os = require('os');
const { clamp } = require('./helpers');

/**
 * Calculates the optimal number of workers based on system memory.
 * @param {number} [memory=3] - The amount of memory (in GB) each worker should use. Must be greater than 0.
 * @returns {number} The optimal number of workers.
 */
function memoryPerWorker(memory = 3){
  if (memory <= 0) {
    throw new Error('Memory per worker must be greater than 0');
  }

  const cpuCount = os.cpus().length;
  const systemMemory = Math.round(os.totalmem() / 1024 / 1024 / 1024);

  const optimum = Math.floor(systemMemory / memory);

  return clamp(optimum, 1, cpuCount);
}

module.exports = memoryPerWorker;
