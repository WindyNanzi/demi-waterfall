import type { PropType, Slot } from 'vue-demi'
import type { WaterfallBreakAt, WaterfallItem, WaterfallResponsive } from './types'

/**
 * 默认的响应式
 */
export const defaultResponsive = { lg: 1280, md: 960, sm: 540 }

/**
 * 默认的响应式分栏
 */
export const defaultBreakAt = { xl: 6, lg: 4, md: 3, sm: 2 }

/**
 * 瀑布流组件的 props
 */
export const options = {
  dataList: {
    type: Array as PropType<Array<any>>,
    required: true,
    default: () => [],
  },
  gap: {
    type: Number,
    required: false,
    default: 2,
  },
  responsive: {
    type: Object as PropType<WaterfallResponsive>,
    required: false,
  },
  breakAt: {
    type: Object as PropType<WaterfallBreakAt>,
    required: false,
  },
}

export const WaterfallColOptions = {
  dataList: {
    type: Array as PropType<Array<WaterfallItem>>,
    required: true,
  },
  slot: {
    type: Object as PropType<Slot>,
    required: true,
  },
}

export const WaterfallItemOptions = {
  data: {
    type: Object as PropType<any>,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
}
