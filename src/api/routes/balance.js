import express from 'express';

import { balance } from 'api/controllers';

const router = express.Router();

router.get('/balance', balance);

export default router;
