import { useAppDispatch, useAppSelector } from "@renderer/app/hooks";
import { updateSystemTheme, type Theme } from "@renderer/features/app/appSlice";
import { createContext, useContext, useEffect } from "react";

type AppContext = {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
};

const appContext = createContext<AppContext>({
  theme: "light"
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.app.system_theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = window.api.onThemeUpdated((theme) => {
      setTheme(theme);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (theme: Theme) => {
    dispatch(updateSystemTheme(theme));
  };

  return (
    <appContext.Provider value={{ theme, setTheme }}>
      <div className="window-drag-region" />
      {children}
    </appContext.Provider>
  );
};

export const useApp = () => {
  return useContext(appContext);
};
