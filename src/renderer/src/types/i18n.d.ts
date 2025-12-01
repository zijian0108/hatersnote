import enUS from "@renderer/locales/en-US/index";
import "react-i18next";
import type { ParseKeys } from "i18next";

// 扩展 react-i18next 的类型定义
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enUS;
    };
  }
}

// 扩展 i18next 的类型定义（用于 i18n.t 方法）
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enUS;
    };
  }
}

// 导出翻译 key 类型，供其他地方使用
import type { ParseKeys } from "i18next";
export type I18nKey = ParseKeys<"translation">;
