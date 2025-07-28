const os = require('os');

/**
 * @param {number}  num - The number to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The clamped value.
 */
function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

/**
 * Calculates the optimal number of workers based on system memory.
 * @param {number} [memory=3] - The amount of memory (in GB) each worker should use.
 * @returns {number} The optimal number of workers.
 */
function memoryPerWorker(memory = 3){
  const cpuCount = os.cpus().length;
  const systemMemory = Math.round(os.totalmem() / 1024 / 1024 / 1024);

  const optimum = Math.floor(systemMemory / memory);

  return clamp(optimum, 1, cpuCount);
}

if(!module.parent) {
  console.log(memoryPerWorker(.5));
}

module.exports = memoryPerWorker;
