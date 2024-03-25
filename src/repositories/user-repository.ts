import { User } from "@prisma/client";
import { prisma } from "../database/mysql.js";

async function create({ name, username, password}: Omit<User, 'id'>): Promise<User> {
    return prisma.user.create({
        data: {
            name,
            username,
            password
        }
    })
};

async function findByName(name: string) {
  return prisma.user.findUnique({
    where: {
      name
    }
  })
}

export {
  create,
  findByName
}
