import AgentModel from "../models/agent.model.js";
import PropertyModel from "../models/property.model.js";

const provideHomeData = async (req, res) => {
  try {
    let getTopAgents = await PropertyModel.aggregate([
      {
        $lookup: {
          from: "agents",
          localField: "agent",
          foreignField: "_id",
          as: "agentDetails",
        },
      },
      {
        $unwind: "$agentDetails",
      },
      {
        $group: {
          _id: "$agentDetails._id",
          name: { $first: "$agentDetails.name" },
          cover: { $first: "$agentDetails.cover" },
          slug: { $first: "$agentDetails.slug" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 2,
      },
    ]);
    const getProperty = await PropertyModel.find({ publish: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "agent",
      });
    const rentProperty = getProperty
      .filter((apartment) => apartment.status === "rent")
      .slice(0, 3);
    const saleProperty = getProperty
      .filter((apartment) => apartment.status === "sale")
      .slice(0, 3);
    const getAgents = await AgentModel.find({ publish: true }, "", {
      limit: 3,
    });
    return res.status(200).json({
      error: false,
      agents: { topAgents: getTopAgents, agents: getAgents },
      properties: { rent: rentProperty, sale: saleProperty },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export { provideHomeData };
