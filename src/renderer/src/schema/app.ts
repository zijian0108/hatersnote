import z from "zod";

export const ThemeSchema = z.enum(["light", "dark"]).describe("系统主题");

export const DeviceInfoSchema = z.object({
  /**
   * 主板序列号
   */
  serial_number: z.string().describe("主板序列号"),

  /**
   * 机器ID
   */
  machine_id: z.string().describe("机器ID"),

  /**
   * CPU 品牌
   */
  cpu_brand: z.string().describe("CPU 品牌"),

  /**
   * CPU 核心数
   * 通常核心数是整数，所以加了 .int()，如果需要正整数可以加 .positive()
   */
  cpu_cores: z.number().int().describe("CPU 核心数"),

  /**
   * 主机架构
   */
  os_arch: z.string().describe("主机架构"),

  /**
   * 平台名称
   */
  os_platform: z.string().describe("平台名称"),

  /**
   * 操作系统名称
   */
  os_name: z.string().describe("操作系统名称"),

  /**
   * 操作系统版本
   */
  os_version: z.string().describe("操作系统版本"),

  /**
   * CPU 供应商
   */
  cpu_vendor: z.string().describe("CPU 供应商"),

  /**
   * 物理内存
   */
  memory_total: z.string().describe("物理内存"),

  /**
   * 磁盘大小
   */
  disk_size: z.string().describe("磁盘大小"),

  /**
   * 系统语言
   */
  sys_lang: z.string().describe("系统语言"),

  /**
   * 屏幕分辨率
   */
  screen_resolution: z.string().describe("屏幕分辨率"),

  /**
   * 屏幕色彩深度
   */
  screen_color_depth: z.number().int().describe("屏幕色彩深度"),

  /**
   * 系统主题
   */
  system_theme: ThemeSchema
});
