import express from "express";

import { address } from "api/controllers";
import { checkWeb3Connection } from "api/web3";

const router = express.Router();

router.get("/address", checkWeb3Connection, address);

export default router;
