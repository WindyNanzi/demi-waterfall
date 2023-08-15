import type { defaultBreakAt, defaultResponsive } from './options'

export type WaterfallBreakAt = Partial<typeof defaultBreakAt>

/**
 * 分成 4 类屏幕, [超大屏 | 大屏 | 中屏 | 小屏] => [xl | lg | md | sm]
 */
export type ScreenType = keyof WaterfallBreakAt

export type WaterfallResponsive = typeof defaultResponsive

export interface WaterfallPluginOption {
  /**
   * 在各个屏幕下的栅格配置
   */
  breakAt?: WaterfallBreakAt

  /**
   * 各响应式对应的像素
   */
  responsive?: WaterfallResponsive
}

export interface WaterfallOptions extends WaterfallPluginOption {
  /**
   * 数据列表
   */
  dataList: Array<any>
  /**
   * 瀑布流，各个数据项的间距
   */
  gap?: number
}

export interface WaterfallItemOptions {
  data: any
  key: string
  to: string
}
