import React, { useContext } from 'react'
import AppContext from '../../../contexts/AppContext';
import Bubble from '../components/Bubble'
import NavBar from '../components/Navbar';
import "./styles.css"
const Home = () => {
    const {tickers} = useContext(AppContext);

   
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
                        <Bubble name={"ITX"} />                        
                        <Bubble name={"BTC"} />                        
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default Home