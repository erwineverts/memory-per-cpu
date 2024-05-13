const os = require('os');

function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

function memoryPerWorker(memory = 3){
  const cpuCount = os.cpus().length;
  const systemMemory = Math.round(os.totalmem() / 1024 / 1024 / 1024);
  console.log(os.totalmem())

  const optimum = Math.floor(systemMemory / memory);

  return clamp(optimum, 1, cpuCount);
}

if(!module.parent) {
  console.log(memoryPerWorker(.5));
}

module.exports = memoryPerWorker;
