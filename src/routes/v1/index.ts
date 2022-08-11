import { Router } from 'express';
import { ContractRoutes } from './contract.route';
import { QuestRoutes } from './quest.route';

const router: Router = Router();

router.use('/contract', ContractRoutes);
router.use('/quest', QuestRoutes);

export const ApiRoutes: Router = router;
