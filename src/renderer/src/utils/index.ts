import { locales, type Locale } from "@renderer/constants";

export const isDefineLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};
