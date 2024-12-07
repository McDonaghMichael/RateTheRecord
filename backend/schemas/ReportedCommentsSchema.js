import {Schema} from "mongoose";

const reportedCommentsSchema = new Schema({
    reason: String,
    commentId: String,
    commentAuthor: String,
    commentContent: String
});

export default reportedCommentsSchema;