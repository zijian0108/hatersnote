export const locales = ["zh-CN", "en-US", "zh-TW"] as const;

export type Locale = (typeof locales)[number];
export const DEVICE_INFO = "device_info";
