import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import { routes } from "api/routes";

dotenv.config();

const app = express();

const requestHeaders = (_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  next()
};

const appUse = (a, b) => (b ? app.use(a, b) : app.use(a));

const toUse = [ morgan("combined"), requestHeaders, ...routes ];
toUse.forEach(object => appUse(object));

export default app;
