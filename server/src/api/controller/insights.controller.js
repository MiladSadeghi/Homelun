import mongoose from "mongoose";
import { PropertyViewModel } from "../models/views.model.js";

export const propertyInsight = async (req, res) => {
  const { propertyId, agentId } = req.params;
  const viewedToday =
    req.session.views && req.session.views[propertyId] === new Date().getDate();

  if (!viewedToday) {
    await PropertyViewModel.updateOne(
      {
        property: new mongoose.Types.ObjectId(propertyId),
        agent: new mongoose.Types.ObjectId(agentId),
      },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    if (!req.session.views) {
      req.session.views = {};
    }
    req.session.views[propertyId] = new Date().getDate();
  }

  return res.sendStatus(200);
};
