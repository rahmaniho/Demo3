import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, WORK, type Work } from "@/lib/content";
import { fa } from "@/lib/fa";
import { cn } from "@/utils/cn";

function pillCount(value: number) {
  return fa(String(value).padStart(2, "0"));
}

export function ArchivePage() {
  const [filter, setFilter] = useState<string>("همه");
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const shown = useMemo(() => (filter === "همه" ? WORK : WORK.filter((w) => w.category === filter)), [filter]);
  const isAll = filter === "همه";

  const rows = useMemo(() => {
    if (!isAll) return null;
    const order: string[] = [];
    const groups: Record<string, Work[]> = {};
    WORK.forEach((work) => {
      if (!groups[work.row]) {
        groups[work.row] = [];
        order.push(work.row);
      }
      groups[work.row].push(work);
    });
    return order.map((key) => groups[key]);
  }, [isAll]);

  const current = active !== null ? shown[active] : null;

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((index) => (index === null ? null : (index + 1) % shown.length));
      if (event.key === "ArrowRight") setActive((index) => (index === null ? null : (index - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, shown.length]);

  useEffect(() => {
    setActive(null);
  }, [filter]);

  return (
    <div className="relative min-h-screen">
      <main className="px-6 pb-32 pt-32 md:px-12 md:pb-40 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <header className="mb-14 grid grid-cols-1 gap-10 md:mb-24 lg:grid-cols-12 lg:gap-16">
            <div className="hidden lg:col-span-1 lg:block">
              <span className="mini block [writing-mode:vertical-rl]">
                آرشیو — ۱۴۰۳ / ۱۴۰۵
              </span>
            </div>
            <div className="lg:col-span-7">
              <a
                href="#/"
                className="rise mb-7 inline-flex items-center gap-2 text-[11px] font-medium text-[var(--soft)] transition-opacity hover:opacity-60"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                بازگشت به خانه
              </a>
              <h1 className="display text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[6.5rem]">
                <em className="accent text-[1.06em]">آرشیو</em>
                <span className="text-[var(--ghost)]">.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[14.5px] leading-8 text-[var(--soft)] md:text-[16.5px] md:leading-9">
                هر جلسه‌ای که نگاه داشته‌ایم — <em className="font-serif text-[1.08em] text-[var(--ink)]">تحریریه</em>، کار برند، زوج‌ها و
                قاب‌های شخصی. روی هر پرتره بزنید تا قاب کامل را ببینید.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pt-4">
              <div className="grid grid-cols-3 gap-6 border-t border-[var(--hair)] pt-6">
                {[
                  { k: "۱۸۶", l: "قاب" },
                  { k: "۱۲", l: "مجموعه" },
                  { k: "۰۳", l: "سال" },
                ].map((stat) => (
                  <div key={stat.l}>
                    <div className="text-[24px] font-extrabold leading-none tracking-tight md:text-[30px]">{stat.k}</div>
                    <div className="mini mt-1.5">{stat.l}</div>
                  </div>
                ))}
              </div>
              <p className="mini mt-8">استودیو · تهران، ایران</p>
              <p className="mini mt-2">فرمت · بیشتر فیلم ۶×۷</p>
            </div>
          </header>

          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-[var(--hair)] pb-5 md:mb-14">
            <span className="mini ml-2">پالایه —</span>
            {CATEGORIES.map((category) => {
              const selected = filter === category;
              const count = category === "همه" ? WORK.length : WORK.filter((w) => w.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11.5px] font-medium transition-all duration-300",
                    selected
                      ? "border border-transparent"
                      : "border border-[var(--hair)] text-[var(--soft)] hover:border-[var(--ghost)] hover:text-[var(--ink)]",
                  )}
                  style={selected ? { backgroundColor: "var(--solid)", color: "var(--solid-ink)" } : undefined}
                >
                  {category}
                  <span className={cn("text-[10px]", selected ? "opacity-60" : "opacity-40")}>{pillCount(count)}</span>
                </button>
              );
            })}
          </div>

          {shown.length === 0 ? (
            <div className="py-32 text-center text-[var(--soft)]">هنوز قابی در این دسته نیست.</div>
          ) : isAll && rows ? (
            <div className="space-y-5 md:space-y-6" onMouseLeave={() => setHovered(null)}>
              {rows.map((group, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
                  {group.map((work) => {
                    const index = shown.findIndex((w) => w.id === work.id);
                    return (
                      <WorkFigure
                        key={work.id}
                        work={work}
                        index={index}
                        span={work.span}
                        dim={hovered !== null && hovered !== work.id}
                        onHover={() => setHovered(work.id)}
                        onOpen={() => setActive(index)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-12 md:gap-6" onMouseLeave={() => setHovered(null)}>
              {shown.map((work, index) => (
                <WorkFigure
                  key={work.id}
                  work={work}
                  index={index}
                  span="md:col-span-4"
                  dim={hovered !== null && hovered !== work.id}
                  onHover={() => setHovered(work.id)}
                  onOpen={() => setActive(index)}
                />
              ))}
            </div>
          )}

          <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-[var(--hair)] pt-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] text-[var(--faint)]">پایان آرشیو — فعلاً</p>
              <p className="mt-2 text-[22px] font-bold leading-snug md:text-[28px]">بیشتر جلسه‌ها روی حلقه‌هایی‌اند که هنوز خشک می‌شوند.</p>
              <p className="mt-1 text-[13px] text-[var(--soft)]">ماه آینده دوباره سر بزنید.</p>
            </div>
            <a href="#/?to=pricing" className="btn-solid group h-12 px-7 text-[12.5px]">
              رزرو جلسه
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </a>
          </div>
        </div>
      </main>

      {current && active !== null && (
        <div
          className="fade-in fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — ${current.meta}`}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black md:left-6 md:top-6"
            onClick={() => setActive(null)}
            aria-label="بستن"
            autoFocus
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black md:right-8"
            onClick={(event) => {
              event.stopPropagation();
              setActive((index) => (index === null ? null : (index - 1 + shown.length) % shown.length));
            }}
            aria-label="قاب پیشین"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black md:left-8"
            onClick={(event) => {
              event.stopPropagation();
              setActive((index) => (index === null ? null : (index + 1) % shown.length));
            }}
            aria-label="قاب بعدی"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="zoom-in flex max-h-full w-full max-w-5xl flex-col gap-4 md:flex-row md:items-center md:gap-8" onClick={(event) => event.stopPropagation()}>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <img
                src={current.src}
                alt={`${current.title} — ${current.meta}`}
                className="max-h-[68vh] w-auto max-w-full rounded-md object-contain md:max-h-[80vh]"
              />
            </div>
            <div className="w-full shrink-0 text-white md:w-60">
              <p className="text-[10px] text-white/45">
                شمارهٔ {current.num} · {current.year}
              </p>
              <h2 className="mt-2 text-[26px] font-bold leading-tight">
                {current.title} <span className="text-[15px] font-normal text-white/50">— {current.accent}</span>
              </h2>
              <p className="mt-2 text-[12.5px] leading-6 text-white/60">{current.meta}</p>
              <p className="mt-4 inline-flex rounded-full border border-white/20 px-2.5 py-1 text-[10px] text-white/70">{current.category}</p>
              <p className="mt-6 text-[10px] text-white/35">
                {fa(active + 1)} / {fa(shown.length)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkFigure({
  work,
  index,
  span,
  dim,
  onHover,
  onOpen,
}: {
  work: Work;
  index: number;
  span: string;
  dim: boolean;
  onHover: () => void;
  onOpen: () => void;
}) {
  return (
    <figure
      className={cn(
        "group relative transition-all duration-700 ease-out",
        span,
        dim ? "scale-[0.985] opacity-40" : "scale-100 opacity-100",
      )}
      onMouseEnter={onHover}
    >
      <button type="button" onClick={onOpen} className="block w-full cursor-pointer text-right" aria-label={`نمایش قاب کامل ${work.title}`}>
        <div className="mb-2 flex items-center justify-between">
          <span className="mini">شمارهٔ {work.num}</span>
          <span className="mini">{work.year}</span>
        </div>
        <div className={cn("media relative w-full overflow-hidden rounded-md", work.aspect)}>
          <img
            src={work.src}
            alt={`${work.title} — ${work.meta}`}
            loading={index < 3 ? "eager" : "lazy"}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpLeft className="h-4 w-4" />
          </span>
        </div>
        <figcaption className="mt-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[15px] font-semibold leading-snug">
              {work.title} <span className="text-[12px] font-normal text-[var(--faint)]">— {work.accent}</span>
            </p>
            <p className="mt-1 text-[11.5px] leading-6 text-[var(--soft)]">{work.meta}</p>
          </div>
          <span className="mt-1 shrink-0 rounded-full border border-[var(--hair)] px-2 py-0.5 text-[9.5px] text-[var(--faint)]">
            {work.category}
          </span>
        </figcaption>
      </button>
    </figure>
  );
}
