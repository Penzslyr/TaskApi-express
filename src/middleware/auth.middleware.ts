import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    (req as any).userId = decoded.userId; // ✅ TypeScript now recognizes userId
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
    return;
  }
};
