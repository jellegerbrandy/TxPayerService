import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import dotenv from "dotenv";
dotenv.config();

const {
  NETWORK_URL,
  TARGET_CONTRACT_ADDRESS,
  TARGET_CONTRACT_METHOD,
  WALLET_MNEMONIC,
  RINKEBY,
  LOCAL
} = process.env;

const NETWORK = RINKEBY
  ? "https://rinkeby.infura.io/v3/aab5c86e538b43509008efff47d61162"
  : LOCAL
  ? "http://127.0.0.1:8545"
  : NETWORK_URL;

// Instanciate Web3
export const provider = new HDWalletProvider(WALLET_MNEMONIC, NETWORK, 0, 10);
export const web3 = new Web3(provider);
