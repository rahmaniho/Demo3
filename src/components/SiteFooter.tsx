import { Mail, MapPin, ArrowUpLeft } from "lucide-react";
import { FOOTER_LINKS, STUDIO } from "@/lib/content";
import { faDate } from "@/lib/fa";
import { cn } from "@/utils/cn";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.6 10.2c.9-.4 1.4-1.1 1.4-2.1 0-2-1.6-2.9-3.4-2.9H1v11.6h4.8c2.1 0 3.9-1 3.9-3.3 0-1.4-.7-2.7-2.1-3.3zm-4.3-3h2.1c.8 0 1.4.3 1.4 1.2 0 .9-.6 1.2-1.4 1.2H3.3V7.2zm2.4 8.4H3.3v-3.9h2.5c1 0 1.7.5 1.7 1.9 0 1.4-.7 2-1.8 2zM23 13.7c0-2.7-1.9-4.7-4.6-4.7-2.8 0-4.7 2-4.7 4.9 0 2.9 1.8 4.9 4.8 4.9 2.2 0 3.8-1 4.4-3h-2.6c-.2.6-1 1-1.7 1-1.2 0-1.9-.7-2-1.9H23v-1.2zm-6.4-.8c.1-1.1.8-1.8 1.9-1.8 1.1 0 1.8.7 1.9 1.8h-3.8zM15.2 6.4h5.1v1.4h-5.1z" />
    </svg>
  );
}

function VimeoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23 7.2c-.1 2.1-1.6 5-4.5 8.7-3 3.8-5.5 5.7-7.6 5.7-1.3 0-2.4-1.2-3.3-3.5-.6-2.2-1.2-4.4-1.8-6.6-.7-2.4-1.4-3.6-2.2-3.6-.2 0-.8.4-1.8 1.1L1 8.9c1.1-1 2.2-2 3.3-3C5.9 4.5 7 3.9 7.7 3.8c1.8-.2 2.9 1 3.4 3.7.5 2.9.8 4.7 1 5.4.5 2.1 1 3.1 1.6 3.1.4 0 1.1-.7 2-2 .9-1.3 1.4-2.4 1.5-3.1.1-1.2-.4-1.8-1.5-1.8-.5 0-1 .1-1.6.4 1.1-3.5 3.1-5.2 6.2-5.1 2.3.1 3.4 1.6 3.2 4.5z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "اینستاگرام", Icon: InstagramIcon, href: STUDIO.instagram },
  { label: "بیهنس", Icon: BehanceIcon, href: STUDIO.behance },
  { label: "ویمئو", Icon: VimeoIcon, href: STUDIO.vimeo },
  { label: "ایمیل", Icon: Mail, href: `mailto:${STUDIO.email}` },
];

export function SiteFooter({ isArchive }: { isArchive: boolean }) {
  const href = (link: string) => (isArchive && link.startsWith("#") && !link.startsWith("#/") ? `#/?to=${link.slice(1)}` : link);

  return (
    <footer id="contact" className="relative w-full px-6 pb-9 pt-24 transition-colors duration-500 md:px-12" style={{ backgroundColor: "var(--paper-3)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-2 gap-10 md:mb-20 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="font-mono text-[28px] font-bold leading-none tracking-tight">karen.</span>
              <span className="text-[11px] text-[var(--faint)]">استودیوی پرتره</span>
            </div>
            <p className="mb-6 max-w-sm text-[13px] leading-7 text-[var(--soft)] md:text-[14.5px] md:leading-8">{STUDIO.tagline}</p>
            <p className="mb-8 flex max-w-sm items-start gap-2 text-[12px] leading-7 text-[var(--faint)]">
              <MapPin className="mt-1.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {STUDIO.address} · کد پستی {STUDIO.postalCode}
              </span>
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hair)] text-[var(--soft)] transition-colors hover:border-transparent hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                >
                  <social.Icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${STUDIO.email}`}
              className="mt-7 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--soft)] transition-colors hover:text-[var(--ink)]"
            >
              نوشتن به استودیو
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </a>
          </div>

          {FOOTER_LINKS.map((column, index) => (
            <div key={column.title} className={cn("md:col-span-2", index === 0 && "col-span-1")}>
              <div className="mini mb-5">{column.title}</div>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={href(link.href)}
                        dir={link.ltr ? "ltr" : undefined}
                        className="text-[12.5px] text-[var(--soft)] transition-opacity hover:opacity-60 md:text-[13px]"
                        style={link.ltr ? { display: "inline-block", textAlign: "right" } : undefined}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span
                        dir={link.ltr ? "ltr" : undefined}
                        className="text-[12.5px] text-[var(--soft)] md:text-[13px]"
                        style={link.ltr ? { display: "inline-block", textAlign: "right" } : undefined}
                      >
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-1 md:col-span-1">
            <div className="mini mb-5">حقوقی</div>
            <ul className="space-y-3">
              {["شناسنامه", "حریم خصوصی", "مجوزها"].map((label) => (
                <li key={label}>
                  <a href="#" className="text-[12.5px] text-[var(--soft)] transition-opacity hover:opacity-60 md:text-[13px]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mb-12 select-none text-center font-mono font-bold leading-[0.8] text-[var(--ink)] opacity-[0.09]"
          style={{ fontSize: "clamp(5rem, 17vw, 16rem)" }}
          aria-hidden="true"
        >
          karen.
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--hair)] pt-7 md:flex-row md:items-center">
          <p className="text-[10.5px] leading-6 text-[var(--faint)]">
            © ۱۴۰۵ کارن استودیو · کارن کیانی. حق نشر همهٔ تصاویر از آنِ سوژه‌های آن‌هاست. · امروز: {faDate()}
          </p>
          <div className="mini flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            رزرو برای بهار ۱۴۰۵
          </div>
        </div>
      </div>
    </footer>
  );
}
