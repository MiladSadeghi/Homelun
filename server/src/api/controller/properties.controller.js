import PropertyModel from "../models/property.model.js";

export const getAgentProperties = async (req, res) => {
  try {
    const { agent } = req.params;
    if (!agent) return res.status(400).json({ error: true });
    const getProperties = await PropertyModel.find({ agent, publish: true });
    if (!getProperties) return res.status(404).json({ error: true });
    return res.status(200).json({ error: false, properties: getProperties });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
