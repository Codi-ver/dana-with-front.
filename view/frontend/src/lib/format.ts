/** Persian digits + locale date for display. */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const faNum = (value: number | string): string =>
  String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** `2026-09-14 08:07:13` (SQLite UTC) → Persian local date string. */
export const faDate = (sqliteDate: string | undefined): string => {
  if (!sqliteDate) return "";
  const iso = sqliteDate.includes("T")
    ? sqliteDate
    : sqliteDate.replace(" ", "T") + "Z";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/** First glyph of a name, for avatar chips. */
export const initial = (name: string | undefined): string =>
  (name ?? "?").trim().charAt(0) || "؟";
