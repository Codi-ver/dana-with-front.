// models/users.js
import db from "../db.js";

const usersTable = async () => {
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                city TEXT NOT NULL,
                age INTEGER NOT NULL,
                phone TEXT UNIQUE NOT NULL,
                skill TEXT NOT NULL,
                role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN','USER')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ جدول users ایجاد شد');
    } catch(err) {
        console.error('❌ خطا:', err.message);
    }
};

await usersTable();

const authModel = {
    findByEmail: async (email) => {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return await stmt.get(email);
    },
    
    findByPhone: async (phone) => {
        const stmt = db.prepare('SELECT * FROM users WHERE phone = ?');
        return await stmt.get(phone);
    },
    
    findByIdentifier: async (identifier) => {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ? OR phone = ?');
        return await stmt.get(identifier, identifier);
    },
    
    createUser: async (data) => {
        const { name, email, password, city, age, phone, skill } = data;
        const stmt = db.prepare(`
            INSERT INTO users (name, email, password, city, age, phone, skill)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const result = await stmt.run(name, email, password, city, age, phone, skill);
        return result;
    },
    
    findById: async (id) => {
        const stmt = db.prepare(`
            SELECT id, name, email, city, age, phone, skill, role 
            FROM users WHERE id = ?
        `);
        return await stmt.get(id);
    }
};

export default authModel;