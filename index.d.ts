export = memoryPerWorker;
/**
 * Calculates the optimal number of workers based on system memory.
 * @param {number} [memory=3] - The amount of memory (in GB) each worker should use.
 * @returns {number} The optimal number of workers.
 */
declare function memoryPerWorker(memory?: number): number;
