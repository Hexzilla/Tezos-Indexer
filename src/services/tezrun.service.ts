import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import * as Config from '../config';
import { pool } from '../database';

const SCHEMA_NAME = 'tezrun';

const Tezos = new TezosToolkit(Config.Testnet.RPC);
Tezos.setProvider({
  signer: new InMemorySigner(Config.Admin.PrivateKey),
});

export const getContract = async (address: string) => {
  const res = await pool.query(
    `SELECT * FROM "que_pasa"."contracts" WHERE address='${address}'`
  );
  if (!res.rows || !res.rows.length) {
    return {};
  }
  return res.rows[0];
};

export const getRaceState = async () => {
  const res = await pool.query(`SELECT * FROM "${SCHEMA_NAME}"."storage_live"`);
  if (res.rows && res.rows.length) {
    const item = res.rows[0];
    return {
      admin: item.admin_admin,
      paused: item.admin_paused,
      race_id: item.race_id,
      ready_time: item.ready_time,
      start_time: item.start_time,
      status: item.status,
      winner: item.winner,
    };
  }
  return {};
};

export const getTickets = async (address: string) => {
  const res = await pool.query(
    `SELECT * 
      FROM "${SCHEMA_NAME}"."storage.bets_live" 
      WHERE address='${address}'`
  );
  return res.rows;
}

export const getRewards = async (address: string) => {
  const res = await pool.query(
    `SELECT * 
      FROM "${SCHEMA_NAME}"."storage.rewards_live" 
      WHERE idx_address='${address}'`
  );
  if (res.rows && res.rows.length) {
    const item = res.rows[0];
    return {
      address,
      mutez: item.mutez,
    };
  }
  return {};
};

export const readyRace = async () => {
  try {
    console.log('ready_race_call')
    const contract = await Tezos.contract.at(Config.Testnet.Tezrun);
    const op = await contract.methods.ready_race(300).send();
    console.log('ready_race', op?.hash)
    return op.confirmation();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const startRace = async () => {
  try {
    console.log('start_race_call')
    const contract = await Tezos.contract.at(Config.Testnet.Tezrun);
    const op = await contract.methods.start_race(0).send();
    console.log('start_race', op?.hash)
    return op.confirmation();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const finishRace = async () => {
  try {
    const winner = 1 + Math.random() % 5;
    console.log('finish_race_call, winner=', winner)
    const contract = await Tezos.contract.at(Config.Testnet.Tezrun);
    const op = await contract.methods.finish_race(winner).send();
    console.log('finish_race', op?.hash)
    return op.confirmation();
  } catch (e) {
    console.error(e);
    return null;
  }
}
