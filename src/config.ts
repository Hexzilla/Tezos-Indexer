export const Admin = {
  PrivateKey: process.env.ADMIN_PRIVATE_KEY || ''
}

export const Mainnet = {
  RPC: 'https://mainnet.api.tez.ie',
  Tezrun: '',
};

export const Testnet = {
  RPC: 'https://jakartanet.tezos.marigold.dev',
  Tezrun: 'KT1QqTCsHghND8gfeG55w2pWCskZpFFgjVCV',//'KT1DPVoEvys2XrRRiZzNQw7uBuQvb8Dmk1yo',
};
