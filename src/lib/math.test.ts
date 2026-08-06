import { describe, expect, it } from 'vitest'
import { clamp, clamp01, easeTowards, lerp, remap } from './math'

describe('clamp01', () => {
  it('clamps below 0 and above 1', () => {
    expect(clamp01(-0.5)).toBe(0)
    expect(clamp01(1.5)).toBe(1)
    expect(clamp01(0.3)).toBe(0.3)
  })
})

describe('clamp', () => {
  it('clamps to an arbitrary range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe('remap', () => {
  it('maps a sub-range to 0..1', () => {
    expect(remap(0.14, [0.14, 0.3])).toBe(0)
    expect(remap(0.3, [0.14, 0.3])).toBe(1)
    expect(remap(0.22, [0.14, 0.3])).toBeCloseTo(0.5, 5)
  })

  it('clamps outside the range', () => {
    expect(remap(0, [0.14, 0.3])).toBe(0)
    expect(remap(1, [0.14, 0.3])).toBe(1)
  })
})

describe('lerp', () => {
  it('interpolates linearly', () => {
    expect(lerp(0, 10, 0.5)).toBe(5)
    expect(lerp(10, 20, 0)).toBe(10)
    expect(lerp(10, 20, 1)).toBe(20)
  })
})

describe('easeTowards', () => {
  it('moves current a fraction of the way to target', () => {
    expect(easeTowards(0, 100, 0.1)).toBeCloseTo(10, 5)
    expect(easeTowards(90, 100, 0.5)).toBeCloseTo(95, 5)
  })

  it('converges to target over repeated calls', () => {
    let current = 0
    for (let i = 0; i < 200; i++) current = easeTowards(current, 100, 0.14)
    expect(current).toBeCloseTo(100, 5)
  })
})
