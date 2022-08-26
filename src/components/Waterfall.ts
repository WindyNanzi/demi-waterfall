import { nanoid } from 'nanoid/non-secure'
import type { DefineComponent, StyleValue } from 'vue-demi'
import { computed, defineComponent, h, inject, unref } from 'vue-demi'

import { useCurrentScreen } from '../composables'
import { InjectionOptions } from '../constants'
import { defaultBreakAt, options } from '../options'
import type { ScreenType, WaterfallItem, WaterfallOptions } from '../types'
import { removeInvalidProps } from '../utils'
import { WaterfallCol } from './WaterfallCol'

export const Waterfall = defineComponent({
  name: 'Waterfall',
  props: options,
  setup(props, { slots }) {
    const sp = inject(InjectionOptions)
    const options = {
      ...sp,
      ...removeInvalidProps(props),
    }

    const style = computed((): StyleValue => {
      return {
        display: 'flex',
        gap: `${props.gap}rem`,
      }
    })
    const currentScreen = useCurrentScreen(options.responsive)
    const breakAt = Object.assign(defaultBreakAt, options.breakAt)

    const col = computed(() => {
      const screen: ScreenType = unref(currentScreen)
      return breakAt[screen]
    })

    const columnWidth = computed(() => {
      const len = unref(col)!
      const gapWidth = (props.gap * (len - 1)) / len
      const percent = 100 / len
      return `calc(${percent}% - ${gapWidth}rem)`
    })

    const columns = computed(() => {
      const columnLength = unref(col)!
      const list: Array<Array<WaterfallItem>> = Array.from(new Array(columnLength), () => [])

      const data = (props.dataList || []).map((item: any) => ({ val: item, key: nanoid() }))
      for (let i = 0, len = data.length; i < len; i++) {
        const pushIndex = i % columnLength
        list[pushIndex].push({ data: data[i].val, order: pushIndex, key: data[i].key })
      }
      return list
    })

    const columnStyle = computed((): StyleValue => {
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: `${props.gap}rem`,
        width: unref(columnWidth),
      }
    })

    return () => {
      return h(
        'div',
        {
          style: style.value,
        },
        {
          default: () => columns.value.map((column: any) => h(
            'div',
            {
              style: columnStyle.value,
            },
            h(
              WaterfallCol,
              {
                dataList: column,
              },
              {
                default: (scope: any) => slots.default?.(scope),
              },
            ),
          )),
        },
      )
    }
  },
}) as DefineComponent<WaterfallOptions>
