import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import dotenv from "dotenv";
dotenv.config();

const {
  NETWORK_URL, TARGET_CONTRACT_ADDRESS, TARGET_CONTRACT_METHOD, WALLET_MNEOMONIC
} = process.env

// Instanciate Web3
const provider = new HDWalletProvider(WALLET_MNEOMONIC, NETWORK_URL);
export const web3 = new Web3(provider);

export default web3