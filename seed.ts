/**
 * Idempotent seed: safe to run repeatedly.
 *  - ensures an admin + demo user exist (credentials from .env)
 *  - publishes existing draft news so the public site is not empty
 *  - drops a placeholder image into uploads/
 */
import env from "dotenv";
env.config();
import fs from "fs";
import path from "path";
import db from "./db.js";
import usersModel from "./models/users.js";

const ensureUser = (
  email: string,
  password: string,
  name: string,
  role: string,
  phone: string,
) => {
  if (usersModel.findByEmail(email)) {
    console.log(`ℹ️  ${email} already exists`);
    return;
  }
  usersModel.createUser({
    name,
    email,
    password,
    city: "تهران",
    age: 30,
    phone,
    skill: "-",
    role,
  });
  console.log(`✅ Created ${role}: ${email} / ${password}`);
};

console.log("🌱 Seeding…");

ensureUser(
  process.env.ADMIN_EMAIL ?? "admin@dana.site",
  process.env.ADMIN_PASSWORD ?? "admin1234",
  "مدیر سایت دانا",
  "ADMIN",
  "09100000001",
);
ensureUser(
  process.env.DEMO_EMAIL ?? "demo@dana.site",
  process.env.DEMO_PASSWORD ?? "demo1234",
  "کاربر نمونه",
  "USER",
  "09100000002",
);

const published = db
  .prepare(`SELECT COUNT(*) AS c FROM news WHERE status = 'published'`)
  .get() as { c: number };
if (published.c === 0) {
  db.prepare(`UPDATE news SET status = 'published'`).run();
  console.log("✅ Existing draft news published");
} else {
  console.log(`ℹ️  ${published.c} published news already present`);
}

const uploadsDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
const placeholder = path.join(uploadsDir, "placeholder.svg");
if (!fs.existsSync(placeholder)) {
  fs.writeFileSync(
    placeholder,
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#e8e3d8"/><circle cx="400" cy="270" r="90" fill="#c9c1b0"/><rect x="250" y="390" width="300" height="16" rx="8" fill="#c9c1b0"/><rect x="310" y="420" width="180" height="12" rx="6" fill="#d8d2c4"/></svg>`,
  );
  console.log("✅ uploads/placeholder.svg created");
}

console.log("🌱 Done.");
db.close();
