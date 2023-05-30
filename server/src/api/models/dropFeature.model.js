import {model, Schema} from "mongoose";

const DropFeatureSchema = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
}, {timestamps: true});
export default model("dropFeature", DropFeatureSchema);
