import express from "express";
import Device from "../model/device.js";
import User from "../model/user.js";
import verifyAuth from "../middleware/verifyAuth.js";

const deviceRouter = express.Router();

deviceRouter.post("/new", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        const devicePayload = {
            name: req.body.name,
            image: req.body.image,
            active: truei
        };

        const newDevice = await Device.create(devicePayload);

        user.devices.push(newDevice.id);

        await user.save();

        res.json(newDevice.map((device) => {return {
            id: device.id,
            name: device.name,
            image: device.image,
            active: device.active
        }}));
    }
});

deviceRouter.get("/", verifyAuth, async (req, res)=> {

    const user = await User.findById(req.user._id);

    const userDevices = [];

    user.devices.forEach((device) => {
        const foundDevice = Device.findById(device.toString());
        if(foundDevice) {
            userDevices.push(foundDevice);
        }
    })

    res.json(userDevices.map((device) => { return {
        id: device.id,
        name: device.name,
        image: device.image,
        active: device.active
    }}))
});

export default deviceRouter;