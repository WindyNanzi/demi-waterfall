import type { InjectionKey } from 'vue'
import type { WaterfallPluginOption } from './types'

export const InjectionOptions = Symbol('demi-waterfall') as InjectionKey<WaterfallPluginOption>
