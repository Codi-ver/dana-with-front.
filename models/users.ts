/*import db from "../server";

const usersTable = () => {
    try {
        const table = db.prepare(`
            CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL ,
            city TEXT NOT NULL,
            age INTEGER NOT NULL,
            phone INTEGER UNIQUE NOT NULL,
            skill TEXT NOT NULL,
            role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN','USER')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        table.run();
    }
    catch(err: any) {
        console.error(err.message);
    }
};

export default usersTable;
*/