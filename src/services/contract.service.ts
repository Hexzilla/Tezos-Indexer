import axios from 'axios';
import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Network, Contracts, Tokens, API } from '../constants';
import { bytes2Char, char2Bytes } from '@taquito/utils';
import { Mint } from 'database/models/mint.model';
import { TokenModel } from 'database/models/token.model';
import { batchCreateMints } from './mint.service';
import logger from 'utils/logger';

export interface MintDto {}

const Tezos = new TezosToolkit(Network.RPC);
Tezos.setProvider({
  signer: new InMemorySigner(Network.AdminPrivateKey),
});

export const getBalance = async (address: string) => {
  const balance = await Tezos.tz.getBalance(address);
  console.log('balance:', balance);

  const contract = await Tezos.contract.at(Contracts.PiXLtez);
  console.log('contract', contract);

  const storage: any = await contract.storage();
  console.log('storage', storage);

  const ledger = storage.ledger || storage.accounts;
  console.log('ledger', ledger);

  const tokenId = 0;
  const pixltez = await ledger.get({ 0: address, 1: tokenId });
  console.log('pixltez:', pixltez);

  return { balance, pixltez };
};

const updateMetadata = async (): Promise<any> => {
  const contract = await Tezos.contract.at(Contracts.PiXLtez);

  const data = MichelsonMap.fromLiteral({
    name: char2Bytes('PiXLtez'),
    decimals: char2Bytes('0'),
    symbol: char2Bytes('PXL'),
  });

  const op = await contract.methods.set_metadata(data).send();
  const result = await op.confirmation();
  console.log('Mint result:', result);
  return true;
};

export const airdropPixltez = async (addresses: string[], amount: number) => {
  console.log('airdropPixltez', addresses, amount);
  const contract = await Tezos.contract.at(Contracts.PiXLtez);

  const params = addresses.map((address) => {
    return {
      amount: (amount * 100).toString(),
      to_: address,
      token: {
        /*new: MichelsonMap.fromLiteral({
          name: char2Bytes('PiXLTez')
        })*/
        existing: Tokens.PiXLtez,
      },
    };
  });
  const op = await contract.methods.mint(params).send();
  const tx = await op.confirmation(1);
  console.log('Mint result:', tx);
  if (tx) {
    const items = addresses.map((address) => {
      return {
        tokenId: Tokens.PiXLtez,
        tokenName: 'Pixltez',
        address,
        amount,
      } as Mint;
    });
    await batchCreateMints(items);
    console.log('Inserted mint results:');
  }
  return true;
};

export const getToken = async (itemName: string) => {
  const token = await TokenModel.where({ name: itemName }).findOne();
  if (token) {
    return token;
  }

  const url = `${API.TZKTURL}/v1/bigmaps/${API.TokenMetadataID}/keys?active=true&offset=0&limit=100`;
  const response = await axios.get(url);
  if (response.status !== 200 || !response.data) {
    return null;
  }
  console.log('response.data', response.data);

  const tokens = response.data.map((item: any) => {
    const { token_id, token_info } = item.value;
    return {
      tokenId: token_id,
      name: bytes2Char(token_info.name),
      symbol: bytes2Char(token_info.symbol),
      decimals: bytes2Char(token_info.decimals),
    };
  });

  const models = tokens.map((item: any) => {
    return {
      updateOne: {
        filter: {
          tokenId: item.tokenId,
        },
        update: {
          $set: {
            ...item,
          },
        },
        upsert: true,
      },
    };
  });
  if (models && models.length > 0) {
    await TokenModel.bulkWrite(models);
  }

  const item = tokens.find((item: any) => item.name === itemName);
  if (item) {
    return item;
  }

  return null;
};

export const airdropPassToken = async (tokenId: number, addresses: string[], amount: number) => {
  const contract = await Tezos.contract.at(Contracts.DayPass);
  console.log('airdropPassToken', addresses, amount);

  const params = addresses.map((address) => {
    return {
      amount: amount.toString(),
      to_: address,
      token: {
        /*new: MichelsonMap.fromLiteral({
          name: char2Bytes('PiXLTez')
        })*/
        existing: tokenId,
      },
    };
  });
  const op = await contract.methods.mint(params).send();
  const result = await op.confirmation();
  console.log('airdrop result:', result);
  return true;
};

export const setBeneficiary = async (address: string) => {
  try {
    const contract = await Tezos.contract.at(Contracts.DayPass);
    logger.info(`setBeneficiary, address: ${address}`);

    const op = await contract.methods.set_beneficiary(address).send();
    const result = await op.confirmation();
    logger.info(`setBeneficiary result: ${result}`);
    return !!result;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export const setTokenPrices = async (tokens: any[]) => {
  try {
    const tokenNames = ['dayPass', 'specialPass', 'weeklyPass', 'yearlyPass'];
    const params = tokenNames
      .map((name) => {
        return tokens.find((i) => i.name === name)?.tezos || 0;
      })
      .map((tezos) => tezos * 1000000);
    logger.info(`setTokenPrices, params: ${params}`);

    const contract = await Tezos.contract.at(Contracts.DayPass);
    const op = await contract.methods
      .set_token_prices(...params)
      .send();
    const result = await op.confirmation();
    logger.info(`setTokenPrices result: ${result}`);
    return !!result;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export const mintItems = async (items: any[]) => {
  return Promise.resolve(true);
}