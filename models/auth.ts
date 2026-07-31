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
        console.log('✅ جدول auth ایجاد شد');
    } catch(err: any) {
        console.error('❌ خطا:', err.message);
    }
};

await usersTable();

interface ICreateUser {
    name: string,
    email: string,
    password: string,
    phone: string,
    city: string,
    age: number,
    skill: string,
    role: string
}

const authModel = {
    findByEmail: (email: any) => {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return stmt.get(email);
    },
    
    findByPhone: (phone: string) => {
        const stmt = db.prepare('SELECT * FROM users WHERE phone = ?');
        return stmt.get(phone);
    },
    
    findByIdentifier: (identifier: string) => {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ? OR phone = ?');
        return stmt.get(identifier, identifier);
    },
    
    
    createUser: (data: ICreateUser) => {
        const { name, email, password, city, age, phone, skill, role } = data;
        const userRole = role || 'USER';
        const stmt = db.prepare(`
            INSERT INTO users (name, email, password, city, age, phone, skill, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(name, email, password, city, age, phone, skill, userRole);
        console.log(result); 
        return result;
    },
    
    findById: (id: number) => {
        const stmt = db.prepare(`
            SELECT id, name, email, city, age, phone, skill, role 
            FROM users WHERE id = ?
        `);
        return stmt.get(id);
    }
};

export default authModel;


// token user:
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJzYWxpbWVzYWxlbWlAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3ODUxNDYxNjYsImV4cCI6MTc4NTc1MDk2Nn0.lE8wltPVv2IPLiCn3OB1SBCDjezurz3gpN4loCssgHY"

//token admin:
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJlbGhhbWFmc2FyaUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3ODUxNDY0MjIsImV4cCI6MTc4NTc1MTIyMn0.QJPs8M_z7l39gyNhPIv0nDW7mEeuwzfZZrTGRS-Fk0c"