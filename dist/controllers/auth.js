// controllers/authController.js
import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "../models/auth.js";

const register = async (req, res) => { 
    try {

        const { name, email, password, city, age, phone, skill, role } = req.body;

        // console.log(req.body); true 

        if (!name || !email || !password || !city || !age || !phone || !skill) {
            return res.status(400).json({
                err: "All fields are required!",
            });
        }

        const existingEmailUser = await authModel.findByEmail(email);
        // console.log(existingEmailUser); true
        if (existingEmailUser) {
            return res.status(409).json({ 
                err: "User with this email already registered!" 
            });
        }

        const existingPhoneUser = await authModel.findByPhone(phone);
        // console.log(existingEmailUser); true
        if (existingPhoneUser) {
            return res.status(409).json({ 
                err: "User with this phone number already registered!" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword); true
 
        const result = await authModel.createUser({  //  this 
            name, 
            email, 
            password: hashedPassword, 
            city, 
            age, 
            phone, 
            skill,
            role
        });
         console.log("result: ", result);

        const newUser = await authModel.findById(result.lastInsertRowid);
        //console.log(newUser);

        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role || "USER",
            },
            process.env.JWT_SECRET,
            { expiresIn: "168h" }
        );

        return res.status(201).json({
            data: {
                message: "User registered successfully!",
                user: newUser,
                token,
            },
        });

    } catch (err) {
        console.error('خطا در ثبت نام:', err);
        return res.status(500).json({ err: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // 1. اعتبارسنجی
        if (!identifier || !password) {
            return res.status(400).json({ 
                err: "Email/Phone and password are required!" 
            });
        }

        // 2. پیدا کردن کاربر با ایمیل یا تلفن (با مدل)
        const user = await authModel.findByIdentifier(identifier);
        if (!user) {
            return res.status(404).json({ 
                err: "User with this email/phone not found!" 
            });
        }

        // 3. بررسی پسورد (✅ با compare درست)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ err: "Password is incorrect!" });
        }

        // 4. ساخت JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role || "USER",
            },
            process.env.JWT_SECRET,
            { expiresIn: "168h" }
        );

        // 5. پاسخ موفق
        return res.json({
            data: {
                message: "You logged in successfully!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    city: user.city,
                    age: user.age,
                    phone: user.phone,
                    skill: user.skill,
                    role: user.role
                },
                token,
            }
        });

    } catch (err) {
        console.error('خطا در ورود:', err);
        return res.status(500).json({ err: err.message });
    }
};

export { register, login };