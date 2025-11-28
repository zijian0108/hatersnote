import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type DeviceInfo = Awaited<ReturnType<Window['api']['getDeviceInfo']>>

export interface AppState {
  deviceInfo: DeviceInfo
}

const initialState: AppState = {
  deviceInfo: {
    serial_number: "",
    machineId: "",
    cpu_brand: "",
    cpu_cores: 0,
    os_arch: "",
    os_platform: "",
    os_name: "",
    os_version: "",
    cpu_vendor: "",
    memory_total: "",
    disk_size: "",
    sys_lang: "",
    screen_resolution: "",
    screen_color_depth: 0
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateDeviceInfo: (state, action: PayloadAction<DeviceInfo>) => {
      state.deviceInfo = action.payload
    }
  }
})

export const { updateDeviceInfo } = appSlice.actions
export default appSlice.reducer
