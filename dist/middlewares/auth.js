import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization")?.split(" ");
    if (!authHeader || authHeader.length != 2) {
        return res.status(403).json({
            err: "This route is protected and you can't have access to it !!",
        });
    }
    const token = authHeader[1];
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const jwtPayload = jwt.verify(token, secret);
        if (!jwtPayload.id) {
            throw new Error("Invalid token payload");
        }
        const stmt = db.prepare(`
            SELECT role, id
            FROM users
            WHERE id = ?`);
        let user = stmt.get(jwtPayload.id);
        if (!user) {
            return res.status(404).json({ err: "User not found!" });
        }
        req.user = user;
        return next();
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
};
export default authMiddleware;
