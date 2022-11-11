import "./styles.css"
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";


const Bubble = ({perc, color}) => {
    return(
        <>
        <div className="container d-flex justify-content-center flex-column aling-items-center position-relative mt-5">

            <div className="circle position-relative">
                <h1 className="lead text-black position-absolute bubble-text">{perc}%</h1>
                <div className="wave" style={{
                marginTop: `${100 - perc}%`,
                boxShadow: `0 0 20px ${color}`,
                backgroundColor: color}}>
                </div>
            </div>
            <div className="vote-container mt-4 d-flex gap-3 justify-content-center">
                <Button variant="success">Up</Button>
                <Button variant="danger">Down</Button>
            </div>
        </div>
        </>
    )
}

export default Bubble;