import {join} from 'node:path'
import {electronApp, is, optimizer} from '@electron-toolkit/utils'
import {BrowserWindow, app, ipcMain, shell} from 'electron'
import icon from '../../resources/icon.png?asset'
import si from 'systeminformation'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {icon} : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  // mainWindow.title = 'Electron-Rsbuild app'
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })

  // HMR for renderer base on electron-rsbuild cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', (event) => {
    event.reply('pong', {message: 'copy that.', time: new Date().getTime()})
    console.log('pong')
  })

  ipcMain.handle('get-device-info', async () => {
    const cpu = await si.cpu()
    const os = await si.osInfo()
    const memory = await si.mem()
    const system = await si.system()
    const disks = await si.diskLayout()
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
      disk_size: formatBytes(disks.reduce((acc, curr) => acc + curr.size, 0))
    }
    return deviceInfo
  })

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
