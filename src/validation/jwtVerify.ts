import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/config";
interface DecodedToken {
  sub: string;
  rollType: string;
  userData: {
    name: string;
    universityEmail: string;
  };
}

export interface CustomRequest extends Request {
  user?: DecodedToken;
}

export const checkForAccessToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token,JWT_SECRET) as DecodedToken;
    req.user = decodedToken; // Attach the decoded token to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};