import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { serverless } from "serverless-http";
import "app-module-path/register";

import { routes } from "api/routes";

dotenv.config();

const app = express();

const requestHeaders = (_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  next();
};

const appUse = (a, b) => (b ? app.use(a, b) : app.use(a));

const toUse = [
  express.json(),
  morgan("combined"),
  requestHeaders,
  ...routes,
  express.urlencoded({ extended: false })
];
toUse.forEach(object => appUse(object));

export default app;
module.exports.handler = serverless(app);
