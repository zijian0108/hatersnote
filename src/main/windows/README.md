# 窗口管理器使用指南

## 概述

`WindowManager` 是一个单例模式的窗口管理器，用于统一管理 Electron 应用中的所有窗口。

## 基本用法

### 1. 获取窗口管理器实例

```typescript
import { WindowManager } from "./manager";

const windowManager = WindowManager.getInstance();
```

### 2. 创建窗口

#### 使用预设配置创建窗口

```typescript
// 使用 login 配置创建登录窗口
const loginWindow = windowManager.createWindow({
  id: "login",
  useConfig: "login"
});

// 使用 main 配置创建主窗口
const mainWindow = windowManager.createWindow({
  id: "main",
  useConfig: "main"
});
```

#### 自定义配置创建窗口

```typescript
const customWindow = windowManager.createWindow({
  id: "custom",
  width: 800,
  height: 600,
  resizable: true,
  center: true,
  show: true
});
```

#### 完整配置示例

```typescript
const window = windowManager.createWindow({
  id: "settings",
  useConfig: "main", // 使用预设配置作为基础
  width: 1000, // 覆盖预设配置
  height: 700,
  loadPath: "settings", // 自定义加载路径
  center: true, // 居中显示
  show: true, // 立即显示
  onClose: () => {
    console.log("设置窗口已关闭");
  }
});
```

### 3. 获取窗口

```typescript
// 获取指定窗口
const window = windowManager.getWindow("main");
if (window) {
  window.setTitle("新标题");
}

// 获取所有窗口
const allWindows = windowManager.getAllWindows();
console.log(`当前有 ${allWindows.length} 个窗口`);
```

### 4. 窗口操作

```typescript
// 聚焦窗口
windowManager.focusWindow("main");

// 检查窗口是否存在
if (windowManager.hasWindow("login")) {
  console.log("登录窗口已打开");
}

// 关闭窗口
windowManager.closeWindow("login");

// 强制关闭窗口（不触发 close 事件）
windowManager.closeWindow("login", true);

// 关闭所有窗口
windowManager.closeAllWindows();
```

## 在 index.ts 中使用示例

```typescript
import { WindowManager } from "./windows/manager";

app.whenReady().then(() => {
  // ... 其他初始化代码

  // 创建主窗口
  const windowManager = WindowManager.getInstance();
  windowManager.createWindow({
    id: "main",
    useConfig: "main"
  });

  // macOS 激活事件
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      windowManager.createWindow({
        id: "main",
        useConfig: "main"
      });
    }
  });
});
```

## 登录流程

应用启动时会自动检查登录状态：

1. **启动时**：创建登录窗口（初始隐藏）
2. **检查登录状态**：登录窗口加载完成后，检查 `localStorage` 中是否有 `authorization` 凭证
3. **有凭证**：自动关闭登录窗口，打开主窗口
4. **无凭证**：显示登录窗口供用户登录
5. **登录成功**：在登录页面调用 `window.api.onLoginSuccess()`，主进程会关闭登录窗口并打开主窗口

### 在登录页面中使用

```typescript
// 登录成功后
const handleLoginSuccess = async () => {
  try {
    // 调用登录 API
    const response = await loginApi(username, password);
    
    // 保存登录凭证
    localStorage.setItem("authorization", response.token);
    
    // 通知主进程登录成功
    if (window.api?.onLoginSuccess) {
      window.api.onLoginSuccess();
    }
  } catch (error) {
    console.error("登录失败:", error);
  }
};
```

## 特性

- ✅ 单例模式，全局统一管理
- ✅ 自动防止重复创建相同ID的窗口
- ✅ 自动清理已销毁的窗口
- ✅ 支持预设配置和自定义配置
- ✅ 自动居中显示
- ✅ 自动处理外部链接
- ✅ 支持开发/生产环境自动切换加载方式
- ✅ 完整的 TypeScript 类型支持
- ✅ 自动登录状态检查和窗口切换


