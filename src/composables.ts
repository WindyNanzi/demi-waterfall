import { useMediaQuery } from '@vueuse/core'
import { computed, unref } from 'vue-demi'
import { defaultResponsive } from './options'
import type { ScreenType } from './types'

/**
 * 返回当前的屏幕大小类型
 */
export function useCurrentScreen(
  responsive = defaultResponsive,
) {
  const { lg, md, sm } = responsive
  const isXl = useMediaQuery(`(min-width: ${lg}px)`)
  const isLg = useMediaQuery(`(min-width: ${md}px) and (max-width: ${lg}px)`)
  const isMd = useMediaQuery(`(min-width: ${sm}px) and (max-width: ${md}px)`)

  return computed(() => {
    let screen: ScreenType = 'sm'

    screen = unref(isMd) ? 'md' : unref(screen)
    screen = unref(isLg) ? 'lg' : unref(screen)
    screen = unref(isXl) ? 'xl' : unref(screen)
    return screen
  })
}

export const isXl = useMediaQuery('(min-width: 1080px)')
