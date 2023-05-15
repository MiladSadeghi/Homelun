import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import routes from "../api/routes/index.js";
import { converter, notFound, handler } from "../api/middleware/error.js";

const app = express();

// request logging. dev: console | production: file
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api
app.use("/api", routes);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

export default app;
