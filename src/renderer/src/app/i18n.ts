import enUS from '@renderer/locales/en-US'
import zhCN from '@renderer/locales/zh-CN'
import zhTW from '@renderer/locales/zh-TW'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// 导入类型定义，确保类型提示生效
import type { I18nKey } from '@renderer/types/i18n'

i18n.use(initReactI18next).init({
  resources: {
    "en-US": {
      translation: enUS
    },
    "zh-CN": {
      translation: zhCN
    },
    "zh-TW": {
      translation: zhTW
    }
  },
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false
  }
})

// 类型安全的翻译函数
export const i18nT = (key: I18nKey, options?: Record<string, unknown>) => {
  return i18n.t(key, options)
}

export default i18n
