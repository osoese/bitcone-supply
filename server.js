// 2023 osoese quick script for BITCONE!! CONE!! 2663!!
const express = require('express')
const app = express()
const port = 2663;

const Web3 = require("web3");
const url = 'https://polygon-rpc.com';
const web3 = new Web3(url);

const balanceOfABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];
// original source copied from https://community.infura.io/t/web3-js-how-to-retrieve-the-balance-of-an-erc-20-token/5232
// BITCONE!!
const tokenContract = "0xbA777aE3a3C91fCD83EF85bfe65410592Bdd0f7c";
// MODS COMMUNITY WALLET!!
const tokenHolder = "0x5af0b2d05e82676BDe59BB95C861fd4688B9D805";

// Define the ERC-20 token contract
const contract = new web3.eth.Contract(balanceOfABI, tokenContract);

async function getTokenBalance() {
    // Execute balanceOf() to retrieve the token balance
    const result = await contract.methods.balanceOf(tokenHolder).call();

    // Convert the value from Wei to Ether
    const formattedResult = web3.utils.fromWei(result, "ether");

    console.log(formattedResult);
    return formattedResult;
}
// end original source copied from https://community.infura.io/t/web3-js-how-to-retrieve-the-balance-of-an-erc-20-token/5232

app.get('/', (req, res) => {
    res.send('CONE!!!!!')
});

app.get('/totalsupply', (req, res) => {
    res.send('608000000000')
});

app.get('/circulatingsupply', async (req, res) => {
    const balance = await getTokenBalance();
    // const wallet = web3.utils.toWei(balance, 'ether');
    console.log({
        balance,
    })
    res.send(`${608000000000 - Number(balance)}`);
});

app.get('/kill', async () => {
    console.log(`kill command issued`);
    process.exit();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});