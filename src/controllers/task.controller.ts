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
    res.json({ task, message: "Task created successfully" });
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
  res.json({ tasks, message: "Tasks fetched successfully" });
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const { title, description } = req.body;

  console.log(req.params.id, title, description);
  if (!(req as any).userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const task = await prisma.task.update({
      where: { id, userId: (req as any).userId },
      data: { title, description },
    });
    res.json({ task, message: "Task updated successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  if (!(req as any).userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    await prisma.task.delete({
      where: { id, userId: (req as any).userId },
    });
    res.json({ message: "Task deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};
