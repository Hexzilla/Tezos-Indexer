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
  '/ledger/:owner/:tokenId',
  handler(({ params }) => contractService.getLedgerValue(params.owner, params.tokenId))
);

export const ExplorerRoutes: Router = router;
