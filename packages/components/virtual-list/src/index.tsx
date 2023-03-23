import { isUndefined } from '@onu-ui/utils'
import type { ItemProps, OptionItemProps } from '../types'
import { outVirtualizedList } from '../props'
import { ITEM_RENDER_EVT, SCROLL_EVT } from '../defaults'
import FixedSizeList from './fixed-size-list'
import DynamicSizeList from './dynamic-size-list'
import OptionItem from './option-item.vue'

export default defineComponent({
  name: 'OVirtualList',

  props: outVirtualizedList,
  emits: [ITEM_RENDER_EVT, SCROLL_EVT],
  setup(props, { slots, emit }) {
    const listRef = ref<InstanceType<typeof DynamicSizeList> | null>(null)

    const isSized = computed(() =>
      isUndefined(props.estimatedOptionHeight),
    )

    const listHeight = computed(() => {
      const totalHeight = props.data.length * 34
      return totalHeight > props.height ? props.height : totalHeight
    })

    // return 34（默认每一项的高度）
    const listProps = computed(() => {
      if (isSized.value) {
        return {
          itemSize: props.itemSize,
        }
      }

      return {
        estimatedItemSize: props.estimatedOptionHeight,
        itemSize: props.itemSize,
      }
    })

    const Item = (itemProps: ItemProps<any>) => {
      const { index, data } = itemProps
      const item = data[index]

      return (
        <OptionItem
          {...itemProps}
          item={item}
        >
          {{
            default: (props: OptionItemProps) =>
              slots.default?.(props) || <span>{item.label}</span>,
          }}
        </OptionItem>
      )
    }

    const onItemRendered = (...a) => {
      emit(ITEM_RENDER_EVT, a)
    }

    const onScroll = (...a) => {
      emit(SCROLL_EVT, a)
    }

    return () => {
      const { data, width } = props
      const List = unref(isSized) ? FixedSizeList : DynamicSizeList

      if (data.length === 0) {
        return (
          <div
            style={{
              width: `${width}px`,
            }}
          >
            {slots.empty?.()}
          </div>
        )
      }

      return (
        <div>
          <List
            ref={listRef}
            {...unref(listProps)}
            data={data}
            height={listHeight.value}
            width={width}
            total={data.length}
            onItemRendered={onItemRendered}
            onScroll={onScroll}
          >
            {{
              default: (props: ItemProps<any>) => slots.default?.(props) || <Item {...props} />,
            }}
          </List>
        </div>
      )
    }
  },
})
