import {Router} from "express";
import {
  submitContact,
  submitDropFeatureNews,
  submitLatestNews,
  takeTourRequest
} from "../controller/forms.controller.js";

const forms = Router();

forms.post("/drop-feature", submitDropFeatureNews);
forms.post("/latest-news", submitLatestNews)
forms.post("/contact", submitContact)
forms.post("/take-tour", takeTourRequest)

export default forms;
