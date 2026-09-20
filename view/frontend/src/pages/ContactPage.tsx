const ITEMS = [
  { icon: "☎", label: "تلفن تماس", value: "۰۲۱-۱۲۳۴۵۶۷۸", href: "tel:+982112345678" },
  { icon: "✉", label: "ایمیل", value: "danaSite12@gmail.com", href: "mailto:danaSite12@gmail.com" },
  { icon: "◎", label: "نشانی", value: "تهران، خیابان آزادی، پلاک ۱۲، طبقه ۳" },
  { icon: "🕐", label: "ساعات کاری", value: "شنبه تا چهارشنبه، ۹ تا ۱۷" },
  { icon: "✦", label: "تلگرام", value: "@dana-Company", href: "https://t.me/dana-Company" },
  { icon: "◉", label: "اینستاگرام", value: "@dana-Company", href: "https://instagram.com/dana-Company" },
];

export default function ContactPage() {
  return (
    <div className="container section">
      <div className="page-head">
        <span className="eyebrow">ارتباط با ما</span>
        <h1>گفت‌وگو را آغاز کنیم</h1>
        <p>
          برای مشاوره، همکاری یا هر پرسشی، از راه‌های زیر با ما در تماس باشید؛
          معمولاً در کمتر از یک روز کاری پاسخ می‌دهیم.
        </p>
      </div>

      <div className="contact-grid">
        {ITEMS.map((item) => {
          const content = (
            <>
              <span className="contact-item__icon">{item.icon}</span>
              <div>
                <strong>{item.label}</strong>
                {item.href ? <p>{item.value}</p> : <p>{item.value}</p>}
              </div>
            </>
          );
          return item.href ? (
            <a
              key={item.label}
              className="contact-item"
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <div key={item.label} className="contact-item">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
