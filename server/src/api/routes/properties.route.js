import { Router } from "express";
import {
  getAgentProperties,
  getPropertyBySlug,
  searchInProperties,
} from "../controller/properties.controller.js";

const properties = Router();

properties.get("/search", searchInProperties);
properties.get("/agent/:agent", getAgentProperties);
properties.get("/:slug", getPropertyBySlug);

export default properties;
