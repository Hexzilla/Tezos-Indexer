import { Router } from 'express';
import { body } from 'express-validator';
import { createHandler as handler, validate } from 'utils/validator';
import * as questService from 'services/quest.service';

const router: Router = Router();

/**
 * @swagger
 * /quest/update:
 *   post:
 *     summary: Update a Wallet Quest Progress
 *     description: Post the walletAddress and a timestamp to this address to update a wallets quest progress
 *     parameters:
 *       - in: body
 *         name: walletAddress
 *         type: string
 *         required: true
 *         description: The wallet address being updated
 *       - in: body
 *         name: timestamp
 *         type: string
 *         format: date-time
 *         required: true
 *         description: The time this update is being applied
 *       - in: body
 *         name: status
 *         schema:
 *           type: string
 *           enum: [NOT_STARTED, STARTED, MIDPOINT, COMPLETED]
 *         required: true
 *         description: The state to set the quest to.
 *       - in: body
 *         name: questName
 *         schema:
 *           type: string
 *           enum: [Beets]
 *         required: true
 *         description: The name of the quest being updated
 *     responses:
 *       200:
 *         description: Successful Update
 *       400:
 *         description: Update Failed
 */
router.post(
  '/update',
  body('walletAddress').isString(),
  body('questId').isNumeric(),
  body('status').isString(),
  validate,
  handler(({ body }) => questService.createOrUpdateQuestState(body))
);

export const QuestRoutes: Router = router;
