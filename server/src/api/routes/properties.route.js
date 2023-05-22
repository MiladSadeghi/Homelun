import { Router } from "express";
import { getAgentProperties } from "../controller/properties.controller.js";

const properties = Router();

properties.get("/:agent", getAgentProperties);

export default properties;
