import { ethers } from 'ethers'
import contractAbi from "../../data/contracts/MarketSentiment.json";
const {abi} = require("../../data/contracts/MarketSentiment.json");
console.log(abi)
const contractAddr = "0x6128C8e6dC774E73772811f6fA6533FCE5E8F346";

let ethProvider;
let ethSigner;
let ethAccount;
let marketSentimentInstance;

function connectWallet(){
    const connectPromise = window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            if(err === 4001){
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log("Please connect to Metamask");
            }else{
                console.log(err);
            }
        });
    console.log("connectPromise", connectPromise );
    return connectPromise;
}


window.ethereum.on("accountsChanged", handleAccountsChanged);

async function handleAccountsChanged(accounts){
    if(accounts.length == 0){
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

function getSentiment(votesUp, votesDown){
    const sentimentBn = votesUp.mul(1000).div(votesUp.add(votesDown));
    return ethers.utils.formatUnits(sentimentBn, 1);
}   

async function getMarketSentiment(ticker){
    console.log("Getting",ticker, marketSentimentInstance)
    if(!marketSentimentInstance) {return null}
    const [votesUp, votesDown, totalVotes] = await marketSentimentInstance.getVotes(ticker);
    console.log([votesUp, votesDown]);
    if(totalVotes.gt(0)){
        const sentimentText = getSentiment(votesUp, votesDown);
        console.log("Sentiment text", sentimentText);
        return sentimentText;
    }
    return null;

}

export{
    ethProvider,
    ethSigner,
    connectWallet,
    getMarketSentiment
}