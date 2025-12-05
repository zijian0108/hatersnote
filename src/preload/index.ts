import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";

// Custom APIs for renderer
const api = {
  getDeviceInfo: () => {
    return electronAPI.ipcRenderer.invoke("get-device-info");
  },
  /**
   * 检查是否有登录凭证
   */
  checkAuth: () => {
    const authorization = localStorage.getItem("authorization");
    return !!authorization;
  },
  /**
   * 通知主进程登录成功
   */
  onLoginSuccess: () => {
    electronAPI.ipcRenderer.send("login-success");
  },
  /**
   * 监听系统主题变化
   */
  onThemeUpdated: (callback: (theme: string) => void) => {
    electronAPI.ipcRenderer.on("theme-updated", (_, theme) => {
      callback(theme);
    });
    return () => {
      electronAPI.ipcRenderer.removeAllListeners("theme-updated");
    };
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI;
  // @ts-expect-error (define in dts)
  window.api = api;
}
