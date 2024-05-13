# Memory per cpu
A nice helper to calculate the maximum number of workers given the system memory with a minimum of 1 and a maximum of the cpu count

This is very handy for testing with for example jest. Where modern computers have a high number of cpu's compared to memory and the CICD has a 1 core per 2 or 4 gigs of memory

## Jest example

```js
// jest.config.js

const memoryPerCpu = require('memory-per-cpu');
/** @type {import('jest').Config} */
module.exports = {
  maxWorkers: memoryPerCpu(3),
};
```
