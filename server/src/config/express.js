import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import {converter, handler, notFound} from "../api/middleware/error.js";
import homeRoute from "../api/routes/home.route.js";
import {corsOptions} from "./corsConfig.js";
import agents from "../api/routes/agents.route.js";
import properties from "../api/routes/properties.route.js";
import forms from "../api/routes/forms.route.js";

const app = express();

// request logging. dev: console | production: file
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// mount api
app.use("/api/status", (req, res) => res.send("OK"));
app.use("/api/home", homeRoute);
app.use("/api/agents", agents);
app.use("/api/properties", properties);
app.use("/api", forms);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

export default app;
