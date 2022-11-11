import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap';
import "./styles.css";

const WalletMetamask = () => {
    const [account, setAccount] = useState(null);
    const [userBalance, setUserBalance] = useState({
        balance: 0,
        loading: false,
    });

    const handleConnectWallet = () => {
        if (window.ethereum) {
            console.log('MetaMask Installed');
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    handleAccountChanged(result[0]);
                });
        } else {
            console.log('Install MetaMask!!!');
        }
    };

    const handleAccountChanged = (account) => {
        setAccount(account);
        getUserBalance(account.toString());
    };

    const getUserBalance = (address) => {
        setUserBalance({ ...userBalance, loading: true });
        window.ethereum
            .request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then((balance) => {
                setUserBalance({
                    balance: ethers.utils.formatEther(balance),
                    loading: false,
                });
            });
    };

    const reloadPage = () => {
        window.location.reload();
    };
    window.ethereum.on('accountsChanged', handleAccountChanged);

    window.ethereum.on('chainChanged', reloadPage);
    return (
        <div className="wallet-container d-flex justify-content-center align-items-center">
            <div className='mx-4'>
               {account ? <p className='address'>{account}</p>: null } 
            </div>
            <Button
                variant="warning"
                onClick={handleConnectWallet}
                disabled = {account ? true : false}
            >
                {account ? "Connected!" : "Connect!"}
            </Button>
            
        </div>
    );
};

export default WalletMetamask;