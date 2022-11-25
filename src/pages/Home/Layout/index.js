import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import AppContext from '../../../contexts/AppContext';
import Bubble from '../components/Bubble'
import NavBar from '../components/Navbar';
import "./styles.css"
const Home = () => {
    const {tickers,getTheMarket} = useContext(AppContext);

   
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
                        <Bubble perc={tickers["ITX"] ? tickers["ITX"] : "Nada aun" } name={"ITX"} getMarket={getTheMarket}/>                        
                        <Bubble perc={tickers["BTC"] ? tickers["BTC"] : "Nada aun" } name={"BTC"} getMarket={getTheMarket}/>                        
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default Home