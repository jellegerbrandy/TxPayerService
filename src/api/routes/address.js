import express from 'express';

import { address } from '../controllers';

const router = express.Router();

router.get('/address', address);

export default router;
