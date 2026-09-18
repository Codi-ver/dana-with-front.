import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import usersModel from "../models/users.js";

interface IResponse extends Response {
  err?: string;
  data?: any;
}

interface IUser {
  id: number | bigint;
  name: string;
  email: string;
  city: string;
  password: string;
  age: number;
  phone: string;
  skill: string;
  created_at?: string;
}
const register = async (
  req: Request<{}, {}, IUser>,
  res: IResponse,
): Promise<IResponse> => {
  const { name, email, password, city, age, phone, skill } = req.body;
  if (!name || !email || !password || !city || !age || !phone || !skill) {
    return res.status(400).json({
      err: "All fields are required!",
    });
  }

  try {
    const existEmail = await usersModel.findByEmail(email);
    if (existEmail != undefined) {
      return res.status(409).json("User with this email already registered!");
    }
    const existPhone = await usersModel.findByPhone(phone);

    if (existPhone != undefined) {
      return res
        .status(409)
        .json("User with this phone number already registered!");
    }

    const result = await usersModel.createUser({
      name,
      email,
      password,
      city,
      age,
      phone,
      skill,
      role: "USER",
    });
    const newUser = usersModel.getOne(result.lastInsertRowid);

    console.log(newUser);

    const token = jwt.sign(
      {
        id: newUser.id,
        email,
        role: "USER",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "168h" },
    );

    return res.json({
      message: "User registered successfully!",
      token,
    });
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};

interface IBody {
  email: string;
  password: string;
}
const login = async (
  req: Request<{}, {}, IBody>,
  res: Response,
): Promise<Response<IResponse>> => {
  const { email, password } = req.body;

  const existEmail = usersModel.findByEmail(email);
  if (!existEmail) {
    return res.status(404).json("User with this email not found!");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  if (hashedPassword != existEmail.password) {
    return res.status(401).json({ err: "Password not correct!" });
  }

  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "168h" },
  );

  return res.json({
    data: {
      message: "You login successfully",
      token,
    },
  });
};

export { register, login };
