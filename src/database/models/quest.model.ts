import { Document, Schema, model } from 'mongoose'

export enum QuestState {
	NOT_STARTED = 'NOT_STARTED',
	STARTED = 'STARTED',
	MIDPOINT = 'MIDPOINT',
	COMPLETED = 'COMPLETED',
}

export interface Quest extends Document {
	walletAddress: string;
	questId: number;
	status: QuestState;
}
  
const QuestSchema = new Schema<Quest>({
	walletAddress: {
			type: String,
			required: true,
	},
	questId: {
		type: Number,
		required: true
},
	status: {
			type: String,
			required: true
	}
},
{
  timestamps: true 
})

export const QuestModel = model<Quest>('Quest', QuestSchema);
