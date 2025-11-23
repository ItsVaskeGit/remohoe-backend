import express from "express";
import User from "../model/user.js";
import Thread from "../model/thread.js";
import Comment from "../model/comment.js";
import verifyAuth from "../middleware/verifyAuth.js";

const forumRouter = express.Router();

forumRouter.get("/", verifyAuth, async (req, res) => {

    const threads = await Thread.find();

    res.json(threads.map((thread) => {
        return {
            id: thread.id,
            name: thread.name,
            startedBy: thread.startedBy.toString(),
            startedAt: thread.startDate,
            active: thread.active
        }
    }));
});

forumRouter.get("/thread/:threadId", verifyAuth, async (req, res) => {

    const thread = await Thread.findById(req.params.threadId);

    const startedBy = User.findById(thread.startedBy.toString());

    let comments = await Comment.find({ _id: { $in: thread.comments}});

    const constructedComments = comments.map((entry) => {
        return {
            id: entry.id,
            user: entry.user,
            commentDate: entry.commentDate,
            data: entry.data
        }
    });

    const completeThread = {
        id: thread.id,
        name: thread.name,
        startDate: thread.startDate,
        startedBy: thread.startedBy,
        active: thread.active,
        comments: constructedComments
    }

    res.json(completeThread);
});

forumRouter.post("/new", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {

        const newThreadPayload = {
            name: req.body.name,
            startDate: Date.now(),
            startedBy: user.id,
            active: true
        };

        const newThread = await Thread.create(newThreadPayload);

        res.status(201).json(newThread);

    }else {
        res.status(401).json({message: "Not logged in properly."})
    }
});

forumRouter.put("/thread/:threadId/new", verifyAuth, async (req, res) => {

    const user = await User.findById(req.user._id);

    const thread = await Thread.findById(req.params.threadId);

    if(!user) {
        res.status(401).json("Not logged in properly.");
    }

    if(!thread) {
        res.status(404).json("");
    }

    const newCommentPayload = {
        data: req.body.data,
        user: user.id,
        thread: thread.id,
        commentDate: Date.now()
    };

    const newComment = await Comment.create(newCommentPayload);

    thread.comments.push(newComment.id);

    await thread.save();

    res.status(201).json(newComment);
})

export default forumRouter;