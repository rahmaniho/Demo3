import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Camera,
  Lightbulb,
  UserRound,
  Heart,
  Store,
  Film,
  Check,
  type LucideIcon,
} from "lucide-react";
import { ADDONS, PREVIEW, PROCESS, SESSIONS, STATS, TIERS, price } from "@/lib/content";
import { cn } from "@/utils/cn";

const ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  flash: Lightbulb,
  user: UserRound,
  heart: Heart,
  store: Store,
  film: Film,
};

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("pill pill-dot", className)}>{children}</span>;
}

/* ————————————————— شش شیوه ————————————————— */

export function FeaturesSection() {
  return (
    <section id="features" className="relative w-full px-6 py-32 transition-colors duration-500 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl md:mb-28">
          <Pill className="reveal">چه چیزی ثبت می‌کنیم</Pill>
          <h2 className="display reveal mt-6 text-[2.5rem] sm:text-[3.5rem] md:mt-8 md:text-[5rem] lg:text-[5.75rem]">
            شش شیوه برای
            <br />
            <em className="accent text-[1.06em]">پرتره‌شدن</em>.
          </h2>
          <p className="reveal mt-7 max-w-xl text-[15px] leading-8 text-[var(--soft)] md:text-[17px] md:leading-9">
            هر جلسه در کارن استودیو اختصاصی است — اما بیشتر آن‌ها در یکی از این شش اتاق می‌گنجد. اتاقِ خود را برگزینید، یا برای ما بنویسید
            تا جلسه را پیرامون شما بسازیم.
          </p>
        </div>

        <div className="grid-lines reveal grid grid-cols-1 overflow-hidden rounded-lg md:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((session, i) => {
            const Icon = ICONS[session.icon];
            return (
              <article
                key={session.n}
                className="reveal group relative flex flex-col p-8 transition-colors duration-300 hover:bg-[var(--chip)] md:p-10"
                style={{ backgroundColor: "var(--paper)", transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <div className="mb-10 flex items-center justify-between md:mb-14">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--hair)] transition-colors group-hover:border-[var(--ink)]">
                    <Icon className="h-[19px] w-[19px]" strokeWidth={1.4} />
                  </span>
                  <span className="mini">{session.n}</span>
                </div>
                <h3 className="text-[20px] font-semibold leading-snug md:text-[23px]">{session.title}</h3>
                <p className="mt-3 max-w-sm flex-1 text-[13.5px] leading-7 text-[var(--soft)]">{session.desc}</p>
                <ArrowUpLeft className="mt-7 h-4 w-4 text-[var(--faint)] transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--ink)]" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————————————————— نمونه‌کارها ————————————————— */

export function PortfolioPreview() {
  return (
    <section id="portfolio" className="relative w-full px-6 pb-32 md:px-12 md:pb-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 border-t border-[var(--hair)] pt-14 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Pill className="reveal">از آرشیو</Pill>
            <h2 className="display reveal mt-6 text-[2.5rem] sm:text-[3.5rem] md:mt-8 md:text-[5rem] lg:text-[5.75rem]">
              چهره‌ها، در
              <br />
              <em className="accent text-[1.06em]">نور کم</em>.
            </h2>
          </div>
          <p className="reveal max-w-xs text-[13.5px] leading-7 text-[var(--soft)] md:pb-4">
            پیش‌نمایشی کوچک از آرشیو استودیو — بیشتر روی <span className="text-[var(--ink)]">فیلم فرمت متوسط</span>.
          </p>
        </div>

        <div className="space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {PREVIEW.slice(0, 2).map((work, i) => (
              <WorkTile key={work.id} work={work} className={work.span} delay={i * 80} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {PREVIEW.slice(2, 4).map((work, i) => (
              <WorkTile key={work.id} work={work} className={work.span} delay={i * 80} />
            ))}
          </div>
        </div>

        <div className="reveal mt-10 flex flex-col items-start justify-between gap-6 border-t border-[var(--hair)] pt-6 sm:flex-row sm:items-center">
          <p className="mini">
            آرشیو — ۱۸۶ قاب · ۱۲ مجموعه · سه سال کار پیوسته.
          </p>
          <a href="#/portfolio" className="btn-line group h-11 px-6 text-[12.5px]">
            مشاهدهٔ آرشیو کامل
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

function WorkTile({ work, className, delay }: { work: (typeof PREVIEW)[number]; className?: string; delay?: number }) {
  return (
    <a
      href="#/portfolio"
      className={cn("reveal group relative block overflow-hidden rounded-md", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn("media w-full", work.aspect)}>
        <img
          src={work.src}
          alt={`${work.title} — ${work.meta}`}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white md:p-5">
        <div>
          <p className="text-[10.5px] text-white/60">{work.meta}</p>
          <p className="mt-1 text-[18px] font-semibold leading-tight">
            {work.title} <span className="text-[13px] font-normal text-white/60">— {work.accent}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/50">{work.year}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:bg-white group-hover:text-black">
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ————————————————— نرخ‌نامه ————————————————— */

export function PricingSection() {
  const [term, setTerm] = useState<"half" | "full">("half");

  return (
    <section id="pricing" className="relative w-full border-t border-[var(--hair)] px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 items-end gap-10 md:mb-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Pill className="reveal">۰۳ — نرخ‌نامه · تومان</Pill>
            <h2 className="display reveal mt-6 text-[2.5rem] sm:text-[3.5rem] md:mt-8 md:text-[4.75rem] lg:text-[5.5rem]">
              سه اتاق.
              <br />
              یک <em className="accent text-[1.06em]">نرخ‌نامه</em>.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="reveal max-w-lg text-[14px] leading-8 text-[var(--soft)] md:text-[15.5px]">
              حقوق استودیو شامل نورپردازی، پس‌زمینه‌ها، دو دستیار و پذیرایی است. سفر، بازیگر و مجوز استفاده جداگانه محاسبه می‌شود. نیم‌روز
              برای چهره‌نگاره مناسب‌تر است؛ تمام‌روز همان است که بیشتر سفارش‌های تحریریه در پایان به آن می‌رسند.
            </p>
            <div
              className="reveal mt-7 inline-flex items-center rounded-full border p-1"
              style={{ borderColor: "var(--hair)", backgroundColor: "var(--chip)" }}
              role="group"
              aria-label="مدت جلسه"
            >
              {(
                [
                  { key: "half", label: "نیم‌روز · ۴ ساعت" },
                  { key: "full", label: "تمام‌روز · ۸ ساعت" },
                ] as const
              ).map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setTerm(option.key)}
                  aria-pressed={term === option.key}
                  className="rounded-full px-4 py-2 text-[11.5px] font-medium transition-all duration-300"
                  style={
                    term === option.key
                      ? { backgroundColor: "var(--solid)", color: "var(--solid-ink)" }
                      : { color: "var(--soft)" }
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => {
            const amount = term === "half" ? tier.half : tier.full;
            return (
              <article
                key={tier.name}
                className="reveal card hover-lift group relative flex flex-col overflow-hidden"
                style={{
                  transitionDelay: `${i * 90}ms`,
                  backgroundColor: tier.highlight ? "var(--solid)" : "var(--paper-2)",
                  color: tier.highlight ? "var(--solid-ink)" : "var(--ink)",
                  borderColor: tier.highlight ? "var(--solid)" : "var(--hair)",
                }}
              >
                <div className="relative h-40 w-full overflow-hidden md:h-44">
                  <img src={tier.image} alt={`نمونهٔ پرترهٔ ${tier.name}`} loading="lazy" className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span
                      className="rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm"
                      style={{
                        borderColor: "rgba(255,255,255,0.24)",
                        backgroundColor: "rgba(0,0,0,0.32)",
                        color: "#fff",
                      }}
                    >
                      {tier.tag}
                    </span>
                    {tier.highlight && (
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black">پُرتقاضاترین</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[24px] font-bold leading-none tracking-tight">{tier.name}</h3>
                      <p
                        className="mt-2.5 min-h-[44px] text-[12.5px] leading-6"
                        style={{ color: tier.highlight ? "color-mix(in oklab, var(--solid-ink) 64%, transparent)" : "var(--soft)" }}
                      >
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t pt-5" style={{ borderColor: tier.highlight ? "rgba(125,125,125,0.35)" : "var(--hair)" }}>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[30px] font-bold leading-none tracking-tight md:text-[34px]">{price(amount)}</span>
                      <span className="text-[11px] opacity-55">تومان</span>
                    </div>
                    <span className="text-[10.5px] opacity-50">/ {term === "half" ? "نیم‌روز" : "تمام‌روز"}</span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[12.5px] leading-6">
                        <Check className="mt-1 h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ opacity: 0.65 }} />
                        <span style={{ color: tier.highlight ? "color-mix(in oklab, var(--solid-ink) 84%, transparent)" : "var(--soft)" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-[12px] font-medium transition-transform duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: tier.highlight ? "var(--solid-ink)" : "var(--solid)",
                      color: tier.highlight ? "var(--solid)" : "var(--solid-ink)",
                    }}
                  >
                    {tier.cta}
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* افزودنی‌ها */}
        <div className="mt-20 md:mt-28">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Pill className="reveal">۰۴ — افزودنی‌ها</Pill>
              <h3 className="reveal mt-5 text-[24px] font-bold leading-snug md:text-[32px]">
                به‌صورت موردی، آنجا که بریف می‌طلبد.
              </h3>
            </div>
            <span className="reveal mini">[ روی هر طرح قابل افزودن است ]</span>
          </div>

          <div className="grid-lines reveal grid grid-cols-1 overflow-hidden rounded-lg sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((addon) => (
              <div
                key={addon.code}
                className="group p-6 transition-colors duration-300 hover:bg-[var(--chip)]"
                style={{ backgroundColor: "var(--paper)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[var(--faint)]" dir="ltr">
                    {addon.code}
                  </span>
                  <span className="text-[12px] font-semibold">{addon.price}</span>
                </div>
                <h4 className="mt-9 text-[15px] font-semibold">{addon.name}</h4>
                <p className="mt-1.5 text-[12px] leading-6 text-[var(--faint)]">{addon.desc}</p>
              </div>
            ))}
          </div>
          <p className="mini reveal mt-5 leading-7">
            همهٔ مبالغ به تومان و بدون احتساب مالیات بر ارزش افزوده است. پرداخت از طریق درگاه بانکی امن، کارت‌به‌کارت یا چک امکان‌پذیر است و
            فاکتور رسمی صادر می‌شود. برای قرارداد تولید و پیش‌فاکتور، با استودیو در تماس باشید.
          </p>

          <div className="grid-lines reveal mt-10 grid grid-cols-1 overflow-hidden rounded-lg sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "رزرو", v: "چهار تا شش هفته پیش از جلسه" },
              { k: "روزهای جلسه", v: "شنبه و سه‌شنبه" },
              { k: "سفر و بازیگر", v: "جدا از حقوق استودیو" },
              { k: "سرِ صحنه", v: "حداکثر هشت نفر" },
            ].map((fact) => (
              <div key={fact.k} className="p-5" style={{ backgroundColor: "var(--paper)" }}>
                <div className="mini">{fact.k}</div>
                <div className="mt-1.5 text-[13px] font-medium">{fact.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————— درباره ————————————————— */

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full px-6 py-32 transition-colors duration-500 md:px-12 md:py-44"
      style={{ backgroundColor: "var(--paper-deep)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-1 gap-10 md:mb-28 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Pill className="reveal">درباره</Pill>
            <h2 className="display reveal mt-6 text-[2.5rem] sm:text-[3.5rem] md:mt-8 md:text-[4.5rem] lg:text-[5rem]">
              استودیویی کوچک
              <br />
              برای <em className="accent text-[1.08em]">چهره‌های صادق</em>.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="reveal text-[17px] leading-9 text-[var(--ink)] opacity-80 md:text-[20px] md:leading-10">
              کارن استودیو، کارگاه پرترهٔ کارن کیانی است — عکاسی تحریریه‌ای که از استودیویی رو به شمال در قلب تهران، خیابان ولیعصر، کار
              می‌کند. کار، آهسته، کم‌نور و عمدتاً بر فیلم فرمت متوسط ثبت می‌شود.
            </p>
            <p className="reveal mt-6 text-[14.5px] leading-8 text-[var(--soft)] md:text-[16.5px] md:leading-9">
              ما به تعارف و خوش‌آمدگویی باور نداریم؛ به حقیقت باور داریم. پرتره‌هایی که بیش از همه به آن‌ها می‌بالیم، آن‌هایند که کسی به خود
              نگاه کرده و آرام گفته است: «این دقیقاً همان چیزی است که وقتی کسی تماشایم نمی‌کند، هستم.»
            </p>
          </div>
        </div>

        <div className="grid-lines reveal mb-20 grid grid-cols-2 overflow-hidden rounded-lg md:mb-28 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-7 md:p-10" style={{ backgroundColor: "var(--paper-deep)" }}>
              <div className="text-[30px] font-extrabold leading-none tracking-tight md:text-[44px]">{stat.value}</div>
              <div className="mini mt-2.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Pill className="reveal">یک جلسه چگونه پیش می‌رود</Pill>
            <h3 className="reveal mt-6 text-[26px] font-bold leading-tight md:text-[34px]">از ایمیل تا چاپ، در چهار گام.</h3>
            <p className="reveal mt-4 text-[13px] leading-7 text-[var(--soft)] md:text-[14.5px]">
              معمولاً چهار تا شش هفتهٔ بعد رزرو می‌کنیم. بیشتر جلسه‌ها شنبه‌ها و سه‌شنبه‌ها برگزار می‌شود — آرام‌ترین روزهای استودیو.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-[var(--hair)]">
              {PROCESS.map((step) => (
                <div
                  key={step.n}
                  className="reveal group grid grid-cols-12 gap-x-4 gap-y-2 border-b border-[var(--hair)] py-7 transition-colors duration-300 hover:bg-[var(--chip)] md:gap-6 md:py-8"
                >
                  <div className="col-span-2 text-[11px] text-[var(--faint)]">{step.n}</div>
                  <div className="col-span-10 md:col-span-4">
                    <h4 className="text-[18px] font-semibold leading-snug md:text-[21px]">{step.title}</h4>
                  </div>
                  <div className="col-span-12 text-[12.5px] leading-7 text-[var(--soft)] md:col-span-6 md:text-[13.5px]">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="reveal mt-20 flex flex-col items-start justify-between gap-8 rounded-3xl px-8 py-14 md:mt-28 md:flex-row md:items-center md:px-14 md:py-20"
          style={{ backgroundColor: "var(--solid)", color: "var(--solid-ink)" }}
        >
          <div className="max-w-xl">
            <h3 className="text-[30px] font-extrabold leading-[1.05] md:text-[48px]">بنشینید و پرتره شوید.</h3>
            <p className="mt-3 text-[13px] leading-7 opacity-65 md:text-[15px]">
              رزروها برای بهار و اوایل تابستان ۱۴۰۵ باز است. برای ما بنویسید تا پنجره‌ای بیابیم.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-7 text-[12.5px] font-medium transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--solid-ink)", color: "var(--solid)" }}
          >
            دربارهٔ یک جلسه پرس‌وجو کنید
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
