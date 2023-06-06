import { Router } from "express";
import { propertyInsight } from "../controller/insights.controller.js";

const insightRouter = Router();

insightRouter.get("/property/:agentId/:propertyId", propertyInsight);

export default insightRouter;
