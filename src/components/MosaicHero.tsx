import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowDown } from "lucide-react";

type Props = { dark: boolean };

const RINGS = 8;
const SEGMENTS = 12;
const CELL_U = 4;
const CELL_V = 3;
const GAP = 340;
const RADIUS = 1180;
const THICKNESS = 250;
const FOCAL = 780;

function cellValue(darkMode: boolean) {
  const r = Math.random();
  if (darkMode) {
    if (r < 0.1) return 0.88 + Math.random() * 0.12;
    if (r < 0.34) return 0.46 + Math.random() * 0.28;
    return 0.07 + Math.random() * 0.26;
  }
  if (r < 0.1) return 0.04 + Math.random() * 0.1;
  if (r < 0.34) return 0.24 + Math.random() * 0.2;
  return 0.62 + Math.random() * 0.29;
}

function buildValues(darkMode: boolean) {
  return Array.from({ length: RINGS }, () =>
    Array.from({ length: SEGMENTS }, () =>
      Array.from({ length: CELL_U * CELL_V }, () => cellValue(darkMode)),
    ),
  );
}

export function MosaicHero({ dark }: Props) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const darkRef = useRef(dark);

  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let target = 0;
    let current = 0;
    let frame = 0;
    let values = buildValues(darkRef.current);
    let drawnForTheme = darkRef.current;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = wrap.clientWidth || window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      target = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      if (contentRef.current) {
        contentRef.current.style.opacity = String(Math.max(0, 1 - target * 1.25));
        contentRef.current.style.transform = `translateY(${-target * 60}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = target > 0.02 ? "0" : "1";
      }
    };

    const project = (angle: number, radius: number, depth: number, cx: number, cy: number) => {
      const scale = FOCAL / (FOCAL + depth);
      return [cx + Math.cos(angle) * radius * scale, cy + Math.sin(angle) * radius * scale];
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      current += (target - current) * 0.075;
      if (drawnForTheme !== darkRef.current) {
        drawnForTheme = darkRef.current;
        values = buildValues(drawnForTheme);
      }

      const t = reduce ? 0 : now / 1000;
      const travel = (current * 2900 + t * 9) % GAP;
      const spin = current * 0.62 + t * 0.018;
      const cx = width / 2 + Math.sin(current * 5.4) * width * 0.045;
      const cy = height * 0.5 + Math.cos(current * 4.2) * height * 0.03;

      ctx.clearRect(0, 0, width, height);

      const ringList = Array.from({ length: RINGS }, (_, i) => ({
        i,
        depth: i * GAP + 44 - travel,
      }))
        .filter((r) => r.depth > 24)
        .sort((a, b) => b.depth - a.depth);

      const segAngle = (Math.PI * 2) / SEGMENTS;
      const cellAngle = segAngle / CELL_U;
      const cellRadial = THICKNESS / CELL_V;

      for (const ring of ringList) {
        const { i, depth } = ring;
        const fog = Math.max(0.05, 1 - depth / (RINGS * GAP + 260));
        const rotation = spin + i * 0.31;
        for (let s = 0; s < SEGMENTS; s++) {
          const base = rotation + s * segAngle;
          const panelSpan = SEGMENTS / 6;
          const panelIndex = s % panelSpan;
          for (let u = 0; u < CELL_U; u++) {
            const seam = 0.03;
            const a0 = base + u * cellAngle + 0.006 + (panelIndex === 0 && u === 0 ? seam : 0);
            const a1 = base + (u + 1) * cellAngle - 0.006 - (panelIndex === panelSpan - 1 && u === CELL_U - 1 ? seam : 0);
            for (let v = 0; v < CELL_V; v++) {
              const r0 = RADIUS - THICKNESS / 2 + v * cellRadial + 5;
              const r1 = RADIUS - THICKNESS / 2 + (v + 1) * cellRadial - 5;
              const p1 = project(a0, r0, depth, cx, cy);
              const p2 = project(a1, r0, depth, cx, cy);
              const p3 = project(a1, r1, depth, cx, cy);
              const p4 = project(a0, r1, depth, cx, cy);

              const minX = Math.min(p1[0], p2[0], p3[0], p4[0]);
              const maxX = Math.max(p1[0], p2[0], p3[0], p4[0]);
              const minY = Math.min(p1[1], p2[1], p3[1], p4[1]);
              const maxY = Math.max(p1[1], p2[1], p3[1], p4[1]);
              if (maxX < -40 || minX > width + 40 || maxY < -40 || minY > height + 40) continue;
              if (maxX - minX < 0.35 && maxY - minY < 0.35) continue;

              const value = values[i][s][u * CELL_V + v];
              const g = Math.round(value * 255);
              const alpha = Math.min(1, fog * 1.06);
              ctx.fillStyle = `rgba(${g},${g},${g},${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1[0], p1[1]);
              ctx.lineTo(p2[0], p2[1]);
              ctx.lineTo(p3[0], p3[1]);
              ctx.lineTo(p4[0], p4[1]);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      }

      frame += 1;
      if (frame % 12 === 0) {
        for (let k = 0; k < 24; k++) {
          const i = Math.floor(Math.random() * RINGS);
          const s = Math.floor(Math.random() * SEGMENTS);
          const c = Math.floor(Math.random() * CELL_U * CELL_V);
          values[i][s][c] = cellValue(drawnForTheme);
        }
      }
    };

    resize();
    readScroll();
    raf = requestAnimationFrame(draw);

    const onScroll = () => readScroll();
    const onResize = () => {
      resize();
      readScroll();
    };
    const onVisibility = () => {
      visible = !document.hidden;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section ref={wrapRef} id="top" className="relative h-[190vh] w-full">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" aria-hidden="true" />

        {/* سایهٔ مرکزی و حاشیه‌ها */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: dark
              ? "radial-gradient(ellipse at center, transparent 28%, rgba(10,10,10,0.62) 100%)"
              : "radial-gradient(ellipse at center, transparent 30%, rgba(226,226,226,0.66) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: dark
              ? "radial-gradient(ellipse 46% 36% at 50% 50%, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 55%, transparent 78%)"
              : "radial-gradient(ellipse 46% 36% at 50% 50%, rgba(242,242,242,0.72) 0%, rgba(242,242,242,0.3) 55%, transparent 78%)",
          }}
        />

        {/* برچسب‌های کناری */}
        <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 hidden justify-between px-8 text-[var(--faint)] md:flex">
          <span className="mini">تهران، ایران</span>
          <span className="mini">فرمت متوسط · از ۱۳۹۷</span>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div ref={contentRef} className="pointer-events-none flex max-w-3xl flex-col items-center text-center">
            <div className="rise pill pill-dot pointer-events-auto" style={{ animationDelay: "0.15s" }}>
              عکاسی پرتره · از سال ۱۳۹۷
            </div>

            <h1 className="display mt-7 text-[2.9rem] leading-[1.08] sm:text-[4.2rem] md:mt-8 md:text-[5.6rem] lg:text-[6.75rem]">
              <span className="rise block" style={{ animationDelay: "0.25s" }}>
                پرتره‌ها،
              </span>
              <span className="rise block" style={{ animationDelay: "0.35s" }}>
                در <em className="accent pr-1 text-[1.12em]">تاریکی</em>.
              </span>
            </h1>

            <p
              className="rise pointer-events-auto mt-6 max-w-md text-[15px] leading-8 text-[var(--soft)] md:mt-7 md:text-[17px] md:leading-9"
              style={{ animationDelay: "0.45s" }}
            >
              عکاسی پرترهٔ تحریریه‌ای که نمی‌پذیرد شبیه <span className="font-semibold text-[var(--ink)]">همهٔ دیگران</span> باشد.
            </p>

            <div
              className="rise pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
              style={{ animationDelay: "0.55s" }}
            >
              <a href="#pricing" className="btn-solid h-12 px-8 text-[13px]">
                رزرو جلسه
              </a>
              <a
                href="#/portfolio"
                className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink)] transition-opacity hover:opacity-60"
              >
                تماشای نمونه‌کارها
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[var(--faint)] transition-opacity duration-500"
        >
          <span className="mini">ادامه</span>
          <span className="scroll-line h-10" />
          <ArrowDown className="h-3 w-3" />
        </div>
      </div>
    </section>
  );
}
