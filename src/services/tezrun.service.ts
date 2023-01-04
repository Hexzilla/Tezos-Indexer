import axios from 'axios';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import * as Config from '../config';
import { pool } from '../database';

const SCHEMA_NAME = 'tezrun';

const Network = Config.Mainnet;

const Tezos = new TezosToolkit(Network.RPC);
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

export const getStorage = () => {
  const url = `https://api.tzstats.com/explorer/contract/${Config.Mainnet.Tezrun}/storage`;
  return axios.get(url).then((res: any) => {
    return res.data;
  });
};

export const getRaceState = async () => {
  /*const res = await pool.query(`SELECT * FROM "${SCHEMA_NAME}"."storage_live"`);
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
  return {};*/
  return getStorage().then((storage) => {
    const value = storage.value;
    return {
      admin: value.admin,
      paused: value.paused,
      race_id: value.race_id,
      ready_time: value.ready_time,
      start_time: value.start_time,
      status: value.status,
      winner: value.winner,
    };
  });
};

export const getTickets = async (address: string) => {
  const res = await pool.query(
    `SELECT * 
      FROM "${SCHEMA_NAME}"."storage.tickets_live" 
      WHERE address='${address}'`
  );
  return res.rows;
};

export const getGameStatus = async (address: string) => {
  const race = await getRaceState();
  const tickets = await getTickets(address);
  return {
    race,
    tickets,
  };
};

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
      tezos: Number(item.tezos),
      tokens: Number(item.tokens),
    };
  }
  return {};
};

export const readyRace = async () => {
  try {
    console.log('ready_race_call', Network.Tezrun);
    const contract = await Tezos.contract.at(Network.Tezrun);
    const op = await contract.methods.ready_race().send();
    console.log('ready_race', op?.hash);
    return op.confirmation();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const startRace = async () => {
  try {
    console.log('start_race_call');
    const contract = await Tezos.contract.at(Network.Tezrun);
    const op = await contract.methods.start_race(0).send();
    console.log('start_race', op?.hash);
    return op.confirmation();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const finishRace = async (winner: string | undefined = undefined) => {
  try {
    console.log('finish_race_call, winner from param', winner);
    const winnerId = winner
      ? Number(winner)
      : Math.floor(1 + (Math.random() % 6));
    console.log('finish_race_call, winner=', winnerId);
    const contract = await Tezos.contract.at(Network.Tezrun);
    const op = await contract.methods.finish_race(winnerId).send();
    console.log('finish_race', op?.hash);
    return op.confirmation();
  } catch (e) {
    console.error(e);
    return null;
  }
};
