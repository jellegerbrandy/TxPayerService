import express from 'express';

import { balance } from '../controllers';

const router = express.Router();

router.get('/balance', balance);

export default router;
