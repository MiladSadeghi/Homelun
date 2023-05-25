import { Router } from "express";
import {
  getAgentProperties,
  getPropertyBySlug,
} from "../controller/properties.controller.js";

const properties = Router();

properties.get("/agent/:agent", getAgentProperties);
properties.get("/:slug", getPropertyBySlug);

export default properties;
