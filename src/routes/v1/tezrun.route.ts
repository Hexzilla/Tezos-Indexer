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
  '/status/:address',
  handler(({ params }) => tezrunService.getGameStatus(params.address))
);

router.get(
  '/race/status',
  handler(() => tezrunService.getRaceState())
);

router.get(
  '/race/tickets/:address',
  handler(({ params }) => tezrunService.getTickets(params.address))
);

router.get(
  '/race/ready',
  handler(() => tezrunService.readyRace())
);

router.get(
  '/race/start',
  handler(() => tezrunService.startRace())
);

router.get(
  '/race/finish',
  handler(({ params }) => tezrunService.finishRace(params.winner))
);

router.get(
  '/rewards/:address',
  handler(({ params }) => tezrunService.getRewards(params.address))
);

export const TezrunRoutes: Router = router;
