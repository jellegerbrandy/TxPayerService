import Web3 from 'web3';
import dotenv from "dotenv";
dotenv.config();

const {
  NETWORK_URL, PROVIDER_ADDRESS, PROVIDER_PRIVATE_KEY,
  TARGET_CONTRACT_ADDRESS, TARGET_CONTRACT_METHOD
} = process.env

// Instanciate Web3
export const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL));
web3.eth.defaultAccount = PROVIDER_ADDRESS;

// Web Eth
export const { defaultAccount, getBalance, accounts, sendSignedTransaction, getTransactionCount } = web3.eth;

// Web3 Utils
export const { toWei, fromWei } = web3.utils;

export default web3