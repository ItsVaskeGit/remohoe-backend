import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import homeRouter from './rest/home.js';
import accountRouter from './rest/account.js';
// import devicesRouter from './rest/devices.js';
import deviceRouter from './rest/device.js';
import forumRouter from './rest/forum.js';
import registerRouter from "./rest/register.js";
import loginRouter from './rest/login.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors())
dotenv.config();

async function connect() {
    await mongoose.connect(process.env.MONGODB_URI);
}

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter)
app.use("/account", accountRouter);
// app.use("/devices", devicesRouter);
app.use("/device", deviceRouter);
app.use("/forum", forumRouter);

app.listen(3000, () => { console.log("Started listening to the port 3000.") })

connect().then(() => { console.log("Connected to MongoDB") });