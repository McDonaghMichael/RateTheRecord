import {Schema} from "mongoose";

const artistSchema = new Schema({
    name: String,
    age: Number,
    profileImage: String,
    description: String,
    headers: Object
});

export default artistSchema;