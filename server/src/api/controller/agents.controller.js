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

export const getAgentWithSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(400).json({ error: true });
    const getAgent = await AgentModel.findOne({ slug, publish: true }).exec();
    if (!getAgent) return res.status(404).json({ error: true });
    return res.status(200).json({ error: false, agent: getAgent });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
