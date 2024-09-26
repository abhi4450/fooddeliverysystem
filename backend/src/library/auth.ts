import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const requireSignin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    console.log("req.user", req.user);

    next();
  } catch (err: any) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};

export default requireSignin;
