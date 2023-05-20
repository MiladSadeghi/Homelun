import { Router } from "express";
import { provideHomeData } from "../controller/home.controller.js";

const homeRoute = Router();

homeRoute.get("/", provideHomeData);

export default homeRoute;
