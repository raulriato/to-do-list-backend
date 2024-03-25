import { Request, Response } from "express";
import * as taskRepository from '../repositories/task-repository.js';
import * as userRepository from '../repositories/user-repository.js';
import { badRequestResponse, conflictResponse, createdResponse, serverErrorResponse, unprocessableRequestResponse } from "../helper/responses.js";
import { Task } from "@prisma/client";
import { taskSchema } from "../schemas/task-schema.js";

async function post(req: Request, res: Response) {
  const task = req.body as Omit<Task, 'id'>;

  const { error } = taskSchema.validate(task, { abortEarly: false });

  if (error) {
    const messages = error.details.map(detail => detail.message)
    return unprocessableRequestResponse(res, messages);
  };

  try {
    const user = await userRepository.findById(task.userId);

    if (!user) {
      return badRequestResponse(res, 'Esse usuário não existe!');
    }
    
    await taskRepository.create(task);
    return createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

export {
  post
};