import express from "express";

import { payer } from "api/controllers";

const router = express.Router();

router.post("/pay", payer);

export default router;
