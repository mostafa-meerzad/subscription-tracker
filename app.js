import express from 'express';
import {PORT} from './config/env.js';
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDB from "./database/mongodb.js";

const app = express();

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/subscriptions", subscriptionRouter);

app.get('/', (req, res) => {
    return res.send('Welcome to Subscription Tracker API');
})

app.listen(PORT, async () => {
    await connectToDB()
    console.log(`Subscription Tracker API is running at http://localhost:${PORT}`);
})