import type { CSSProperties, ComponentInternalInstance } from 'vue'

export type Instance = ComponentInternalInstance

export type Alignment = 'auto' | 'smart' | 'center' | 'start' | 'end'

export type RTLOffsetType =
  | 'negative'
  | 'positive-descending'
  | 'positive-ascending'

export interface ListItem {
  offset: number
  size: number
}

export type ListItemSizer<T, P extends InitListCacheFunc<T>> = (
  props: T,
  index: number,
  cache: ReturnType<P>
) => number

export interface ListCache {
  items: Record<string, ListItem>
  estimatedItemSize: number
  lastVisitedIndex: number
  clearCacheAfterIndex: (idx: number, forceUpdate?: boolean) => void
}

export interface GridCache {
  column: Record<string, ListItem>
  row: Record<string, ListItem>
  estimatedColumnWidth: number
  estimatedRowHeight: number
  lastVisitedColumnIndex: number
  lastVisitedRowIndex: number
}

export type GetEstimatedTotalSize<
  T,
  P extends InitCacheFunc<T, GridCache | ListCache>,
> = (props: T, cache: ReturnType<P>) => number

export type ItemSize = (idx: number) => number

export type GetOffset<T, P extends InitListCacheFunc<T>> = (
  props: T,
  idx: number,
  alignment: Alignment,
  offset: number,
  cache: ReturnType<P>
) => number

export type InitCacheFunc<T, P> = (props: T, cache: Instance) => P

export type InitListCacheFunc<T> = InitCacheFunc<T, ListCache>

export type GetStartIndexForOffset<
  T,
  P extends InitCacheFunc<T, GridCache | ListCache>,
> = (props: T, offset: number, cache: ReturnType<P>) => number

export type GetStopIndexForStartIndex<
  T,
  P extends InitCacheFunc<T, GridCache | ListCache>,
> = (
  props: T,
  startIndex: number,
  scrollOffset: number,
  cache: ReturnType<P>
) => number

export type PropValidator<T> = (props: T) => void

export interface ListConstructorProps<
  T,
  P extends InitListCacheFunc<T> = InitListCacheFunc<T>,
> {
  name?: string
  getItemOffset: ListItemSizer<T, P>
  getEstimatedTotalSize: GetEstimatedTotalSize<T, P>
  getItemSize: ListItemSizer<T, P>
  getOffset: GetOffset<T, P>
  getStartIndexForOffset: GetStartIndexForOffset<T, P>
  getStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>
  initCache: P
  clearCache: boolean
  validateProps: PropValidator<T>
}

export type LayoutDirection = 'horizontal' | 'vertical'

export interface ItemProps<T> {
  data: T
  style: CSSProperties
  scrolling?: boolean
  index: number
}

export interface OptionItemProps {
  item: any
  index: number
  disabled: boolean
}
