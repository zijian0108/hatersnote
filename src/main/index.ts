import { electronApp, optimizer } from "@electron-toolkit/utils";
import {
  BrowserWindow,
  app,
  ipcMain,
  nativeTheme,
  screen,
  shell
} from "electron";
import si from "systeminformation";
import { WindowManager } from "./windows/manager";

const windowManager = WindowManager.getInstance();

/**
 * 创建主窗口
 */
function createMainWindow(): void {
  const mainWindow = windowManager.createWindow({
    id: "main",
    useConfig: "main",
    show: true,
    center: true
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
}

/**
 * 创建登录窗口
 */
function createLoginWindow(): void {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const x = width - 390 - 200;
  const y = Math.floor((height - 744) / 2);
  const loginWindow = windowManager.createWindow({
    id: "login",
    useConfig: "login",
    loadPath: "login",
    show: false, // 先不显示，等检查完登录状态后再决定
    center: false,
    x,
    y,
    titleBarOverlay: true
  });

  // 监听登录窗口加载完成，检查登录状态
  loginWindow.webContents.once("did-finish-load", () => {
    // 通过执行脚本检查是否有登录凭证
    loginWindow.webContents
      .executeJavaScript(
        `
      (() => {
        const hasAuth = !!localStorage.getItem('authorization');
        return hasAuth;
      })()
    `
      )
      .then((hasAuth: boolean) => {
        if (hasAuth) {
          // 有登录凭证，关闭登录窗口，打开主窗口
          windowManager.closeWindow("login");
          createMainWindow();
        } else {
          // 没有登录凭证，显示登录窗口
          loginWindow.show();
        }
      })
      .catch((error) => {
        console.error("检查登录状态失败:", error);
        // 出错时默认显示登录窗口
        loginWindow.show();
      });
  });
}

/**
 * 处理登录成功
 */
function handleLoginSuccess(): void {
  // 关闭登录窗口
  windowManager.closeWindow("login");
  // 打开主窗口
  createMainWindow();
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", (event) => {
    event.reply("pong", { message: "copy that.", time: new Date().getTime() });
    console.log("pong");
  });

  ipcMain.handleOnce("get-device-info", async () => {
    const cpu = await si.cpu();
    const os = await si.osInfo();
    const memory = await si.mem();
    const system = await si.system();
    const disks = await si.diskLayout();
    const primaryDisplay = screen.getPrimaryDisplay();
    const screenSize = primaryDisplay.workAreaSize;
    const deviceInfo = {
      // 主板序列号
      serial_number: system.serial,
      // 机器ID
      machine_id: system.uuid,
      // CPU 品牌
      cpu_brand: cpu.brand,
      // CPU 核心数
      cpu_cores: cpu.cores,
      // 主机架构
      os_arch: os.arch,
      // 平台名称
      os_platform: os.platform,
      // 操作系统名称
      os_name: os.distro,
      // 操作系统版本
      os_version: os.release,
      // CPU 供应商
      cpu_vendor: cpu.vendor,
      // 物理内存
      memory_total: formatBytes(memory.total),
      // 磁盘大小
      disk_size: formatBytes(disks.reduce((acc, curr) => acc + curr.size, 0)),
      // 系统语言
      sys_lang: app.getLocale(),
      // 屏幕分辨率
      screen_resolution: `${screenSize.width}x${screenSize.height}`,
      // 屏幕色彩深度
      screen_color_depth: primaryDisplay.colorDepth,
      // 系统主题
      system_theme: nativeTheme.shouldUseDarkColors ? "dark" : "light"
    };
    return deviceInfo;
  });

  // 监听登录成功事件
  ipcMain.on("login-success", () => {
    handleLoginSuccess();
  });

  // 监听系统主题变化
  nativeTheme.on("updated", () => {
    // 告知渲染进程主题发生了变化
    windowManager.sendToAllWindows(
      "theme-updated",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  });

  // 启动时先创建登录窗口
  createLoginWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      // 检查是否有主窗口，如果没有则创建登录窗口
      if (
        !windowManager.hasWindow("main") &&
        !windowManager.hasWindow("login")
      ) {
        createLoginWindow();
      }
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
