import { Document, Schema, model } from "mongoose";

export interface Token extends Document {
  tokenId: string;
  name: string;
  symbol: string;
  decimals: string;
}

const TokenSchema = new Schema<Token>(
  {
    tokenId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    decimals: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TokenModel = model<Token>("Token", TokenSchema);
