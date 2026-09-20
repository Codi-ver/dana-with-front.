import type { CSSProperties } from "react";

/** Eight-point star (ستاره هشت‌پر) — brand mark & ornament. */
export default function Star({
  className,
  style,
  main = "#d9971e",
  accent = "#1c2f6e",
}: {
  className?: string;
  style?: CSSProperties;
  main?: string;
  accent?: string;
}) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill={accent} />
      <path
        d="M32 7l5.8 12.5L50 13.7l-3.4 12.6L59.6 30l-13 4.7 3.4 12.6-12.2-5.8L32 54.3l-5.8-12.8-12.2 5.8L17.4 34.7 4.4 30l13-3.7L14 13.7l12.2 5.8z"
        fill={main}
      />
      <circle cx="32" cy="30.5" r="6.5" fill={accent} />
    </svg>
  );
}
