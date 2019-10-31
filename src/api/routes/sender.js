import express from "express";

import { sender } from "api/controllers";

const router = express.Router();

router.post("/send-tx", sender);

export default router;
