import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { getMarketSentiment } from '../../../plugins/wallet';
import Bubble from '../components/Bubble'
import NavBar from '../components/Navbar';
import "./styles.css"
const Home = () => {
    const [tickers, setTicker] = useState({});

    async function getTheMarket(ticker){
        getMarketSentiment(ticker).then(result => {
            console.log("Resultado ticker:", result);
            setTicker({...result, ITX: Number(result)});
            console.log(tickers);
        })
    }
  return (
    <>
        <header>
            <NavBar/>
        </header>
        <div className='home-container mt-5'>
            <h1>Simple investment Choice</h1>
            <h3>Don't know what to invest in? We have a solution!</h3>
            <div className='bubble-container'>
                {
                    <>
                        <Bubble perc={tickers["ITX"] ? tickers["ITX"] : "Nada aun" } name={"ITX"}/>
                        <Button onClick={() => getTheMarket("ITX")}>Sentiment</Button>
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default Home