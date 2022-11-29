import { useContext, useState } from 'react';   
import { Button } from 'react-bootstrap';
import "./styles.css";
import AppContext from '../../../../contexts/AppContext';

const WalletMetamask = () => {
    
    const {connectWallet, account, isConnected} = useContext(AppContext)
    return (
        <div className="wallet-container d-flex justify-content-center align-items-center">
            <div className='mx-4'>
                 {account ? <p className='address'>{account}</p>: null } 
            </div>
            <Button
                variant="warning"
                onClick={connectWallet}
                disabled={!isConnected ? false : true}
            >
                {isConnected ? "Connected!" : "Connect!"}
            </Button>
            
        </div>
    );
};

export default WalletMetamask;