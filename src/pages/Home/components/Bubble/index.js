import "./styles.css"
import Button from 'react-bootstrap/Button';
import { useContext, useEffect } from "react";
import AppContext from "../../../../contexts/AppContext";


const Bubble = ({perc, name ,getMarket}) => {
    let color;
    if(perc > 50){
        color = "green";
    }else{
        color = "red";
    }

    const {voteTicker} = useContext(AppContext);

    return(
        <>
        <div className="container d-flex justify-content-center flex-column aling-items-center position-relative mt-5">

            <div className="circle position-relative">
                <h1 className="lead text-black position-absolute bubble-text" style={{color:color}}>{perc}%</h1>
                <div className="wave" style={{
                marginTop: `${100 - perc}%`,
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
                <Button variant="success" onClick={() => getMarket(name)}>Get Sentiment</Button>
            </div>
        </div>
        </>
    )
}

export default Bubble;