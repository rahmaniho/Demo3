import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { MosaicHero } from "@/components/MosaicHero";
import { FeaturesSection, PortfolioPreview, PricingSection, AboutSection } from "@/components/HomeSections";
import { ArchivePage } from "@/components/ArchivePage";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal, useRoute, useTheme } from "@/hooks/useSite";

export default function App() {
  const { dark, toggle } = useTheme();
  const { route, hash } = useRoute();
  const isArchive = route === "archive";

  useReveal(hash);

  useEffect(() => {
    document.documentElement.lang = "fa";
    document.documentElement.dir = "rtl";
  }, []);

  useEffect(() => {
    document.title = isArchive
      ? "آرشیو — کارن استودیو"
      : "کارن استودیو — استودیوی پرترهٔ کارن کیانی، تهران";
  }, [isArchive]);

  return (
    <div dir="rtl" className="relative min-h-screen">
      <button
        type="button"
        onClick={() => {
          const main = document.getElementById("main");
          if (!main) return;
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
          main.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--paper)]"
      >
        پرش به محتوای اصلی
      </button>

      <SiteHeader dark={dark} onToggleTheme={toggle} isArchive={isArchive} />

      {isArchive ? (
        <main id="main" tabIndex={-1}>
          <ArchivePage />
        </main>
      ) : (
        <main id="main" tabIndex={-1}>
          <MosaicHero dark={dark} />
          <FeaturesSection />
          <PortfolioPreview />
          <PricingSection />
          <AboutSection />
        </main>
      )}

      <SiteFooter isArchive={isArchive} />
    </div>
  );
}
