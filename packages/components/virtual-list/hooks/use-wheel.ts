import { cAF, isFirefox, rAF } from '@onu-ui/utils'
import type { ComputedRef } from 'vue'
import { HORIZONTAL, VERTICAL } from '../defaults'

import type { LayoutDirection } from '../types'

const LayoutKeys = {
  [HORIZONTAL]: 'deltaX',
  [VERTICAL]: 'deltaY',
}

interface ListWheelState {
  atStartEdge: ComputedRef<boolean> // exclusive to reachEnd
  atEndEdge: ComputedRef<boolean>
  layout: ComputedRef<LayoutDirection>
}

type ListWheelHandler = (offset: number) => void

export const useWheel = (
  { atEndEdge, atStartEdge, layout }: ListWheelState,
  onWheelDelta: ListWheelHandler,
) => {
  let frameHandle: number
  let offset = 0

  const hasReachedEdge = (offset: number) => {
    const edgeReached
      = (offset < 0 && atStartEdge.value) || (offset > 0 && atEndEdge.value)

    return edgeReached
  }

  const onWheel = (e: WheelEvent) => {
    cAF(frameHandle)

    const newOffset = e[LayoutKeys[layout.value]]

    if (hasReachedEdge(offset) && hasReachedEdge(offset + newOffset))
      return

    offset += newOffset

    if (!isFirefox())
      e.preventDefault()

    frameHandle = rAF(() => {
      onWheelDelta(offset)
      offset = 0
    })
  }

  return {
    hasReachedEdge,
    onWheel,
  }
}
