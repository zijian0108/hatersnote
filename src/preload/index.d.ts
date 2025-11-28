import type { ElectronAPI } from '@electron-toolkit/preload'

declare type DeviceInfo = {
  /**
   * 主板序列号
   */
  serial_number: string
  /**
   * 机器ID
   */
  machineId: string
  /**
   * CPU 品牌
   */
  cpu_brand: string
  /**
   * CPU 核心数
   */
  cpu_cores: number
  /**
   * 主机架构
   */
  os_arch: string
  /**
   * 平台名称
   */
  os_platform: string
  /**
   * 操作系统名称
   */
  os_name: string
  /**
   * 操作系统版本
   */
  os_version: string
  /**
   * CPU 供应商
   */
  cpu_vendor: string
  /**
   * 物理内存
   */
  memory_total: string
  /**
   * 磁盘大小
   */
  disk_size: string
  /**
   * 系统语言
   */
  sys_lang: string
  /**
   * 屏幕分辨率
   */
  screen_resolution: string
  /**
   * 屏幕色彩深度
   */
  screen_color_depth: number
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getDeviceInfo: () => Promise<DeviceInfo>
    }
  }
}
