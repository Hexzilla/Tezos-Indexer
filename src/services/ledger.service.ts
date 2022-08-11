import axios from 'axios';
import { LedgerModel } from 'database/models/ledger.model';
import { API } from '../constants';

const getStorage = async (contract: string): Promise<any> => {
  const url = `${API.TZKTURL}/v1/contracts/${contract}/storage`;
  const response = await axios.get(url);
  console.log('getStorage', response.status, response.data);
  if (response.status === 200) {
    return response.data;	
  }
  return null;
}

const getLedger = async (ledger: string, offset: number, limit: number): Promise<any> => {
  const url = `${API.TZKTURL}/v1/bigmaps/${ledger}/keys?active=true&offset=${offset}&limit=${limit}`;
  const response = await axios.get(url);
  console.log('getLedger', response.status);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export const updateLedgerKeys = async (contract: string): Promise<any> => {
  const storage = await getStorage(contract);
  console.log("storage", storage.ledger);

  let offset = 0;
  while (true) {
    const ledgerKeys = await getLedger(storage.ledger, offset, 50);
    console.log("ledgerKeys", ledgerKeys);
    if (ledgerKeys.length <= 0) {
      break;
    }
    offset += ledgerKeys.length;

    /*const models = ledgerKeys.map((key: any) => new LedgerModel(key)).map((model: Ledger) => {
      return model.save()
    });
    await Promise.all(models);*/

    const models = ledgerKeys.map((key: any) => ({
      updateOne: {
        filter: {
          ledgerId: key.id,
        },
        update: {
          $set: {
            ...key,
            ledgerId: key.id,
            contract: contract,
          },
        },
        upsert: true
      }
    }))

    await LedgerModel.bulkWrite(models);
	}
  return true;
}

export const getLedgerKeys = async(contract: string, address: string): Promise<any> => {
  await updateLedgerKeys(contract);

  return await LedgerModel.find({
    "contract": contract,
    "value": address
  })
}
