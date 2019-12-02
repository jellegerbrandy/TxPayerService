import express from "express";

import { balance } from "../controllers";
import { checkWeb3Connection } from "../web3";

const router = express.Router();

router.get("/balance", checkWeb3Connection, balance);

export default router;
