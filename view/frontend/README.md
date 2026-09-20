# دانا — فرانت‌اند

SPA فارسی و راست‌به‌چپ با **React 19 + Vite + TypeScript**.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # بررسی تایپ + بیلد تولیدی
```

## نکته‌ها

- احراز هویت با **کوکی httpOnly** است؛ `src/auth/AuthContext.tsx` در بارگذاری
  اولیه `GET /auth/me` را صدا می‌زند و `credentials: "include"` همه‌جا فعال است.
- آدرس بک‌اند را می‌توانید با متغیر محیطی `VITE_API_URL` عوض کنید
  (پیش‌فرض `http://localhost:4000`).
- سیستم طراحی (پالت لاجوردی/زعفرانی، فونت لاله‌زار + وزیرمتن، الگوی هشت‌پر)
  در `src/styles/` قرار دارد.

## ساختار

```
src/
├── api.ts              # کلاینت fetch با کوکی
├── auth/AuthContext    # وضعیت نشست (ورود/ثبت‌نام/خروج)
├── components/         # Navbar, Footer, Cards, SmartImage, Guards, …
├── pages/              # صفحات سایت + میزکار و پنل مدیریت
└── styles/             # tokens / base / components / pages
```
