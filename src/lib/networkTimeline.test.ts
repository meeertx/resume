import { describe, expect, it } from 'vitest'
import {
  HUB_BASE_SIZE,
  NODE_COUNT,
  NODES_DONE_P,
  hintOpacity,
  hubBorderRadius,
  hubGlyphOpacity,
  hubScale,
  nodeAngle,
  nodeProgress,
  nodeTargetOffset,
  pFromScrollY,
} from './networkTimeline'

// A roomy desktop viewport where the responsive cap never kicks in — used
// to test hubScale's underlying growth curve in isolation from clamping.
const DESKTOP_VW = 1440
const DESKTOP_VH = 900

describe('pFromScrollY', () => {
  it('maps scrollY 0..introHeight to p 0..1, clamped', () => {
    expect(pFromScrollY(0, 3500)).toBe(0)
    expect(pFromScrollY(1750, 3500)).toBe(0.5)
    expect(pFromScrollY(3500, 3500)).toBe(1)
    expect(pFromScrollY(9000, 3500)).toBe(1)
  })
})

describe('nodeProgress', () => {
  it('is 0 before a node starts and 1 once it has arrived', () => {
    expect(nodeProgress(0, 0)).toBe(0)
    expect(nodeProgress(1, 0)).toBe(1)
    expect(nodeProgress(1, NODE_COUNT - 1)).toBe(1)
  })

  it('staggers later nodes behind earlier ones', () => {
    const pMid = 0.1
    expect(nodeProgress(pMid, 0)).toBeGreaterThan(nodeProgress(pMid, 4))
  })

  it('all nodes have arrived by NODES_DONE_P', () => {
    for (let i = 0; i < NODE_COUNT; i++) {
      expect(nodeProgress(NODES_DONE_P, i)).toBeCloseTo(1, 5)
    }
  })
})

describe('hubScale', () => {
  it('starts at 1 and grows monotonically to 2.6 on a roomy viewport', () => {
    expect(hubScale(0, DESKTOP_VW, DESKTOP_VH)).toBe(1)
    expect(hubScale(1, DESKTOP_VW, DESKTOP_VH)).toBeCloseTo(2.6, 5)
    expect(hubScale(0.8, DESKTOP_VW, DESKTOP_VH)).toBeGreaterThan(hubScale(0.4, DESKTOP_VW, DESKTOP_VH))
  })

  it('eases IN — late growth outpaces early growth (apparent size ~ 1/distance)', () => {
    const early = hubScale(0.3, DESKTOP_VW, DESKTOP_VH) - hubScale(0.1, DESKTOP_VW, DESKTOP_VH)
    const late = hubScale(1, DESKTOP_VW, DESKTOP_VH) - hubScale(0.8, DESKTOP_VW, DESKTOP_VH)
    expect(late).toBeGreaterThan(early * 2)
  })

  it('caps on a narrow phone so the hub never exceeds 85% of the screen', () => {
    const vw = 375
    const vh = 844
    const scale = hubScale(1, vw, vh)
    const finalSizePx = scale * HUB_BASE_SIZE
    expect(finalSizePx).toBeLessThanOrEqual(Math.min(vw, vh) * 0.85 + 0.01)
  })
})

describe('hubBorderRadius', () => {
  it('is 0% at the start, 25% at the midpoint, 50% (a true circle) at the end', () => {
    expect(hubBorderRadius(0)).toBe(0)
    expect(hubBorderRadius(0.5)).toBeCloseTo(25, 5)
    expect(hubBorderRadius(1)).toBeCloseTo(50, 5)
  })
})

describe('hubGlyphOpacity', () => {
  it('fades in over the first 8% of scroll, then holds at 1 — no later crossfade', () => {
    expect(hubGlyphOpacity(0)).toBe(0)
    expect(hubGlyphOpacity(0.04)).toBeCloseTo(0.5, 5)
    expect(hubGlyphOpacity(0.08)).toBe(1)
    expect(hubGlyphOpacity(0.5)).toBe(1)
    expect(hubGlyphOpacity(1)).toBe(1)
  })
})

describe('nodeAngle / nodeTargetOffset', () => {
  it('distributes all nodes evenly around a full circle', () => {
    const angles = Array.from({ length: NODE_COUNT }, (_, i) => nodeAngle(i))
    const span = angles[angles.length - 1] - angles[0]
    expect(span).toBeCloseTo((Math.PI * 2 * (NODE_COUNT - 1)) / NODE_COUNT, 5)
  })

  it('starts at 12 o\'clock (straight up)', () => {
    expect(nodeAngle(0)).toBeCloseTo(-Math.PI / 2, 5)
  })

  it('scales radius with the smaller viewport dimension', () => {
    const small = nodeTargetOffset(0, 800, 600)
    const large = nodeTargetOffset(0, 1600, 1200)
    const distSmall = Math.hypot(small.x, small.y)
    const distLarge = Math.hypot(large.x, large.y)
    expect(distLarge).toBeCloseTo(distSmall * 2, 5)
  })
})

describe('hintOpacity', () => {
  it('fades out almost immediately once scrolling starts', () => {
    expect(hintOpacity(0)).toBe(1)
    expect(hintOpacity(0.06)).toBeCloseTo(0, 5)
    expect(hintOpacity(0.5)).toBe(0)
  })
})
