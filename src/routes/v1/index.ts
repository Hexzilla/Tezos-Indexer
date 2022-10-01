import { Router } from 'express';
import { TezrunRoutes } from './tezrun.route';

const router: Router = Router();

router.use('/tezrun', TezrunRoutes);

export const ApiRoutes: Router = router;
