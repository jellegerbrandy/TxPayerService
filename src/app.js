import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { payer } from "./api/routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 8010
const routes = [
  payer,
]

const requestHeaders = (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  next()
};

const appUse = (a, b) => (b ? app.use(a, b) : app.use(a));

const toUse = [ morgan("combined"), requestHeaders, ...routes ];
toUse.forEach(object => appUse(object));

const listen = () => console.log(`App listening on port # ${process.env.PORT || 8010}`)
app.listen(port, listen);
