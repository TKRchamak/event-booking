import express, { Application } from "express";
import cors from "cors";
import userRouter from './app/modules/user/user.router';
import cityRouter from './app/modules/city/city.router';
import eventTypeRouter from './app/modules/eventType/eventType.router';
import organizerRouter from './app/modules/organizer/organizer.router';
import eventRouter from './app/modules/event/event.router';
import paymentRouter from './app/modules/payment/payment.router';
// import { getAuthToken } from "./app/utils/authentication";

const app: Application = express();

// using cors
app.use(cors({ credentials: true, origin: true }));

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router
app.use('/api/v1/city', cityRouter);
app.use('/api/v1/event_type', eventTypeRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/organizer', organizerRouter);
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/payment', paymentRouter);

export default app;

