import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import userRouter from './routers/user-router.js';
import taskRouter from './routers/task-router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.get('/status', (req: Request, res: Response) => res.status(200).send('olaaaaaaaaaaaa'));

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason)
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', JSON.stringify(err))
});