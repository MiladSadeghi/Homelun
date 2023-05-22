import { Router } from "express";
import {
  getAgentWithSlug,
  getAllAgents,
} from "../controller/agents.controller.js";

const agents = Router();

agents.get("/", getAllAgents);
agents.get("/:slug", getAgentWithSlug);

export default agents;
