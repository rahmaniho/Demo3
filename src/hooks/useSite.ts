import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

/** پوستهٔ سایت: خواندن از کلاس ریشه، ذخیره در حافظهٔ محلی و به‌روزرسانی رنگ نوار مرورگر */
export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return true;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    root.style.colorScheme = dark ? "dark" : "light";
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", dark ? "#0a0a0a" : "#f2f2f2");
    try {
      localStorage.setItem("karen-theme", dark ? "dark" : "light");
    } catch {
      /* بی‌اهمیت */
    }
  }, [dark]);

  const toggle = useCallback(() => setDark((v) => !v), []);
  return { dark, toggle, theme: (dark ? "dark" : "light") as Theme };
}

type RouteInfo = { route: "home" | "archive"; hash: string; target: string | null };

function parseHash(hash: string): RouteInfo {
  const route: RouteInfo["route"] = hash.startsWith("#/portfolio") ? "archive" : "home";
  const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
  const params = new URLSearchParams(query);
  const to = params.get("to");
  const plain = hash.replace(/^#\/?\??/, "");
  const rootHome = hash === "#/" || hash === "#" || hash === "";
  const target = route === "home" ? to || (hash && !hash.startsWith("#/") ? plain : rootHome ? "top" : null) : null;
  return { route, hash, target };
}

/** مسیریابی سبک بر پایهٔ هش: صفحهٔ خانه و آرشیو */
export function useRoute() {
  const [info, setInfo] = useState<RouteInfo>(() =>
    parseHash(typeof window === "undefined" ? "" : window.location.hash),
  );

  useEffect(() => {
    const onChange = () => setInfo(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    if (info.route === "archive") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    if (!info.target) return;
    if (info.target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const id = info.target;
    const handle = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(handle);
  }, [info]);

  return info;
}

/** افزودن کلاس نمایان‌شدن به عناصر دارای کلاس reveal */
export function useReveal(key: unknown) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
}
