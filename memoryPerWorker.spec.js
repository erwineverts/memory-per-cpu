const os = require('os');
const memoryPerWorker = require('./index');

const MEMORY_PER_GB = 1073741824;

describe('memoryPerWorker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('16gb, 4cpu, 4 memory per cpu', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 16);

    expect(memoryPerWorker(4)).toBe(4);
  })

  test('8gb, 4cpu, 4 memory per cpu', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 8);

    expect(memoryPerWorker(4)).toBe(2);
  })

  test('10gb, 4cpu, 3 memory per cpu - rounding', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 10);

    expect(memoryPerWorker(3)).toBe(3);
  })

  test('9gb, 1cpu, 3 memory per cpu - max to number of cpus', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 9);

    expect(memoryPerWorker(3)).toBe(1);
  })

  test('2gb, 2cpu, 3 memory per cpu - minimum 1', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 2);

    expect(memoryPerWorker(3)).toBe(1);
  })
})