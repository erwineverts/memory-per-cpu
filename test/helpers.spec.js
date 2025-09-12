const { clamp } = require('../src/helpers');

describe('clamp function', () => {
  test('clamps value below minimum', () => {
    expect(clamp(5, 10, 20)).toBe(10);
  })

  test('clamps value above maximum', () => {
    expect(clamp(25, 10, 20)).toBe(20);
  })

  test('returns value within range', () => {
    expect(clamp(15, 10, 20)).toBe(15);
  })

  test('handles edge case where value equals minimum', () => {
    expect(clamp(10, 10, 20)).toBe(10);
  })

  test('handles edge case where value equals maximum', () => {
    expect(clamp(20, 10, 20)).toBe(20);
  })

  test('handles negative numbers', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  })
})