import type { ComputedRef } from 'vue'
import { computed, getCurrentInstance } from 'vue'
import { memoize } from 'lodash-unified'
import type { MemoizedFn } from 'memoize-one'
import memoOne from 'memoize-one'

import type { MemoizedFunction } from 'lodash'
import type { VirtualizedProps } from '../props'

export const useCache: () => ComputedRef<(((_: any, __: any, ___: any) => {}) & MemoizedFunction) | MemoizedFn<(_: any, __: any, ___: any) => {}>> = () => {
  const vm = getCurrentInstance()!

  const props = vm.proxy!.$props as VirtualizedProps

  return computed(() => {
    const _getItemStyleCache = (_: any, __: any, ___: any) => ({})
    return props.perfMode
      ? memoize(_getItemStyleCache)
      : memoOne(_getItemStyleCache)
  })
}
