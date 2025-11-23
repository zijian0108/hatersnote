import type {ElectronAPI} from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getDeviceInfo: () => Promise<{
        serial_number: string
        machineId: string
        cpu_brand: string
        cpu_cores: number
        os_arch: string
        os_platform: string
        os_name: string
        os_version: string
        cpu_vendor: string
        memory_total: string
        disk_size: string
      }>
    }
  }
}
