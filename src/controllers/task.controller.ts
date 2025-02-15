import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response): Promise<any> => {
  const { title, description } = req.body;
  if (!(req as any).userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const task = await prisma.task.create({
      data: { title, description, userId: (req as any).userId },
    });
    res.json(task);
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const getTasks = async (req: Request, res: Response): Promise<any> => {
  if (!(req as any).userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const tasks = await prisma.task.findMany({
    where: { userId: (req as any).userId },
  });
  res.json(tasks);
};
