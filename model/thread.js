import mongoose from "mongoose";

const threadData = new mongoose.Schema({
    name: String,
    startDate: Date,
    startedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
    active: Boolean,
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}]
});


const Thread = mongoose.model('Thread', threadData);

export default Thread;