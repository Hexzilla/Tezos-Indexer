import { Quest, QuestModel } from 'database/models/quest.model';

export const createOrUpdateQuestState = async (questInfo: Quest) => {
  let quest = await QuestModel.findOne({
    walletAddress: questInfo.walletAddress,
    questId: questInfo.questId,
  });
  console.log('quest', quest);

  if (quest) {
    quest.status = questInfo.status;
  } else {
    quest = new QuestModel(questInfo);
  }

  quest = await quest.save();
  return quest;
};
