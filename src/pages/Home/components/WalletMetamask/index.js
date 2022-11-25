import { useState } from 'react';
import { Button } from 'react-bootstrap';
import "./styles.css";
import { connectWallet } from '../../../../plugins/wallet';

const WalletMetamask = () => {
    const [isConnected, setThisIsConnected] = useState(false);
    const [account, setAccount] = useState(null);

    async function connectWEB3(){
        connectWallet().then(connectionResult => {
            console.log(connectionResult);
            setThisIsConnected(!!connectionResult);
            setAccount(connectionResult.account);
        })
    }
    return (
        <div className="wallet-container d-flex justify-content-center align-items-center">
            <div className='mx-4'>
                 {account ? <p className='address'>{account}</p>: null } 
            </div>
            <Button
                variant="warning"
                onClick={connectWEB3}
                disabled={!isConnected ? false : true}
            >
                {isConnected ? "Connected!" : "Connect!"}
            </Button>
            
        </div>
    );
};

export default WalletMetamask;