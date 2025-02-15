import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../services/auth.services";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.json({ message: "User registered", user });
    return;
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }

  const token = generateToken(user.id);
  res.json({ token });
  return;
};
