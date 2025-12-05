import z from "zod";

export const createStorage = <T extends z.ZodTypeAny>(
  key: string,
  schema: T,
  defaultValue?: z.infer<T>
) => ({
  /**
   * 获取值
   * 会自动处理 JSON.parse 和 Zod 校验
   * 如果校验失败（数据结构变了），会返回默认值或 null
   */
  get: (): z.infer<T> | null => {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue ?? null;

    try {
      // 1. 尝试解析 JSON
      const parsed = JSON.parse(item);

      // 2. 使用 Zod 进行校验
      const result = schema.safeParse(parsed);

      if (result.success) {
        return result.data;
      } else {
        console.warn(
          `LocalStorage key "${key}" 数据格式校验失败，已重置。`,
          result.error
        );
        // 校验失败，说明本地存的是旧格式的脏数据，建议清理或返回默认值
        localStorage.removeItem(key);
        return defaultValue ?? null;
      }
    } catch (e) {
      console.error(`LocalStorage key "${key}" JSON 解析失败`, e);
      return defaultValue ?? null;
    }
  },

  /**
   * 设置值
   * 会自动进行 Zod 校验（确保写入的数据是合法的）和 JSON.stringify
   */
  set: (value: z.infer<T>) => {
    // 可选：在写入前也做一次校验，确保代码逻辑没问题
    const result = schema.safeParse(value);
    if (!result.success) {
      console.error(
        `尝试写入 LocalStorage key "${key}" 的数据格式错误`,
        result.error
      );
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 移除值
   */
  remove: () => {
    localStorage.removeItem(key);
  }
});
