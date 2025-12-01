import ky, { type KyInstance, type Options, HTTPError } from "ky";

// 统一的 API 响应格式
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 自定义错误类
export class ApiError extends Error {
  constructor(
    public code: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// 判断是否为开发环境
const isDev = process.env.NODE_ENV === "development";

// 创建请求实例
const createRequest = (): KyInstance => {
  return ky.create({
    prefixUrl: "/api",
    timeout: 30000, // 30秒超时
    retry: {
      limit: 2, // 重试2次
      methods: ["get", "put", "head", "delete", "options", "trace"],
      statusCodes: [408, 429, 500, 502, 503, 504]
    },
    hooks: {
      beforeRequest: [
        (request) => {
          // 添加认证 token
          const authorization = localStorage.getItem("authorization");
          if (authorization) {
            request.headers.set("Authorization", authorization);
          }

          // 添加 Content-Type
          if (!request.headers.has("Content-Type")) {
            request.headers.set("Content-Type", "application/json");
          }

          // 开发环境打印请求日志
          if (isDev) {
            console.log(
              `[Request] ${request.method} ${request.url}`,
              request.headers.get("Authorization") ? "🔐" : ""
            );
          }
        }
      ],
      beforeError: [
        async (error) => {
          const { response } = error;

          // 网络错误或超时
          if (!response) {
            if (isDev) {
              console.error("[Request Error]", error.message);
            }
            // 创建一个 HTTPError 来保持类型一致性
            const networkError = new HTTPError(
              error.response || new Response(null, { status: 0 }),
              error.request,
              error.options
            );
            // 添加自定义属性
            Object.assign(networkError, {
              apiCode: -1,
              apiMessage: error.message || "网络请求失败，请检查网络连接"
            });
            return networkError;
          }

          // HTTP 错误响应
          try {
            const errorData: ApiResponse = await response.json();
            const httpError = new HTTPError(
              response,
              error.request,
              error.options
            );
            // 添加自定义属性
            Object.assign(httpError, {
              apiCode: errorData.code || response.status,
              apiMessage: errorData.message || response.statusText,
              apiData: errorData.data
            });

            if (isDev) {
              console.error(
                `[API Error] ${response.status} ${response.url}`,
                errorData
              );
            }

            return httpError;
          } catch {
            // 响应不是 JSON 格式
            const httpError = new HTTPError(
              response,
              error.request,
              error.options
            );
            Object.assign(httpError, {
              apiCode: response.status,
              apiMessage: response.statusText || "请求失败"
            });

            if (isDev) {
              console.error(
                `[HTTP Error] ${response.status} ${response.url}`,
                response.statusText
              );
            }

            return httpError;
          }
        }
      ],
      afterResponse: [
        async (request, _options, response) => {
          // 处理 401 未授权
          if (response.status === 401) {
            localStorage.removeItem("authorization");
            // 避免循环重定向
            if (!window.location.pathname.includes("/login")) {
              window.location.href = "/login";
            }
            return response;
          }

          // 处理业务错误码
          if (response.ok) {
            try {
              const result: ApiResponse = await response.json();

              // 开发环境打印响应日志
              if (isDev) {
                console.log(
                  `[Response] ${request.method} ${request.url}`,
                  result.success ? "✅" : "❌",
                  result
                );
              }

              // 业务层错误（code !== 0 或 success === false）
              if (!result.success || result.code !== 0) {
                // 创建一个新的响应，包含错误信息
                const errorResponse = new Response(
                  JSON.stringify({
                    code: result.code || -1,
                    message: result.message || "请求失败",
                    data: result.data
                  }),
                  {
                    status: response.status,
                    statusText: result.message || "请求失败",
                    headers: response.headers
                  }
                );
                const error = new HTTPError(errorResponse, request, _options);
                throw error;
              }
            } catch (error) {
              // 如果已经是 HTTPError，直接抛出
              if (error instanceof HTTPError) {
                throw error;
              }
            }
          }

          return response;
        }
      ]
    }
  });
};

// 导出请求实例
export const request = createRequest();

// 类型安全的请求方法封装
export const api = {
  get: <T = unknown>(
    url: string,
    options?: Options
  ): Promise<ApiResponse<T>> => {
    return request
      .get(url, options)
      .json<ApiResponse<T>>()
      .catch((error) => {
        if (error instanceof HTTPError) {
          const apiError = error as HTTPError & {
            apiCode?: number;
            apiMessage?: string;
            apiData?: unknown;
          };
          throw new ApiError(
            apiError.apiCode || error.response.status,
            apiError.apiMessage || error.message,
            apiError.apiData
          );
        }
        throw error;
      });
  },

  post: <T = unknown>(
    url: string,
    options?: Options
  ): Promise<ApiResponse<T>> => {
    return request
      .post(url, options)
      .json<ApiResponse<T>>()
      .catch((error) => {
        if (error instanceof HTTPError) {
          const apiError = error as HTTPError & {
            apiCode?: number;
            apiMessage?: string;
            apiData?: unknown;
          };
          throw new ApiError(
            apiError.apiCode || error.response.status,
            apiError.apiMessage || error.message,
            apiError.apiData
          );
        }
        throw error;
      });
  },

  put: <T = unknown>(
    url: string,
    options?: Options
  ): Promise<ApiResponse<T>> => {
    return request
      .put(url, options)
      .json<ApiResponse<T>>()
      .catch((error) => {
        if (error instanceof HTTPError) {
          const apiError = error as HTTPError & {
            apiCode?: number;
            apiMessage?: string;
            apiData?: unknown;
          };
          throw new ApiError(
            apiError.apiCode || error.response.status,
            apiError.apiMessage || error.message,
            apiError.apiData
          );
        }
        throw error;
      });
  },

  patch: <T = unknown>(
    url: string,
    options?: Options
  ): Promise<ApiResponse<T>> => {
    return request
      .patch(url, options)
      .json<ApiResponse<T>>()
      .catch((error) => {
        if (error instanceof HTTPError) {
          const apiError = error as HTTPError & {
            apiCode?: number;
            apiMessage?: string;
            apiData?: unknown;
          };
          throw new ApiError(
            apiError.apiCode || error.response.status,
            apiError.apiMessage || error.message,
            apiError.apiData
          );
        }
        throw error;
      });
  },

  delete: <T = unknown>(
    url: string,
    options?: Options
  ): Promise<ApiResponse<T>> => {
    return request
      .delete(url, options)
      .json<ApiResponse<T>>()
      .catch((error) => {
        if (error instanceof HTTPError) {
          const apiError = error as HTTPError & {
            apiCode?: number;
            apiMessage?: string;
            apiData?: unknown;
          };
          throw new ApiError(
            apiError.apiCode || error.response.status,
            apiError.apiMessage || error.message,
            apiError.apiData
          );
        }
        throw error;
      });
  }
};

// 导出原始 request 实例（用于特殊场景）
export default request;
