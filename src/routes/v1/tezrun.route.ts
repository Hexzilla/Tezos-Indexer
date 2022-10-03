import { Router } from 'express';
import { body } from 'express-validator';
import { createHandler as handler, validate } from '../../utils/validator';
import * as tezrunService from '../../services/tezrun.service';

const router: Router = Router();

router.get(
  '/contract/:address',
  handler(({ params }) => tezrunService.getContract(params.address))
);

router.get(
  '/race/status',
  handler(() => tezrunService.getRaceState())
);

router.get(
  '/race/tickets/:address',
  handler(({ params }) => tezrunService.getTickets(params.address))
)

router.get(
  '/race/finish',
  handler(() => tezrunService.finishRace())
);

router.get(
  '/rewards/:address',
  handler(({ params }) => tezrunService.getRewards(params.address))
);

export const TezrunRoutes: Router = router;
