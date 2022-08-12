import { Router } from 'express';
import { ExplorerRoutes } from './explorer.route';

const router: Router = Router();

router.use('/explorer', ExplorerRoutes);

export const ApiRoutes: Router = router;
