import {model, Schema} from "mongoose";

const LatestNewsModel = Schema({
    email: {
        type: String,
        unique: true
    }
}, {timestamps: true})

export default model("latest-news", LatestNewsModel)