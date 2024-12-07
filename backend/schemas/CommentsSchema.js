import {Schema} from "mongoose";

const commentsSchema = new Schema({
    albumId: String,
    author: String,
    rating: Number,
    comment: String
});

export default commentsSchema;