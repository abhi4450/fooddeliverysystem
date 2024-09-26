import { NextFunction, Request, Response } from "express";
import User from "../model/user";
import helpers from "../library/helper";
import validationSchema from "../library/validationSchema";
import jwt from "jsonwebtoken";


const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await validationSchema.signupSchema.validateAsync(req.body);

    const hashedPassword = await helpers.hashPassword(result.password);

    const existingUser = await User.getUserByEmail(result.email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const newUser = await User.insertUser({
      ...result,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err: any) {
    if (err.isJoi) {
      res
        .status(400)
        .json({ message: "Validation error", details: err.details });
      return;
    }

    res.status(500).json({ message: "Internal server error", err });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const result = await validationSchema.loginSchema.validateAsync(req.body);

  try {
    const user = await User.getUserByEmail(result.email);
    if (!user) {
      return <any>res.status(404).json({ message: "Invalid Credentials" });
    }

    const passwordMatch = await helpers.comparePassword(
      result.password,
      user.password
    );
    if (!passwordMatch) {
      return <any>res.status(401).json({
        message: "Email is valid but incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    user.password = undefined;
    return <any>res.status(200).json({
      message: "User Logged In Successfully.",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return <any>res.status(500).json({ message: "Internal Server Error" });
  }
};

const addAddress = async (req: any, res: Response) => {
  try {
    const result = await validationSchema.addressSchema.validateAsync(req.body);

    const newAddress = await User.createAddress({
      ...result,
      user_id: req.user.id,
    });
    return res.status(201).json({
      newAddress: newAddress,
      message: "Address created successfully",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err });
  }
};
const userController = {
  signup,
  login,
  addAddress,
};

export default userController;
