import { Document, Schema, model } from "mongoose";

export interface Mint extends Document {
  tokenId: number;
  tokenName: string;
  address: string;
  amount: number;
}

const MintSchema = new Schema<Mint>(
  {
    tokenId: {
      type: Number,
      required: true,
    },
    tokenName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MintModel = model<Mint>("Mint", MintSchema);
