import express from 'express';
import Web3 from 'web3';

const router = express.Router();

const payer = async (request, res) => {
    const {
      NETWORK_URL, PROVIDER_ADDRESS, PROVIDER_PRIVATE_KEY,
      TARGET_CONTRACT_ADDRESS, TARGET_CONTRACT_METHOD
    } = process.env
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL));
        web3.eth.defaultAccount = PROVIDER_ADDRESS;
        const { defaultAccount, getBalance, accounts, sendSignedTransaction, getTransactionCount } = web3.eth;
        const { toWei, fromWei } = web3.utils;
        const AMOUNT_TO_SEND = toWei('10', 'ether');
        const senderBalanceInWei = await getBalance(defaultAccount);
        const balanceInEth = fromWei(senderBalanceInWei, 'ether');
        const nonce = await getTransactionCount(defaultAccount);
        console.log(`Balance available in address: ${balanceInEth} ETH`);
        console.log(`Approx. balance available in address after transaction: ${+balanceInEth - 10 - 1e-14} ETH`);
        const transactionObject = {
            to: request.params.recipient,
            value: AMOUNT_TO_SEND,
            gas: 21000,
            nonce
        }
        const signedTransaction = await accounts.signTransaction(transactionObject, PROVIDER_PRIVATE_KEY);
        console.log('Sending ether...');
        sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', hash => {
            console.log(`Transaction done. Hash of transaction: ${hash}`);
            res.send({ status: 200, message: 'Transaction done', hash });
        })
        .on('error', error => {
            console.log(`An error has occured: ${error}`);
            res.send({ status: 503, message: 'An error has occured', error });
        })
    } catch (error) {
        console.log(`An error has occured: ${error}`);
        res.send({ status: 503, message: `An error has occured: ${error}` })
    }
}

router.get('/pay/:recipient', payer);

export default router;
