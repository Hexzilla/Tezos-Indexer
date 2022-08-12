import { pool } from 'database';

export const getContract = async (address: string) => {
  const res = await pool.query(`SELECT * FROM "que_pasa"."contracts" WHERE address='${address}'`);
  console.log('res', res)
  if (!res.rows || !res.rows.length) {
    return {};
  }

  const contract = res.rows[0];
  
  
  return res.rows;
};

export const getBigmapValue = async (id: string, key: string) => {
  const res = await pool.query(`
    SELECT * 
      FROM "entrycoin"."storage.ledger_live" 
      WHERE 
        bigmap_id=70393 AND
        idx_address='tz1bxwduvRwBhq59FmThGKD5ceDFadr57JTq'
  `);
  await pool.end();
  console.log('res', res)
  if (res.rows) {
    
  }
  return res.rows;
};
