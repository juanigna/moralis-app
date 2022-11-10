import "./styles.css"
import Button from 'react-bootstrap/Button';


const Bubble = () => {
    return(
        <>
        <div className="container d-flex justify-content-center flex-column aling-items-center position-relative mt-5">

            <div className="circle">
                <div className="wave">
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