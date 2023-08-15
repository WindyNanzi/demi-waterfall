import { nanoid } from 'nanoid/non-secure'
import type { DefineComponent, StyleValue } from 'vue-demi'
import { computed, defineComponent, h, inject, nextTick, ref, unref, watch } from 'vue-demi'

import { useCurrentScreen } from '../composables'
import { InjectionOptions } from '../constants'
import { defaultBreakAt, options } from '../options'
import type { ScreenType, WaterfallItemOptions, WaterfallOptions } from '../types'

import { removeInvalidProps } from '../utils'
import { WaterfallItem } from './WaterfallItems'

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

    const dataList = (props.dataList || []).map((item: any) => ({ val: item, key: nanoid(10) }))

    const columnPortNames = ref([] as Array<string>)

    const waterfallItems = ref([] as Array<WaterfallItemOptions>)

    watch(
      () => col.value,
      (len) => {
        const newItems: Array<WaterfallItemOptions> = []
        const portNames = [] as Array<string>
        for (let i = 0; i < unref(col); i++)
          portNames.push(nanoid(10))

        columnPortNames.value = portNames

        for (let i = 0; i < dataList.length; i++) {
          const pushIndex = i % len
          newItems.push({ data: dataList[i].val, key: dataList[i].key, to: portNames[pushIndex] })
        }
        nextTick(() => waterfallItems.value = newItems)
      },
      { immediate: true },
    )

    const columnStyle = computed((): StyleValue => {
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: `${props.gap}rem`,
        width: unref(columnWidth),
        position: 'relative',
      }
    })

    return () => {
      return h(
        'div',
        {
          style: style.value,
        },
        [
          columnPortNames.value.map((port: string) => h(
            'div',
            {
              style: columnStyle.value,
              port,
            }),
          ),
          waterfallItems.value.map((waterfallItem: WaterfallItemOptions) => h(
            WaterfallItem,
            {
              ...waterfallItem,
            },
            {
              default: (scope: any) => slots.default?.(scope),
            },
          )),
        ],
      )
    }
  },
}) as DefineComponent<WaterfallOptions>
