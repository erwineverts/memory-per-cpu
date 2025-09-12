# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Node.js utility package that calculates the optimal number of workers based on system memory and CPU count. The primary use case is for testing frameworks like Jest where you want to limit parallelism based on available memory.

## Core Architecture

- **Single function utility**: The main export is `memoryPerWorker(memory)` which takes memory per worker in GB (default 3GB) and returns optimal worker count
- **Algorithm**: `Math.floor(systemMemory / memoryPerWorker)` clamped between 1 and CPU count
- **Helper function**: `clamp(num, min, max)` utility for constraining values
- **TypeScript support**: Includes `index.d.ts` with proper type definitions

## Common Commands

### Testing
```bash
npm test          # Run Jest tests
```

### Development
```bash
node index.js     # Run directly (uses 0.5GB default when called directly)
```

## Key Files

- `index.js` - Main implementation with `memoryPerWorker` function and `clamp` helper
- `index.d.ts` - TypeScript definitions
- `memoryPerWorker.spec.js` - Jest test suite with various memory/CPU scenarios
- `package.json` - NPM package configuration, exports `index.js` and `index.d.ts`

## Testing Approach

Uses Jest with comprehensive test cases covering:
- Different memory/CPU combinations
- Rounding behavior
- Minimum (1) and maximum (CPU count) constraints
- Mocks `os.cpus()` and `os.totalmem()` for consistent testing

## Package Details

- Published to NPM as `memory-per-cpu`
- Version managed in `package.json`
- Exports both CommonJS module and TypeScript definitions
- Main use case: Jest `maxWorkers` configuration