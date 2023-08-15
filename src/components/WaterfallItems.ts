import type { StyleValue } from 'vue-demi'
import { Teleport, defineComponent, h, onMounted, ref, watch } from 'vue-demi'

import { WaterfallItemOptions } from '../options'

//
// import classes from '../css/waterfall.module.css'

export const WaterfallItem = defineComponent({
  name: 'WaterfallItem',
  props: WaterfallItemOptions,
  setup(props, { slots }) {
    const style: StyleValue = { boxSizing: 'border-box', transition: 'all 1s ease' }
    const className = 'teleport-item'

    onMounted(() => {
      console.log('mounted')
      document.querySelectorAll('.teleport-item').forEach((el) => {
        el.addEventListener('transitionstart', () => console.log('start'))
        el.addEventListener('transitionend', () => console.log('start'))
      })
    })

    // watch(
    //   () => props.to,
    //   () => {
    //     className.value = classes.fadeIn
    //     setTimeout(() => {
    //       className.value = classes.fadeOut
    //     }, 500)
    //   },
    // )

    return () => {
      return h(
        Teleport,
        { to: `[port = '${props.to}']` },
        h(
          'div',
          {
            ...props,
            style,
            class: className,
          },
          {
            default: () => slots.default?.({ data: props.data }),
          },
        ),
      )
    }
  },
})
