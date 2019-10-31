import express from "express";

import { sender } from "api/controllers";
import { checkWeb3Connection } from "api/web3";

const router = express.Router();

router.post("/send-tx", checkWeb3Connection, sender);

export default router;
