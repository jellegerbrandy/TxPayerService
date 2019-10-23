import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import payer from "./payer";
dotenv.config();

const app = express();

const requestHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next()
};

const appUse = (a, b) => (b ? app.use(a, b) : app.use(a));

const toUse = [ morgan("combined"), requestHeaders, payer ];

toUse.forEach(object => appUse(object));

app.listen(process.env.PORT || 8010, () =>
  console.log(`App listening on port # ${process.env.PORT || 8010}`)
);