export const Admin = {
  PrivateKey: process.env.ADMIN_PRIVATE_KEY || '',
};

export const Mainnet = {
  RPC: 'https://mainnet.api.tez.ie',
  Tezrun: 'KT1Pn2u8gd9k5v37md7gKLbPxy9DwPzc2T4i',
    //'KT1SabQEuqzxrwp6caZyXPXpt98FhHoPB5NZ', //'KT1TK9GheViS3Z8hJSjZnBo7324rXnFtnYGC', //'KT1EEtxiV2qpGrQbG61gCB3gtVWiARxbEv1d',
};

export const Testnet = {
  RPC: 'https://jakartanet.tezos.marigold.dev',
  Tezrun: 'KT1QqTCsHghND8gfeG55w2pWCskZpFFgjVCV', //'KT1DPVoEvys2XrRRiZzNQw7uBuQvb8Dmk1yo',
};
