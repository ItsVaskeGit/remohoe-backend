import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import verifyAuth from "../middleware/verifyAuth.js";

const accountRouter = express.Router();

accountRouter.get("/personal-data", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    const payload = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };

    res.json(payload);
});

accountRouter.put("/", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {

        user.username = req.body.username;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.password = bcrypt.hashSync(req.body.password, 10);

        await user.save();

        user.password = "hidden";

        res.status(202).json(user);
    }

});

export default accountRouter;