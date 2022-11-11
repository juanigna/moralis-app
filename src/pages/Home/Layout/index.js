import React from 'react'
import Bubble from '../components/Bubble'
import NavBar from '../components/Navbar';
import "./styles.css"
const bubbles = [
    {
        perc:50,
        ticker:"BTC"
    },
    {
        perc: 30,
        ticker:"ETH"
    },
    {
        perc:80,
        ticker:"DAI"
    },
];
const Home = () => {
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
                    bubbles.map(bubble => (
                        <Bubble perc={bubble.perc} name={bubble.ticker}/>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Home