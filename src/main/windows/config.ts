import type { BrowserWindowConstructorOptions } from "electron";

export interface WindowConfigType
  extends Partial<BrowserWindowConstructorOptions> {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
}

/**
 * 窗口配置
 * 定义应用中所有窗口的默认配置
 */
export const WINDOWS_CONFIG: Record<string, WindowConfigType> = {
  login: {
    width: 390,
    height: 744,
    resizable: false,
    frame: true,
    transparent: false
  },
  main: {
    width: 1056,
    height: 744,
    minWidth: 1056,
    minHeight: 744,
    resizable: true,
    frame: true
  }
} as const;

/**
 * 窗口类型
 */
export type WindowType = keyof typeof WINDOWS_CONFIG;
