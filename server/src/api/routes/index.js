import { Router } from "express";

const routes = Router();

routes.get("/status", (req, res) => res.send("OK"));

export default routes;
