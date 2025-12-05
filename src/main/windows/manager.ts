import { is } from "@electron-toolkit/utils";
import type { BrowserWindowConstructorOptions } from "electron";
import { BrowserWindow, screen, shell } from "electron";
import { join } from "node:path";
import icon from "../../../resources/icon.png?asset";
import { WINDOWS_CONFIG } from "./config";

export interface WindowConfig {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  [key: string]: unknown;
}

export interface CreateWindowOptions extends BrowserWindowConstructorOptions {
  /**
   * 窗口ID，用于标识和管理窗口
   */
  id: string;
  /**
   * 是否使用预设配置（从 WINDOWS_CONFIG 中读取）
   */
  useConfig?: keyof typeof WINDOWS_CONFIG;
  /**
   * 窗口加载的路径（相对于 renderer 目录）
   * 如果未提供，将根据窗口ID自动推断
   */
  loadPath?: string;
  /**
   * 是否在创建后立即显示窗口
   */
  show?: boolean;
  /**
   * 是否居中显示窗口
   */
  center?: boolean;
  /**
   * 窗口关闭时的回调
   */
  onClose?: () => void;
}

export class WindowManager {
  private static instance: WindowManager;
  private windows = new Map<string, BrowserWindow>();

  private constructor() {
    // 监听所有窗口关闭事件，自动清理
    BrowserWindow.getAllWindows().forEach((win) => {
      win.on("closed", () => {
        this.cleanupWindow(win.id);
      });
    });
  }

  /**
   * 获取窗口管理器单例实例
   */
  static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager();
    }
    return WindowManager.instance;
  }

  /**
   * 创建窗口
   * @param options 窗口创建选项
   * @returns 创建的 BrowserWindow 实例
   */
  createWindow(options: CreateWindowOptions): BrowserWindow {
    const {
      id,
      useConfig,
      loadPath,
      show = false,
      center = true,
      onClose,
      ...restOptions
    } = options;

    // 检查窗口是否已存在
    if (this.windows.has(id)) {
      const existingWindow = this.windows.get(id);
      if (existingWindow && !existingWindow.isDestroyed()) {
        existingWindow.focus();
        return existingWindow;
      }
      // 如果窗口已销毁，从 Map 中移除
      this.windows.delete(id);
    }

    // 合并配置
    const config = useConfig ? (WINDOWS_CONFIG[useConfig] as WindowConfig) : {};
    const windowOptions: BrowserWindowConstructorOptions = {
      autoHideMenuBar: true,
      titleBarStyle: "hidden",
      show: false, // 先不显示，等 ready-to-show 事件
      ...config,
      ...restOptions,
      ...(process.platform === "linux" ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
        ...restOptions.webPreferences
      }
    };

    // 创建窗口
    const window = new BrowserWindow(windowOptions);

    // 居中显示
    if (center) {
      this.centerWindow(window);
    }

    // 设置外部链接处理
    window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });

    // 加载内容
    this.loadWindowContent(window, loadPath || id);

    // 显示窗口
    if (show) {
      window.once("ready-to-show", () => {
        window.show();
      });
    }

    // 监听关闭事件
    window.on("closed", () => {
      this.windows.delete(id);
      onClose?.();
    });

    // 存储窗口
    this.windows.set(id, window);

    return window;
  }

  /**
   * 获取窗口
   * @param id 窗口ID
   * @returns BrowserWindow 实例，如果不存在则返回 undefined
   */
  getWindow(id: string): BrowserWindow | undefined {
    const window = this.windows.get(id);
    if (window && !window.isDestroyed()) {
      return window;
    }
    // 如果窗口已销毁，从 Map 中移除
    if (window) {
      this.windows.delete(id);
    }
    return undefined;
  }

  /**
   * 获取所有窗口
   * @returns 所有活跃的窗口数组
   */
  getAllWindows(): BrowserWindow[] {
    const activeWindows: BrowserWindow[] = [];
    this.windows.forEach((window, id) => {
      if (!window.isDestroyed()) {
        activeWindows.push(window);
      } else {
        this.windows.delete(id);
      }
    });
    return activeWindows;
  }

  /**
   * 关闭窗口
   * @param id 窗口ID
   * @param force 是否强制关闭（不触发 close 事件）
   */
  closeWindow(id: string, force = false): boolean {
    const window = this.getWindow(id);
    if (!window) {
      return false;
    }

    if (force) {
      window.destroy();
    } else {
      window.close();
    }

    return true;
  }

  /**
   * 关闭所有窗口
   */
  closeAllWindows(): void {
    this.windows.forEach((window) => {
      if (!window.isDestroyed()) {
        window.close();
      }
    });
    this.windows.clear();
  }

  /**
   * 聚焦窗口
   * @param id 窗口ID
   */
  focusWindow(id: string): boolean {
    const window = this.getWindow(id);
    if (!window) {
      return false;
    }

    if (window.isMinimized()) {
      window.restore();
    }
    window.focus();
    return true;
  }

  /**
   * 发送消息到所有窗口
   * @param channel 消息通道
   * @param args 消息参数
   */
  sendToAllWindows(channel: string, ...args: unknown[]): void {
    this.windows.forEach((window) => {
      window.webContents.send(channel, ...args);
    });
  }

  /**
   * 检查窗口是否存在
   * @param id 窗口ID
   */
  hasWindow(id: string): boolean {
    return this.getWindow(id) !== undefined;
  }

  /**
   * 居中显示窗口
   * @param window 窗口实例
   */
  private centerWindow(window: BrowserWindow): void {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    const windowBounds = window.getBounds();
    const x = Math.floor((width - windowBounds.width) / 2);
    const y = Math.floor((height - windowBounds.height) / 2);
    window.setPosition(x, y);
  }

  /**
   * 加载窗口内容
   * @param window 窗口实例
   * @param path 加载路径（可以是窗口ID或自定义路径）
   */
  private loadWindowContent(window: BrowserWindow, path: string): void {
    // 开发环境：加载开发服务器 URL
    if (is.dev && process.env.ELECTRON_RENDERER_URL) {
      const url =
        path === "main" || path === "login"
          ? `${process.env.ELECTRON_RENDERER_URL}/${path === "main" ? "" : path}`
          : process.env.ELECTRON_RENDERER_URL;
      window.loadURL(url);
    } else {
      // 生产环境：加载本地 HTML 文件
      window.loadFile(join(__dirname, "../renderer/index.html"), {
        hash: path === "main" ? "" : path
      });
    }
  }

  /**
   * 清理已销毁的窗口
   * @param windowId 窗口ID
   */
  private cleanupWindow(windowId: number): void {
    this.windows.forEach((window, id) => {
      if (window.id === windowId) {
        this.windows.delete(id);
      }
    });
  }
}
