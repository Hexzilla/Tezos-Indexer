import { Router } from 'express';
import { body } from 'express-validator';
import { createHandler as handler, validate } from 'utils/validator';
import * as contractService from 'services/contract.service';

const router: Router = Router();

router.get(
  '/contract/:address',
  handler(({ params }) => contractService.getContract(params.address))
);

router.get(
  '/bigmap/:id/:key',
  handler(({ params }) => contractService.getBigmapValue(params.id, params.key))
);

export const ExplorerRoutes: Router = router;
