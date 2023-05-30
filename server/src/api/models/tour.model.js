import {model, Schema} from "mongoose";

const TourModel = Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    request: String,
    agent: {
        type: Schema.Types.ObjectId,
        ref: "agent",
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: "property",
    }
}, {timestamp: true})

export default model("tour", TourModel)