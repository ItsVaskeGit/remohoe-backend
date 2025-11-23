import express from "express";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {

    const existingUser = await User.find({username: req.body.username});

    console.log(existingUser)

    if(existingUser.length !== 0) {

        const payloadToReturn = {
            message: "User already exists."
        }

        res.json(payloadToReturn);
    }else {

        const username = req.body.username;
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = bcrypt.hashSync(req.body.password, 10);

        const newUser = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        }

        const user = await User.create(newUser);

        user.password = "hidden";

        res.json(user);
    }

});

export default registerRouter;