import "./styles.css"
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";


const Bubble = ({perc, color}) => {
    return(
        <>
        <div className="container d-flex justify-content-center flex-column aling-items-center position-relative mt-5">

            <div className="circle">
                <div className="wave" style={{
                marginTop: `${100 - perc}%`,
                boxShadow: `0 0 20px ${color}`,
                backgroundColor: color}}>
                </div>
            </div>
            <div className="vote-container mt-4">
                <Button variant="success">Up</Button>
                <Button variant="danger">Down</Button>
            </div>
        </div>
        </>
    )
}

export default Bubble;