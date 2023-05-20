import mongoose, { Schema } from "mongoose";

const AgentSchema = Schema(
  {
    name: {
      type: String,
    },
    field: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    social: {
      type: {
        instagram: String,
        linkedin: String,
        twitter: String,
      },
    },
    about: {
      type: String,
    },
    cover: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  { timestamp: true }
);

export default mongoose.model("agent", AgentSchema);
