import { Router } from 'express';
import { body } from 'express-validator';
import { createHandler as handler, validate } from 'utils/validator';
import * as contractService from 'services/contract.service';
import * as ledgerService from 'services/ledger.service';

const router: Router = Router();

router.get(
  '/balance/:address',
  handler(({ params }) => contractService.getBalance(params.address))
);

router.post(
  '/airdrop/pixltez',
  body('addresses').isArray().notEmpty(),
  body('amount').isNumeric(),
  validate,
  handler(({ body }) => contractService.airdropPixltez(body.addresses, body.amount))
);

router.post(
  '/mintItems',
  body('items').isArray(),
  handler(({ body }) => contractService.mintItems(body.items))
);

router.post(
  '/token',
  body('name').isString(),
  handler(({ body }) => contractService.getToken(body.name))
);

router.get(
  '/ledger/cache/:contract',
  handler(({ params }) => ledgerService.updateLedgerKeys(params.contract))
);

router.get(
  '/ledger/keys/:contract/:address',
  handler(({ params }) =>
    ledgerService.getLedgerKeys(params.contract, params.address)
  )
);

export const ContractRoutes: Router = router;
