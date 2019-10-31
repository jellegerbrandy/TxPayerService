import express from "express";

import { balance } from "api/controllers";
import { checkWeb3Connection } from "api/web3";

const router = express.Router();

router.get("/balance", checkWeb3Connection, balance);

export default router;
