import { describe, expect, it } from 'vitest'
import { progressFromRect, progressFromStickySection } from './progress'

function rect(partial: Partial<DOMRect>): DOMRect {
  return { top: 0, height: 0, left: 0, width: 0, bottom: 0, right: 0, x: 0, y: 0, toJSON() {}, ...partial }
}

describe('progressFromRect', () => {
  const viewportH = 1000

  it('is 0 when the element top is at startAt and 1 by endAt', () => {
    expect(progressFromRect(rect({ top: 850 }), viewportH, { startAt: 0.85, endAt: 0.55 })).toBeCloseTo(0, 5)
    expect(progressFromRect(rect({ top: 550 }), viewportH, { startAt: 0.85, endAt: 0.55 })).toBeCloseTo(1, 5)
  })

  it('clamps outside the range', () => {
    expect(progressFromRect(rect({ top: 2000 }), viewportH)).toBe(0)
    expect(progressFromRect(rect({ top: -2000 }), viewportH)).toBe(1)
  })
})

describe('progressFromStickySection', () => {
  const viewportH = 1000

  it('is 0 the instant the container top reaches the viewport top', () => {
    expect(progressFromStickySection(rect({ top: 0, height: 3500 }), viewportH)).toBeCloseTo(0, 5)
  })

  it('is 1 the instant the container bottom reaches the viewport bottom', () => {
    // scrollable distance = 3500 - 1000 = 2500, so top = -2500 is exactly the end
    expect(progressFromStickySection(rect({ top: -2500, height: 3500 }), viewportH)).toBeCloseTo(1, 5)
  })

  it('is 0.5 halfway through the scrollable distance', () => {
    expect(progressFromStickySection(rect({ top: -1250, height: 3500 }), viewportH)).toBeCloseTo(0.5, 5)
  })

  it('clamps outside the range', () => {
    expect(progressFromStickySection(rect({ top: 500, height: 3500 }), viewportH)).toBe(0)
    expect(progressFromStickySection(rect({ top: -9000, height: 3500 }), viewportH)).toBe(1)
  })

  it('handles a container shorter than the viewport without dividing by zero', () => {
    expect(progressFromStickySection(rect({ top: 0, height: 400 }), viewportH)).toBe(1)
    expect(progressFromStickySection(rect({ top: 200, height: 400 }), viewportH)).toBe(0)
  })
})
