import { api } from "@renderer/app/request";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

type LoginTab = "password" | "qrcode";

interface QrCodeStatus {
  qrToken: string;
  status: "waiting" | "scanned" | "confirmed" | "expired";
}

export const PageLogin = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<LoginTab>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // 扫码登录相关状态
  const [qrCodeStatus, setQrCodeStatus] = useState<QrCodeStatus | null>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 生成二维码
  const generateQrCode = async () => {
    try {
      // 调用 API 获取二维码 token
      const response = await api.post<{ qrToken: string; qrCode: string }>(
        "/auth/qrcode/generate"
      );
      setQrCodeStatus({
        qrToken: response.data.qrToken,
        status: "waiting"
      });

      // 开始轮询检查扫码状态
      startPolling(response.data.qrToken);
    } catch (err: unknown) {
      console.error("生成二维码失败:", err);
      // 如果 API 调用失败，使用模拟数据（仅开发环境）
      const isDev =
        import.meta.env.DEV || process.env.NODE_ENV === "development";
      if (isDev) {
        const mockToken = `mock-token-${Date.now()}`;
        setQrCodeStatus({
          qrToken: mockToken,
          status: "waiting"
        });
        startPolling(mockToken);
      }
    }
  };

  // 轮询检查扫码状态
  const startPolling = (token: string) => {
    // 清除之前的轮询
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
    }

    let pollCount = 0;
    const maxPolls = 120; // 最多轮询 2 分钟（每 1 秒一次）

    pollTimerRef.current = setInterval(async () => {
      pollCount++;

      if (pollCount > maxPolls) {
        // 超时，二维码过期
        setQrCodeStatus((prev) =>
          prev ? { ...prev, status: "expired" } : null
        );
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
        }
        return;
      }

      try {
        // 调用 API 检查扫码状态
        const response = await api.get<{ status: string; token?: string }>(
          `/auth/qrcode/check?token=${token}`
        );

        if (response.data.status === "scanned") {
          setQrCodeStatus((prev) =>
            prev ? { ...prev, status: "scanned" } : null
          );
        } else if (
          response.data.status === "confirmed" &&
          response.data.token
        ) {
          // 扫码成功，保存 token 并登录
          localStorage.setItem("authorization", response.data.token);
          handleLoginSuccess();
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
        }
      } catch {
        // API 调用失败时的处理
        // 在开发环境模拟扫码流程（用于测试）
        const isDev =
          import.meta.env.DEV || process.env.NODE_ENV === "development";
        if (isDev) {
          if (pollCount === 5) {
            // 模拟 5 秒后扫码
            setQrCodeStatus((prev) =>
              prev ? { ...prev, status: "scanned" } : null
            );
          } else if (pollCount === 8) {
            // 模拟 8 秒后确认
            const mockToken = `mock-auth-token-${Date.now()}`;
            localStorage.setItem("authorization", mockToken);
            handleLoginSuccess();
            if (pollTimerRef.current) {
              clearInterval(pollTimerRef.current);
              pollTimerRef.current = null;
            }
          }
        }
        // 生产环境：API 调用失败时不处理，继续轮询
      }
    }, 1000);
  };

  // 账号密码登录
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 调用登录 API
      const response = await api.post<{ token: string }>("/auth/login", {
        json: {
          email,
          password
        }
      });

      // 保存登录凭证
      localStorage.setItem("authorization", response.data.token);

      // 如果选择了记住我，可以保存其他信息（可选）
      if (remember) {
        localStorage.setItem("rememberMe", "true");
      }

      // 登录成功
      handleLoginSuccess();
    } catch (err: unknown) {
      console.error("登录失败:", err);
    } finally {
      setLoading(false);
    }
  };

  // 登录成功处理
  const handleLoginSuccess = () => {
    // 通知主进程登录成功
    if (window.api?.onLoginSuccess) {
      window.api.onLoginSuccess();
    }
  };

  // 切换标签页时重新生成二维码
  useEffect(() => {
    if (activeTab === "qrcode" && !qrCodeStatus) {
      generateQrCode();
    }
  }, [activeTab]);

  // 组件卸载时清除轮询
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, []);

  // 刷新二维码
  const handleRefreshQrCode = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    setQrCodeStatus(null);
    generateQrCode();
  };

  return (
    <div className={styles["page-login"]}>
      <div className={styles["login-container"]}>
        <div className={styles["login-header"]}>
          <div className={styles["badge"]}>
            <span className={styles["badge-product"]}>
              {t("page.login.badgeProduct")}
            </span>
            <span className={styles["badge-build"]}>
              {t("page.login.badgeBuild")}
            </span>
          </div>
        </div>

        <div className={styles["login-card"]}>
          <div className={styles["tabs"]}>
            <button
              className={`${styles["tab"]} ${activeTab === "password" ? styles["tab-active"] : ""}`}
              onClick={() => setActiveTab("password")}
            >
              {t("page.login.tabPassword")}
            </button>
            <button
              className={`${styles["tab"]} ${activeTab === "qrcode" ? styles["tab-active"] : ""}`}
              onClick={() => setActiveTab("qrcode")}
            >
              {t("page.login.tabQrcode")}
            </button>
          </div>

          <div className={styles["tab-content"]}>
            {activeTab === "password" ? (
              <form
                className={styles["login-form"]}
                onSubmit={handlePasswordLogin}
              >
                <div className={styles["form-group"]}>
                  <label htmlFor="email">
                    {t("page.login.formEmailLabel")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("page.login.formEmailPlaceholder")}
                    required
                    disabled={loading}
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label htmlFor="password">
                    {t("page.login.formPasswordLabel")}
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("page.login.formPasswordPlaceholder")}
                    required
                    disabled={loading}
                  />
                </div>

                <div className={styles["form-options"]}>
                  <label className={styles["checkbox"]}>
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      disabled={loading}
                    />
                    <span>{t("page.login.formRemember")}</span>
                  </label>
                  <a href="#" className={styles["forgot-link"]}>
                    {t("page.login.formForgot")}
                  </a>
                </div>

                <button
                  type="submit"
                  className={styles["submit-button"]}
                  disabled={loading || !email || !password}
                >
                  {loading
                    ? t("page.login.formSubmitting")
                    : t("page.login.formSubmit")}
                </button>
              </form>
            ) : (
              <div className={styles["qrcode-container"]}>
                {!qrCodeStatus ? (
                  // 初次加载或正在重新获取二维码时，先用骨架占位，避免布局抖动
                  <div className={styles["qrcode-wrapper"]}>
                    <div className={styles["qrcode"]}>
                      <div className={styles["qrcode-placeholder"]} />
                    </div>
                  </div>
                ) : qrCodeStatus.status !== "expired" ? (
                  <div className={styles["qrcode-wrapper"]}>
                    <div className={styles["qrcode"]}>
                      <QRCodeSVG
                        value={qrCodeStatus.qrToken}
                        size={200}
                        level="H"
                        includeMargin={false}
                      />
                      {qrCodeStatus.status === "scanned" && (
                        <div className={styles["qrcode-overlay"]}>
                          <div className={styles["qrcode-status"]}>
                            {t("page.login.qrcodeScanned")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles["qrcode-wrapper"]}>
                    <div className={styles["qrcode"]}>
                      <div className={styles["qrcode-overlay"]}>
                        <div className={styles["qrcode-status"]}>
                          <p>{t("page.login.qrcodeExpired")}</p>
                          <button
                            className={styles["refresh-button"]}
                            onClick={handleRefreshQrCode}
                          >
                            {t("page.login.qrcodeRefresh")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
