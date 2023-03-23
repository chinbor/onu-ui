import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { ItemSize } from './types'

export const virtualizedProps = {
  className: {
    type: String,
    default: '',
  },
  containerElement: {
    type: [String, Object] as PropType<string | Element>,
    default: 'div',
  },
  // FIXME: not same
  data: {
    type: Array as PropType<any[]>,
    default() {
      return []
    },
  },
  direction: {
    type: String as PropType<'ltr' | 'rtl'>,
    default: 'ltr',
  },
  height: {
    type: [String, Number],
    required: true,
  },
  innerElement: {
    type: [String, Object],
    default: 'div',
  },
  style: {
    type: [Object, String, Array] as PropType<StyleValue>,
  },
  useIsScrolling: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    required: false,
  },
  perfMode: {
    type: Boolean,
    default: true,
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
}

export const virtualizedListProps = {
  cache: {
    type: Number,
    default: 2,
  },
  estimatedItemSize: {
    type: Number,
  },
  layout: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
  },
  initScrollOffset: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  itemSize: {
    type: [Number, Function] as PropType<number | ItemSize>,
    required: true,
  },
  ...virtualizedProps,
}

export const outVirtualizedList = {
  data: {
    type: Array,
    required: true,
  },
  width: {
    type: Number,
    default: 200, // 5 items by default
  },
  // 下拉框总高度
  height: {
    type: Number,
    default: 170, // 5 items by default
  },
  // 动态列表预估的每一项高度
  estimatedOptionHeight: {
    type: Number,
    default: undefined,
  },
  itemSize: {
    type: [Number, Function] as PropType<number | ItemSize>,
    default: 34,
  },
} as const

export type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>
export type VirtualizedProps = ExtractPropTypes<typeof virtualizedProps>
