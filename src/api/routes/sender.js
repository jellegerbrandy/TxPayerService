import express from "express";

import { sender } from "../controllers";
import {
  checkWeb3Connection,
  checkAccountBalance,
  tryContractMethod
} from "../web3";

const router = express.Router();

router.post(
  "/send-tx",
  checkWeb3Connection,
  checkAccountBalance,
  tryContractMethod,
  sender
);

export default router;
