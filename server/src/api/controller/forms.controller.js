import DropFeatureModel from "../models/dropFeature.model.js";
import LatestNewsModel from "../models/latestNews.model.js";
import ContactModel from "../models/contact.model.js";
import TourModel from "../models/tour.model.js";

export const submitDropFeatureNews = async (req, res) => {
  const {name, email} = req.body;
  try {
    if (!name || !email)
      return res
        .status(400)
        .json({error: true, message: "name or email is invalid"});
    await DropFeatureModel.create({name, email});

    return res.status(200).json({
      error: false,
      message: "Thanks for joining! New features news coming soon.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({error: true, message: "Email already exists!"})
    }
    return res
      .status(500)
      .json({error: true, message: "Internal Server Error"});
  }
};

export const submitLatestNews = async (req, res) => {
  const {email} = req.body;
  try {
    if (!email)
      return res
        .status(400)
        .json({error: true, message: "email is invalid"});
    await LatestNewsModel.create({email})
    return res.status(200).json({
      error: false,
      message: "Thanks for joining! The latest news will be sent to you.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({error: true, message: "Email already exists!"})
    }
    return res
      .status(500)
      .json({error: true, message: "Internal Server Error"});
  }
}

export const submitContact = async (req, res) => {
  const {email, name, message} = req.body;
  try {
    if (!email || !name || !message)
      return res
        .status(400)
        .json({error: true, message: "email, name or message is invalid"});
    await ContactModel.create({email, name, message})
    return res.status(200).json({
      error: false,
      message: "Got it! Thanks for contacting us. We'll be in touch soon.",
    });

  } catch (error) {
    return res
      .status(500)
      .json({error: true, message: "Internal Server Error"});
  }
}

export const takeTourRequest = async (req, res) => {
  const {name, email, message, agent, property} = req.body;
  try {
    if (!email || !name || !message || !agent || !property)
      return res
        .status(400)
        .json({error: true, message: "name, email, request message, agent or property is invalid"});
    await TourModel.create({name, email, message, agent, property});
    return res.status(200).json({
      error: false,
      message: "Thanks for requesting a tour! The agent will be in touch soon. Happy house hunting!"
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({error: true, message: "Your previous tour request is still on the list!"})
    }
    return res
      .status(500)
      .json({error: true, message: "Internal Server Error"});
  }
}