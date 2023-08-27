import express, { Application } from "express";
import cors from "cors";
import userRouter from './app/modules/user/user.router';
// import { getAuthToken } from "./app/utils/authentication";

const app: Application = express();

// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router
app.use('/api/v1/user', userRouter);

export default app;

