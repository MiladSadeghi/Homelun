import { sortOptionsCreator } from "../../utils/searchOptions.js";
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

export const getPropertyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(400).json({ error: true });
    const getProperty = await PropertyModel.findOne({
      slug,
      publish: true,
    }).populate({ path: "agent" });
    if (!getProperty) return res.status(404).json({ error: true });
    return res.status(200).json({ error: false, property: getProperty });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export const searchInProperties = async (req, res) => {
  try {
    let {
      page,
      sort,
      bedroom_min = 1,
      bedroom_max = 20,
      bathroom_min = 1,
      bathroom_max = 20,
      square_fit_min = 100,
      square_fit_max = 10000,
      status,
    } = req.query;
    if (page) {
      page = page - 1;
    } else {
      page = 0;
    }

    const sortOptions = sortOptionsCreator(sort);
    const getProperties = await PropertyModel.find({
      publish: true,
      bedrooms: { $gte: bedroom_min, $lte: bedroom_max },
      bathrooms: { $gte: bathroom_min, $lte: bathroom_max },
      area: { $gte: square_fit_min, $lte: square_fit_max },
      ...(status && { status }),
    })
      .sort(sortOptions)
      .limit(8)
      .skip(8 * Math.max(0, page));
    return res.status(200).json({ error: false, listings: getProperties });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
