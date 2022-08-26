import type { StyleValue } from 'vue-demi'
import { TransitionGroup, defineComponent, h } from 'vue-demi'

import { WaterfallColOptions } from '../options'

export const WaterfallCol = defineComponent({
  name: 'WaterfallCol',
  props: WaterfallColOptions,
  setup(props) {
    return () => {
      const style: StyleValue = { boxSizing: 'border-box' }

      return h(
        TransitionGroup,
        null,
        props.dataList?.map(item => h(
          'div',
          {
            ...item,
            style,
          },
          [
            props.slot?.({ data: item.data, order: item.order }),
          ],
        )),
      )
    }
  },
})
