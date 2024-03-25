import { Request, Response } from "express";
import * as userRepository from '../repositories/user-repository.js';
import { conflictResponse, createdResponse, serverErrorResponse, unprocessableRequestResponse } from "../helper/responses.js";
import { User } from "@prisma/client";
import { userSchema } from "../schemas/user-schema.js";
import bcrypt from 'bcrypt';

async function post(req: Request, res: Response) {
  const user = req.body as Omit<User, 'id'>;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const messages = error.details.map(detail => detail.message)
    return unprocessableRequestResponse(res, messages);
  };

  try {
    const dbUser = await userRepository.findByName(user.name);

    if (!!dbUser) {
      console.log({ dbUser });
      return conflictResponse(res, 'um usuário com esse nome já existe');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await userRepository.create({
      ...user,
      password: hashedPassword
    });
    return createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

export {
  post
};