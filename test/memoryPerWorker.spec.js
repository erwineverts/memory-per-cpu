const os = require('os');
const memoryPerWorker = require('../src/index');

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

  test('default parameter - uses 3GB memory when no parameter provided', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 12);

    expect(memoryPerWorker()).toBe(4); // 12GB / 3GB = 4 workers
  })

  test('fractional memory values', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 8);

    expect(memoryPerWorker(1.5)).toBe(4); // 8GB / 1.5GB = 5.33, clamped to 4 CPUs
    expect(memoryPerWorker(0.5)).toBe(4); // 8GB / 0.5GB = 16, clamped to 4 CPUs
  })

  test('zero and negative memory values throw errors', () => {
    expect(() => memoryPerWorker(0)).toThrow('Memory per worker must be greater than 0');
    expect(() => memoryPerWorker(-1)).toThrow('Memory per worker must be greater than 0');
    expect(() => memoryPerWorker(-5.5)).toThrow('Memory per worker must be greater than 0');
  })

  test('very large memory values', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 8);

    expect(memoryPerWorker(100)).toBe(1); // 8GB / 100GB = 0.08, floored to 0, clamped to min 1
  })

  test('system memory rounding behavior', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    // 7.7GB total memory should round to 8GB
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 7.7);

    expect(memoryPerWorker(2)).toBe(4); // Math.round(7.7) = 8, 8/2 = 4 workers
  })

  test('system memory rounding behavior - round down', () => {
    jest.spyOn(os, 'cpus').mockImplementation(() => [1,2,3,4]);
    // 7.4GB total memory should round to 7GB
    jest.spyOn(os, 'totalmem').mockImplementation(() => MEMORY_PER_GB * 7.4);

    expect(memoryPerWorker(2)).toBe(3); // Math.round(7.4) = 7, 7/2 = 3.5, floored to 3 workers
  })
})