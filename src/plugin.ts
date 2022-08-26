import type { Plugin } from 'vue'
import { Waterfall } from './components/Waterfall'
import { InjectionOptions } from './constants'
import type { WaterfallPluginOption } from './types'

export function WaterfallPlugin(defaultPluginOptions: WaterfallPluginOption = {}): Plugin {
  return {
    install(app) {
      app.provide(InjectionOptions, defaultPluginOptions)
      app.component('Waterfall', Waterfall)
    },
  }
}
