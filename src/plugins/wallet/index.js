import { ethers } from 'ethers'
const {abi} = require("../../data/contracts/MarketSentiment.json");
console.log(abi)
const contractAddr = "0x6128C8e6dC774E73772811f6fA6533FCE5E8F346";


window.ethereum.on("accountsChanged", handleAccountsChanged);

async function handleAccountsChanged(accounts){
    if(accounts.length === 0){
        console.log("Please connect to Metamask");
        return false;
    }else{
        ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        ethAccount = accounts[0];
        ethSigner = ethProvider.getSigner();
        marketSentimentInstance = new ethers.Contract(contractAddr, abi, ethSigner);
        console.log("Instancia",marketSentimentInstance);
        window.ethProvider = ethProvider;
        window.ethSigner = ethSigner;
        return{
            account: ethAccount,
            network: await ethProvider.getNetwork
        }
    }
}

