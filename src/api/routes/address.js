import express from 'express';

import { address } from 'api/controllers';

const router = express.Router();

router.get('/address', address);

export default router;
