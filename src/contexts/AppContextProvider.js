import { useState } from "react"
import { getMarketSentiment, voteTicker } from "../plugins/wallet";
import AppContext from "./AppContext"

const AppContextProvider = ({children}) => {
    const [tickers, setTickers] = useState({});
    
    async function getTheMarket(ticker){
        getMarketSentiment(ticker).then(result => {
            console.log("Resultado ticker:", result);
            setTickers({...tickers, [ticker]: Number(result)});
            console.log(tickers);
        })
    }

    return(
        <AppContext.Provider value={{tickers, setTickers,getTheMarket, voteTicker}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;