import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const register = async (req, res) => {
    const { name, email, password, city, age, phone, skill } = req.body;
    if (!name || !email || !password || !city || !age || !phone || !skill) {
        return res.status(400).json({
            err: "All fields are required!",
        });
    }
    try {
        const checkEmailStmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
        const existingEmailUser = checkEmailStmt.get(email);
        if (existingEmailUser) {
            return res
                .status(409)
                .json({ err: "User with this email already registered!" });
        }
        const checkPhoneStmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
        const existingPhoneUser = checkPhoneStmt.get(phone);
        if (existingPhoneUser) {
            return res
                .status(409)
                .json({ err: "User with this phone number already registered!" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const insertStmt = db.prepare(`
            INSERT INTO users (name, email, password, city, age, phone, skill)
            VALUES (?, ?, ?, ?, ?, ?, ?)`);
        const info = insertStmt.run(name, email, hashedPassword, city, age, skill);
        const getStmt = db.prepare(`
        SELECT id, name, email, city, age, phone, skill FROM users WHERE id = ?`);
        const newUser = getStmt.get(info.lastInsertRowid);
        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role || "USER",
        }, process.env.JWT_SECRET, { expiresIn: "168h" });
        return res.status(201).json({
            data: {
                message: "User registered successfully!",
                user: newUser,
                token,
            },
        });
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
const login = async (req, res) => {
    const { identifier, password } = req.body;
    // identifier -> phone or email
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(`
        SELECT password FROM users WHERE email= ?`);
    const passwordSaved = stmt.get(identifier);
    if (!passwordSaved) {
        // hash
        return res.status(404).json({ err: "User with this email not found!" });
    }
    if (hashedPassword != passwordSaved) {
        return res.status(401).json({ err: "Password not correct!" });
    }
    const token = jwt.sign({
        email: identifier,
    }, process.env.JWT_SECRET, { expiresIn: "168h" });
    return res.json({
        data: {
            message: "You login successfully",
            token,
        },
    });
};
export { register, login };
