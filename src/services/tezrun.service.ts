import { pool } from 'database';

const schema_name = 'tezrun';

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
  const res = await pool.query(`SELECT * FROM "${schema_name}"."storage_live"`);
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

export const getRewards = async (address: string) => {
  const res = await pool.query(
    `SELECT * 
      FROM "${schema_name}"."storage.rewards_live" 
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
