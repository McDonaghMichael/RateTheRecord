import {Schema} from "mongoose";

const albumSchema = new Schema({
    title: String,
    year: Number,
    coverArt: String,
    description: String,
    artist: String
});

export default albumSchema;