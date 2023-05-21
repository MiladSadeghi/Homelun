import AgentModel from "../models/agent.model.js";

export const getAllAgents = async (req, res) => {
  try {
    const getAgents = await AgentModel.find({ publish: true });
    return res.status(200).json({ error: false, agents: getAgents });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
