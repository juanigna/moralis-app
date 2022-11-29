import "./styles.css"
import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react";
import AppContext from "../../../../contexts/AppContext";
import {ethers} from "ethers"

const Bubble = ({ name}) => {

    const [tickers, setTickers] = useState();
    const [sentimentText, setSentimentText] = useState();

    const {marketSentimentInstance} = useContext(AppContext)

    let color;
    if(tickers > 50){
        color = "green";
    }else{
        color = "red";
    }

    
    function getSentiment(votesUp, votesDown){
        const sentimentBn = votesUp.mul(1000).div(votesUp.add(votesDown));
        return ethers.utils.formatUnits(sentimentBn, 1);
    }   
    

    async function getMarketSentiment(ticker){
        if(!marketSentimentInstance){return null}
        console.log("Getting",ticker, marketSentimentInstance)
        const [votesUp, votesDown, totalVotes] = await marketSentimentInstance.getVotes(ticker);
        console.log([votesUp, votesDown]);
        if(totalVotes.gt(0)){
            const sentimentText = getSentiment(votesUp, votesDown);
            console.log("Sentiment text", sentimentText);
            return sentimentText;
        }
        return null;
    }


    async function getTheMarket(ticker){
        getMarketSentiment(ticker).then(result => {
            console.log("Resultado ticker:", result);
            setTickers(Number(result));
            console.log(tickers);
        })
    }

    getTheMarket(name);

    async function voteTicker(ticker, vote){
        if(!marketSentimentInstance) {return null}
        await marketSentimentInstance.vote(vote, ticker);
    }
    

    return(
        <>
        <div className="container d-flex justify-content-center flex-column aling-items-center position-relative mt-5">

            <div className="circle position-relative">
                <h1 className="lead text-black position-absolute bubble-text" style={{color:color}}>{tickers}%</h1>
                <div className="wave" style={{
                marginTop: `${100 - 30}%`,
                boxShadow: `0 0 20px ${color}`,
                backgroundColor: color}}>
                </div>
            </div>
            <div>
                <h3>{name}</h3>
            </div>
            <div className="vote-container mt-4 d-flex justify-content-center align-items-center">
                <Button variant="success" className="mx-2" onClick={() => voteTicker(name, true)}>Up</Button>
                <Button variant="danger" onClick={() => voteTicker(name,false)}>Down</Button>
            </div>
        </div>
        </>
    )
}

export default Bubble;