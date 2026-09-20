# وب‌سایت شرکت دانا — Dana Site

سایت شرکتی دانا: فروشگاه محصولات، اتاق خبر، فرم استخدام و پنل مدیریت — با
**Express 5 + SQLite** در بک‌اند و **React 19 + Vite** در فرانت‌اند.

## معماری / Architecture

```
├── server.ts            # نقطه ورود (پورت ۴۰۰۰)
├── app.ts               # Express + CORS + cookie-parser + روت‌ها
├── db.ts                # اتصال SQLite + مایگریشن‌های اسکیما
├── seed.ts              # ساخت کاربر مدیر/نمونه + انتشار خبرهای پیش‌نویس
├── controllers/         # auth, users, news, services, hiring
├── models/              # دسترسی به داده (better-sqlite3)
├── routes/              # مسیرهای REST
├── middlewares/          # requireAuth / optionalAuth / isAdmin
├── utils/uploader.ts    # آپلود تصویر با multer (فقط عکس، حداکثر ۵MB)
├── uploads/             # فایل‌های آپلودشده (serve از /uploads)
└── view/frontend/       # SPA فارسی RTL با React + Vite (پورت ۵۱۷۳)
```

## احراز هویت / Authentication

- ورود و ثبت‌نام یک **JWT** را در کوکی `dana_token` با ویژگی `httpOnly`
  قرار می‌دهند (`SameSite=Lax`، یک هفته اعتبار).
- مرورگر کوکی را خودکار با همه درخواست‌ها می‌فرستد؛ فرانت‌اند فقط
  `credentials: "include"` ست می‌کند — هیچ توکنی در localStorage ذخیره نمی‌شود.
- `GET /auth/me` کاربر جاری را برمی‌گرداند، `POST /auth/logout` کوکی را پاک می‌کند.
- مسیرهای مدیریتی با `requireAuth` + `isAdmin` محافظت می‌شوند.

## راه‌اندازی / Getting started

```bash
# بک‌اند
cp .env.example .env      # مقادیر را ویرایش کنید
npm install
npm run seed              # مایگریشن + کاربر مدیر و نمونه
npm run dev               # http://localhost:4000

# فرانت‌اند (ترمینال جدید)
cd view/frontend
npm install
npm run dev               # http://localhost:5173
```

### حساب‌های آزمایشی (پیش‌فرض seed)

| نقش   | ایمیل             | رمز        |
| ----- | ----------------- | ---------- |
| مدیر  | `admin@dana.site` | `admin1234` |
| کاربر | `demo@dana.site`  | `demo1234`  |

(در `.env` قابل تغییر است.)

## API

| متد   | مسیر                     | دسترسی      |
| ----- | ------------------------ | ----------- |
| POST  | `/auth/register`         | عمومی       |
| POST  | `/auth/login`            | عمومی       |
| POST  | `/auth/logout`           | عمومی       |
| GET   | `/auth/me`               | نیاز به ورود |
| GET   | `/news` · `/news/latest` | عمومی¹      |
| GET   | `/news/:id`              | عمومی       |
| POST  | `/news` (multipart)      | مدیر        |
| PUT   | `/news/:id/publish`      | مدیر        |
| DELETE| `/news/:id`              | مدیر        |
| GET   | `/services` · `/:id`     | عمومی       |
| POST  | `/services` (multipart)  | مدیر        |
| DELETE| `/services/:id`          | مدیر        |
| POST  | `/hiring/apply`          | عمومی²      |
| GET   | `/hiring`                | مدیر        |
| GET   | `/users` · `/:id`        | مدیر        |
| DELETE| `/users/:id`             | مدیر        |

¹ مدیر با `?all=1` پیش‌نویس‌ها را هم می‌بیند.
² با کوکی نشست، درخواست به حساب کاربر متصل می‌شود.

فیلد تصویر در فرم‌های ساخت، `image` نام دارد (multipart/form-data).
