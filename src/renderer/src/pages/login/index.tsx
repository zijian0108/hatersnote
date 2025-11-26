import { useApp } from "@renderer/context/app";
import { gsap } from "gsap";
import type { MouseEvent as ReactMouseEvent } from "react";
import { FormEvent, useLayoutEffect, useRef } from "react";
import styles from "./index.module.scss";

const HEADLINE = ["更专注的", "笔记与写作空间"];
const HIGHLIGHTS = [
  "AI 摘要与思路延展",
  "端侧加密 · 数据自我掌控",
  "多端协作 · 毫秒级同步"
];
const FLUID_BLOBS = [
  { variant: "fluidBlobPrimary", label: "primary" },
  { variant: "fluidBlobSecondary", label: "secondary" },
  { variant: "fluidBlobTertiary", label: "tertiary" },
  { variant: "fluidBlobQuaternary", label: "quaternary" }
];

export const PageLogin = () => {
  const { isDarkMode, setIsDarkMode } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const highlightRefs = useRef<HTMLLIElement[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fluidRefs = useRef<HTMLDivElement[]>([]);

  const assignInputRef = (element: HTMLInputElement | null, index: number) => {
    if (element) {
      inputRefs.current[index] = element;
    }
  };

  const assignHighlightRef = (element: HTMLLIElement | null, index: number) => {
    if (element) {
      highlightRefs.current[index] = element;
    }
  };

  const assignFluidRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      fluidRefs.current[index] = element;
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headlineSelector = `.${styles.heroHeadline} span`;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 }
      });

      tl.from(badgeRef.current, { y: 16, opacity: 0 })
        .from(
          headlineSelector,
          { yPercent: 120, opacity: 0, stagger: 0.08, duration: 0.9 },
          "-=0.5"
        )
        .from(copyRef.current, { y: 14, opacity: 0 }, "-=0.5")
        .from(
          highlightRefs.current,
          { y: 18, opacity: 0, stagger: 0.1 },
          "-=0.4"
        )
        .from(cardRef.current, { y: 40, opacity: 0 }, "-=0.6")
        .from(inputRefs.current, { y: 20, opacity: 0, stagger: 0.12 }, "-=0.5")
        .from(buttonRef.current, { y: 20, opacity: 0 }, "-=0.4");
      gsap.fromTo(
        fluidRefs.current,
        { opacity: 0, scale: 0.9, yPercent: 10 },
        {
          opacity: 0.85,
          scale: 1,
          yPercent: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.2
        }
      );

      gsap.to(fluidRefs.current, {
        xPercent: (index) => (index % 2 === 0 ? 8 : -6),
        yPercent: (index) => (index % 2 === 0 ? -6 : 10),
        rotate: (index) => (index % 2 === 0 ? 8 : -12),
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.4, from: "center" }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    gsap.fromTo(
      cardRef.current,
      { scale: 1 },
      {
        scale: 1.015,
        duration: 0.35,
        ease: "power1.out",
        yoyo: true,
        repeat: 1
      }
    );
  };

  const supportsViewTransition =
    typeof document !== "undefined" && "startViewTransition" in document;

  const handleThemeToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const toggleTheme = () => setIsDarkMode?.(!isDarkMode);

    if (!supportsViewTransition) {
      toggleTheme();
      return;
    }

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => ViewTransition;
    };

    if (!doc.startViewTransition) {
      toggleTheme();
      return;
    }

    const { clientX, clientY } = event.nativeEvent;
    const clickX = clientX ?? window.innerWidth / 2;
    const clickY = clientY ?? window.innerHeight / 2;

    const maxRadius = Math.max(
      Math.hypot(clickX, clickY),
      Math.hypot(window.innerWidth - clickX, clickY),
      Math.hypot(clickX, window.innerHeight - clickY),
      Math.hypot(window.innerWidth - clickX, window.innerHeight - clickY)
    );

    const transition = doc.startViewTransition(() => {
      toggleTheme();
    });

    transition.ready
      .then(() => {
        const expand = [
          `circle(0px at ${clickX}px ${clickY}px)`,
          `circle(${maxRadius}px at ${clickX}px ${clickY}px)`
        ];
        const contract = [...expand].reverse();
        const animationOptions: KeyframeAnimationOptions = {
          duration: 700,
          easing: "ease-out"
        };

        document.documentElement.animate(
          { clipPath: expand },
          {
            ...animationOptions,
            pseudoElement: "::view-transition-new(login-theme)"
          }
        );
        document.documentElement.animate(
          { clipPath: contract },
          {
            ...animationOptions,
            pseudoElement: "::view-transition-old(login-theme)"
          }
        );
      })
      .catch(() => toggleTheme());
  };

  return (
    <div
      className={styles.loginPage}
      ref={containerRef}
      data-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="windowDragRegion" />
      <div className={styles.fluidCanvas}>
        {FLUID_BLOBS.map((blob, index) => (
          <div
            key={blob.label}
            className={`${styles.fluidBlob} ${styles[blob.variant]}`}
            ref={(element) => assignFluidRef(element, index)}
          >
            <span />
          </div>
        ))}
        <div className={styles.noiseLayer} />
      </div>

      <div className={styles.loginGrid}>
        <section className={styles.hero}>
          <div className={styles.heroBadge} ref={badgeRef}>
            <span>HatersNote · Nova</span>
            <span>Alpha build</span>
          </div>

          <h1 className={styles.heroHeadline}>
            {HEADLINE.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p className={styles.heroCopy} ref={copyRef}>
            我们重新思考了笔记工具应该长什么样：在私密性、专注度与速度之间找到新的平衡，让灵感与行动始终保持同频。
          </p>

          <ul className={styles.heroHighlights}>
            {HIGHLIGHTS.map((item, index) => (
              <li
                key={item}
                className={styles.heroHighlightItem}
                ref={(element) => assignHighlightRef(element, index)}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryCta}>
              浏览路线图
            </button>
            <button type="button" className={styles.secondaryCta} onClick={handleThemeToggle}>
              切换主题
            </button>
          </div>
        </section>

        <section className={styles.loginCard} ref={cardRef}>
          <div className={styles.loginCardHeader}>
            <h2>登录账户</h2>
            <p>使用受信任设备即可免验证登录</p>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label className={styles.loginFormField}>
              <span>邮箱</span>
              <input
                type="email"
                placeholder="you@hatersnote.app"
                ref={(element) => assignInputRef(element, 0)}
                required
              />
            </label>

            <label className={styles.loginFormField}>
              <span>密码</span>
              <input
                type="password"
                placeholder="••••••••"
                ref={(element) => assignInputRef(element, 1)}
                required
              />
            </label>

            <div className={styles.loginFormExtras}>
              <label>
                <input type="checkbox" defaultChecked />
                <span>保持登录状态</span>
              </label>
              <button type="button" className={styles.textButton}>
                忘记密码？
              </button>
            </div>

            <button
              type="submit"
              className={styles.loginFormButton}
              ref={buttonRef}
            >
              进入工作台
            </button>
          </form>

          <div className={styles.loginDivider}>
            <span />
            <p>或</p>
            <span />
          </div>

          <div className={styles.loginShortcuts}>
            <button type="button">使用 Apple 登录</button>
            <button type="button">使用 Google 登录</button>
          </div>

          <footer className={styles.loginCardFooter}>
            <p>首次体验？</p>
            <button type="button" className={styles.textButton}>
              申请 Beta 资格
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
};
