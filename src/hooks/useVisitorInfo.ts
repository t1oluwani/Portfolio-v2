import { useEffect, useState } from "react";

export type VisitorInfo = {
  // from browser
  timezone: string;
  utcOffset: string;
  locale: string;
  platform: string;
  screen: string;
  theme: "dark" | "light";
  cores?: number;
  memoryGb?: number;
  network?: string;
  referrer?: string;
  // from IP lookup
  city?: string;
  region?: string;
  country?: string;
  lat?: number;
  lon?: number;
  isp?: string;
};

function readBrowserInfo(): VisitorInfo {
  const nav = navigator as any;
  const offsetH = -new Date().getTimezoneOffset() / 60;
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    utcOffset: `UTC${offsetH >= 0 ? "+" : ""}${offsetH}`,
    locale: navigator.language,
    platform: nav.userAgentData?.platform ?? navigator.platform ?? "unknown",
    screen: `${window.screen.width}x${window.screen.height}@${window.devicePixelRatio}x`,
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    cores: navigator.hardwareConcurrency,
    memoryGb: nav.deviceMemory, // Chromium only
    network: nav.connection?.effectiveType, // Chromium only
    referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
  };
}

const CACHE_KEY = "visitor-geo";

export function useVisitorInfo() {
  const [info, setInfo] = useState<VisitorInfo | null>(null);

  useEffect(() => {
    const base = readBrowserInfo();
    setInfo(base);

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setInfo({ ...base, ...JSON.parse(cached) });
        return;
      }
    } catch {}

    const ctrl = new AbortController();
    fetch("https://ipwho.is/", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => {
        if (!d.success) return;
        const geo = {
          city: d.city,
          region: d.region,
          country: d.country,
          lat: d.latitude,
          lon: d.longitude,
          isp: d.connection?.isp,
        };
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(geo)); } catch {}
        setInfo({ ...base, ...geo });
      })
      .catch(() => {}); // keep browser-only info on failure

    return () => ctrl.abort();
  }, []);

  return info;
}

export const fmtCoord = (v: number, pos: string, neg: string) =>
  `${Math.abs(v).toFixed(4)} ${v >= 0 ? pos : neg}`;

export const fmtReadout = (visitor: VisitorInfo | null, origin: string, clock: string): { label: string; value: string }[] => [
  { label: "YOU ARE IN", value: origin },
  { label: "YOUR TIME", value: `${clock} (${visitor?.utcOffset ?? ""})`.trim() },
  {
    label: "YOUR COORDS",
    value:
      visitor?.lat != null && visitor?.lon != null
        ? `${fmtCoord(visitor.lat, "N", "S")} · ${fmtCoord(visitor.lon, "E", "W")}`
        : "—",
  },
  ...(visitor ? [{ label: "YOUR DEVICE", value: `${visitor.platform} (${visitor.screen})` }] : []),
  ...(visitor && (visitor.referrer || visitor.network)
    ? [
        {
          label: "TRACED FROM",
          value: [visitor.referrer, visitor.network?.toUpperCase()]
            .filter(Boolean)
            .join(" → "),
        },
      ]
    : []),
];