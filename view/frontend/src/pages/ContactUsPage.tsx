function AboutUsPage() {
  const phone = "021-12345678";
  const email = "danaSite12@gmail.com";
  const address = "";
  const workingHours = "";
  const telegram = "https://t.me/dana-Company";
  const instagram = "https://instagram.com/dana-Company";
  return (
    <div className="contact-us-page">
      <h2 className="contact-title">📬 ارتباط با ما</h2>
      <div className="contact-grid">
        <div className="contact-item">
          <span className="contact-icon">📞</span>
          <div>
            <strong>تلفن:</strong>
            <p>{phone}</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">✉️</span>
          <div>
            <strong>ایمیل:</strong>
            <p>{email}</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📍</span>
          <div>
            <strong>آدرس:</strong>
            <p>{address}</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">🕐</span>
          <div>
            <strong>ساعات کاری:</strong>
            <p>{workingHours}</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">💬</span>
          <div>
            <strong>تلگرام:</strong>
            <p>{telegram}</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📷</span>
          <div>
            <strong>اینستاگرام:</strong>
            <p>{instagram}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
