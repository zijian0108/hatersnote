import enUS from '@renderer/locales/en-US';
import 'react-i18next';

// 从翻译对象中提取所有的 key
type TranslationKeys = keyof typeof enUS;

// 扩展 react-i18next 的类型定义
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enUS;
    };
  }
}

// 扩展 i18next 的类型定义（用于 i18n.t 方法）
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enUS;
    };
  }
}

// 导出翻译 key 类型，供其他地方使用
export type I18nKey = TranslationKeys;
