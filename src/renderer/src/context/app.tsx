import { useAppSelector } from "@renderer/app/hooks";
import i18n from "@renderer/app/i18n";
import { locales, type Locale } from "@renderer/constants";
import { createContext, useContext, useEffect, useState } from "react";

type AppContext = {
  locale?: Locale;
  isDarkMode?: boolean;
  setLocale?: (locale: Locale) => void;
  setIsDarkMode?: (isDarkMode: boolean) => void;
};

const appContext = createContext<AppContext>({
  locale: "en-US",
  isDarkMode: false
});

const isDefineLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [locale, setLocale] = useState<Locale>("en-US");

  const deviceInfo = useAppSelector((state) => state.app.deviceInfo);

  useEffect(() => {
    const { sys_lang } = deviceInfo;
    if (isDefineLocale(sys_lang) && sys_lang !== locale) {
      setLocale(sys_lang);
    }
  }, [deviceInfo]);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <appContext.Provider
      value={{ locale, isDarkMode, setLocale, setIsDarkMode }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useApp = () => {
  return useContext(appContext);
};
