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
import cookieParser from "cookie-parser";
import sessions from "express-session";
import { config } from "dotenv";
import insightRouter from "../api/routes/insight.route.js";

const app = express();
config();
// request logging. dev: console | production: file
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === "production";
const isCookieSecure = isProduction ? true : false;
const sameSiteAttribute = isProduction ? "None" : "Lax";

app.set("trust proxy", 1);
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: isCookieSecure,
      sameSite: sameSiteAttribute,
      httpOnly: true,
    },
    resave: false,
  })
);
app.use("/api/status", (req, res) => res.send("OK"));
app.use("/api/home", homeRoute);
app.use("/api/agents", agents);
app.use("/api/properties", properties);
app.use("/api", forms);
app.use("/api/insight", insightRouter);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

export default app;
