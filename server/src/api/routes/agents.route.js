import { Router } from "express";
import { getAllAgents } from "../controller/agents.controller.js";

const agents = Router();

agents.get("/", getAllAgents);

export default agents;
