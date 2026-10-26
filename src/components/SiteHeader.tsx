import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, ArrowLeft } from "lucide-react";
import { NAV } from "@/lib/content";
import { cn } from "@/utils/cn";

type Props = {
  dark: boolean;
  onToggleTheme: () => void;
  isArchive: boolean;
};

export function SiteHeader({ dark, onToggleTheme, isArchive }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectionHref = (href: string) => {
    if (!isArchive) return href;
    if (href === "#/portfolio") return href;
    const id = href.replace("#", "");
    return `#/?to=${id}`;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "backdrop-blur-md" : "",
      )}
      style={{
        backgroundColor: scrolled || open ? "color-mix(in oklab, var(--paper) 86%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled || open ? "var(--hair-soft)" : "transparent"}`,
      }}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-8"
        aria-label="ناوبری اصلی"
      >
        <a href="#/" className="group flex items-center gap-2.5" aria-label="کارن استودیو — خانه">
          <span className="font-mono text-[19px] font-bold leading-none tracking-tight text-[var(--ink)]">karen.</span>
          <span className="mt-0.5 hidden text-[10px] font-medium text-[var(--faint)] sm:inline">کارن استودیو</span>
        </a>

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={sectionHref(item.href)}
              className={cn(
                "text-[13px] font-medium transition-opacity hover:opacity-60",
                isArchive && item.href === "#/portfolio"
                  ? "text-[var(--ink)]"
                  : "text-[var(--soft)] hover:text-[var(--ink)]",
              )}
              aria-current={isArchive && item.href === "#/portfolio" ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button type="button" onClick={onToggleTheme} className="icon-btn h-9 w-9" aria-label={dark ? "روشن‌کردن پوسته" : "تاریک‌کردن پوسته"}>
            {dark ? <Sun className="h-[15px] w-[15px]" /> : <Moon className="h-[15px] w-[15px]" />}
          </button>
          <a
            href={isArchive ? "#/?to=pricing" : "#pricing"}
            className="btn-solid hidden h-9 px-5 text-[11.5px] md:inline-flex"
          >
            رزرو جلسه
          </a>
          <button
            type="button"
            className="icon-btn h-9 w-9 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-[var(--hair-soft)] transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="px-6 py-3">
          {NAV.map((item) => (
            <li key={item.label} className="border-b border-[var(--hair-soft)] last:border-0">
              <a
                href={sectionHref(item.href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 text-[15px] font-medium text-[var(--ink)]"
              >
                {item.label}
                <ArrowLeft className="h-4 w-4 text-[var(--faint)]" />
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-6">
          <a
            href={isArchive ? "#/?to=pricing" : "#pricing"}
            onClick={() => setOpen(false)}
            className="btn-solid h-11 w-full text-[13px]"
          >
            رزرو جلسه
          </a>
        </div>
      </div>
    </header>
  );
}
