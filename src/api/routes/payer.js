import express from 'express';

import { payer } from 'api/controllers';

const router = express.Router();

router.get('/pay/:recipient/:amount', payer);

export default router;
