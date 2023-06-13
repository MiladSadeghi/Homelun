import mongoose from "mongoose";
import { PropertyViewModel } from "../models/views.model.js";

export const propertyInsight = async (req, res) => {
  const { propertyId, agentId } = req.params;

	const today = new Date();
  today.setHours(0, 0, 0, 0);

  const viewedToday =
    req.session.views && req.session.views.includes(propertyId);

  if (!viewedToday) {
    await PropertyViewModel.updateOne(
      {
        property: new mongoose.Types.ObjectId(propertyId),
        agent: new mongoose.Types.ObjectId(agentId),
        createdAt: { $gte: today },
      },
      {
        $inc: { count: 1 },
      },
      { upsert: true }
    );
    if (!req.session.views) {
      req.session.views = [];
    }
    req.session.views.push(propertyId);
  }

  return res.sendStatus(200);
};
