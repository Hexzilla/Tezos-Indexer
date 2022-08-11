import { Document, Schema, model } from "mongoose";

export interface LedgerKey {
  address: string;
  nat: string;
}

export interface Ledger extends Document {
  ledgerId: number;
  active: boolean;
  hash: string;
  contract: string;
  key: LedgerKey;
  lastLevel: number;
  updates: number;
  value: string;
}

const LedgerSchema = new Schema<Ledger>(
  {
    ledgerId: {
      type: Number,
      unique: true,
      required: true,
      index: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
    hash: {
      type: String,
      required: false,
    },
    contract: {
      type: String,
      required: true,
    },
    key: {
      address: {
        type: String,
        required: true,
      },
      nat: {
        type: String,
        required: true,
      },
    },
    lastLevel: {
      type: Number,
      required: false,
    },
    updates: {
      type: Number,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

export const LedgerModel = model<Ledger>("Ledger", LedgerSchema);
