import { Mint, MintModel } from "database/models/mint.model"

export const getMints = async () => {
  return await MintModel.find();
}

export const getMintById = async (id: string) => {
  return  await MintModel.findById(id);
}

export const createMint = async (item: Mint) => {
  const document = new MintModel(item);
  return await document.save();
}

export const batchCreateMints = async (items: Mint[]) => {
  const models = items.map((item: any) => {
    const document = new MintModel(item);
    return {
      insertOne: { document },
    };
  });
  await MintModel.bulkWrite(models);
  return models;
}

export const deleteMint = async (id: string) => {
  await MintModel.findByIdAndDelete(id);
  return { id };
}