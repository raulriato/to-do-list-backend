import { Task } from "@prisma/client";
import { prisma } from "../database/mysql.js";

async function create({
  title,
  description,
  endAt,
  priority,
  startAt,
  userId
}: Omit<Task, 'id'>): Promise<Task> {
    return prisma.task.create({
        data: {
          title,
          description,
          endAt,
          priority,
          startAt,
          userId
        }
    })
};

async function findByTitle(title: string) {
  return prisma.task.findFirst({
    where: {
      title
    }
  })
}

export {
  create,
  findByTitle
}
