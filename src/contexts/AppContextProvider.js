import { useEffect, useState } from "react"
import { ethers } from 'ethers'
import AppContext from "./AppContext"
const { abi } = require('../data/contracts/MarketSentiment.json');
const contractAddr = "0x6128C8e6dC774E73772811f6fA6533FCE5E8F346";

let ethAccount, ethProvider, ethSigner, network;
let marketInstance = new ethers.Contract(contractAddr,
    abi)
const AppContextProvider = ({children}) => {
    const [tickers, setTickers] = useState({});
    const [marketSentimentInstance, setMarketSentimentInstance] = useState(null);
    const [actualNetwork, setActualNetwork] = useState(null);
    const [account, setAccount] = useState("");
    const [isConnected, setIsConnected] = useState(false)

   
    
    useEffect(() => {
        async function main (){
            ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            ethSigner = ethProvider.getSigner();
            marketInstance = new ethers.Contract(contractAddr, abi, ethSigner);
            setMarketSentimentInstance(marketInstance);
            network = await ethProvider.getNetwork();
            setActualNetwork(network);
            console.log("Instancia",marketInstance);
            window.ethProvider = ethProvider;
            window.ethSigner = ethSigner;
        }
        main();

        if(actualNetwork !== "80001"){
            try{
                const {ethereum} = window;

                ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x13881"}]});
                network = ethProvider.getNetwork();
                setActualNetwork(actualNetwork.chainId);

            }catch(err){
                if(err === "4092"){
                    window.ethereum.request({method: "wallet_addEthereumChain", params:[
                        {
                            chainId: "0x13881",
                            rpcUrl: "https://rpc-mumbai.maticvigil.com",
                                chainName: "Polygon Testnet Mumbai",
                                nativeCurrency: {
                                    name: "tMATIC",
                                    symbol: "tMATIC", // 2-6 characters long
                                    decimals: 18,
                                },
                        }
                    ]});
                }
            }
        }
    },[])

    async function connectWallet(){
        const {ethereum} = window;
        const accounts =  await ethereum.request({method: "eth_requestAccounts"})
        const account = ethers.utils.getAddress(accounts[0]);
        console.log(accounts)
        setAccount(account);
        setIsConnected(!isConnected);
        accountsChanged(accounts);
    }


    window.ethereum.on("accountsChanged", accountsChanged);

    async function accountsChanged (accounts){
       if(accounts.length === 0){
         console.log("Please connect to metamask");
         return;
       }else{
        ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        ethAccount = accounts[0]
        ethSigner = ethProvider.getSigner();
        marketInstance = new ethers.Contract(contractAddr, abi, ethSigner); 
        window.ethProvider = ethProvider;
        window.ethSigner = ethSigner;
        setAccount(ethAccount);
        setIsConnected(!isConnected)
        network = await ethProvider.getNetwork();
        setActualNetwork(network.chainId);
        return{
            account: ethAccount,
            network: await ethProvider.getNetwork()
        }
       }
       
    }





    return(
        <AppContext.Provider value={{ marketSentimentInstance,connectWallet,account, isConnected}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;