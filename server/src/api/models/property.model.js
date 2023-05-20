import { mongoose } from "mongoose";
const PropertySchema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    furnished: {
      type: Boolean,
    },
    exclusivity: {
      type: [String],
    },
    price: {
      type: String,
    },
    offPercent: {
      type: Number,
      min: 0,
      max: 100,
    },
    about: {
      type: String,
    },
    amenities: [
      {
        type: {
          _id: { type: mongoose.Types.ObjectId, auto: true },
          amenityTitle: String,
          amenity: [String],
        },
      },
    ],
    gallery: [
      {
        type: {
          _id: { type: mongoose.Types.ObjectId, auto: true },
          url: String,
        },
      },
    ],
    location: {
      type: {
        long: String,
        lat: String,
      },
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
    },
    slug: {
      type: String,
      unique: true,
      required: [true, "check slug"],
    },
    status: {
      type: String,
      enum: ["rent", "sale"],
      default: "rent",
    },
    area: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("property", PropertySchema);
