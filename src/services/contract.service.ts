import { pool } from 'database';

export const getContract = async (address: string) => {
  const res = await pool.query(`SELECT * FROM "que_pasa"."contracts" WHERE address='${address}'`);
  if (!res.rows || !res.rows.length) {
    return {};
  }
  return res.rows[0];
};

export const getLedgerValue = async (address: string, tokenId: string) => {
  const res = await pool.query(
    `SELECT * 
      FROM "entrycoin"."storage.ledger_live" 
      WHERE idx_address='${address}' AND idx_nat=${tokenId}`
  );
  if (res.rows && res.rows.length) {
    const item = res.rows[0];
    return {
      key: {
        "0": address,
        "1": tokenId,
      },
      value: item.nat
    }
  }
  return {};
};
