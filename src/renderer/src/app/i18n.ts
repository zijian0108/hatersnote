import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// 导入类型定义，确保类型提示生效
import { store } from "@renderer/app/store";
import { updateDeviceInfo } from "@renderer/features/app/appSlice";
import type { I18nKey } from "@renderer/types/i18n";
import { isDefineLocale } from "@renderer/utils";

// 动态加载语言包
const loadLanguageResources = async (lang: string) => {
  try {
    let module;
    switch (lang) {
      case "zh-CN":
        module = await import("@renderer/locales/zh-CN");
        break;
      case "zh-TW":
        module = await import("@renderer/locales/zh-TW");
        break;
      case "en-US":
      default:
        module = await import("@renderer/locales/en-US");
        break;
    }
    return module.default;
  } catch (error) {
    console.error(`Failed to load language resources for ${lang}:`, error);
    // 如果加载失败，回退到英文
    const fallbackModule = await import("@renderer/locales/en-US");
    return fallbackModule.default;
  }
};

// 初始化 i18n
export const initI18n = async () => {
  const deviceInfo = await window.api.getDeviceInfo();
  store.dispatch(updateDeviceInfo(deviceInfo));
  const systemLang = isDefineLocale(deviceInfo.sys_lang)
    ? deviceInfo.sys_lang
    : "en-US";
  const resources = await loadLanguageResources(systemLang);

  await i18n.use(initReactI18next).init({
    resources: {
      [systemLang]: {
        translation: resources
      }
    },
    lng: systemLang,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false
    }
  });
};

export const i18nT = (key: I18nKey, options?: Record<string, unknown>) => {
  return i18n.t(key, options);
};

export default i18n;
