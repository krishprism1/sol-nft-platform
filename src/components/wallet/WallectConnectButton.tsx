import "./wallet.css"
import { FC, useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnectButton: FC = () => {
    const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [navState, setNavState] = useState(true)
    const { connected } = useWallet();

    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        if (window.solana && window.solana.isPhantom) {
            setIsPhantomInstalled(true);
        } else {
            setIsPhantomInstalled(false);
        }
    }, []);

    function opennav() {
        setNavState(false)
        const nav = document.querySelector(".header-box2") as HTMLElement | null;
        if (nav) {
            nav.style.transform = "translateY(0px)";
        }
    }

    function closenav() {
        setNavState(true)
        const nav = document.querySelector(".header-box2") as HTMLElement | null;
        if (nav) {
            nav.style.transform = "translateY(-1000px)";
        }
    }

    return (
        <div className="connect-button">
            {isClient && <WalletMultiButton className="header-btn2">
                {
                    connected ? null : (
                        <>
                            {isPhantomInstalled ? (
                                <>
                                    <img
                                        src="/wallet.svg"
                                        alt="Select Wallet Icon"
                                        className="wallet-icon"
                                    />
                                    Select Wallet
                                </>
                            ) : (
                                "Select Wallet"
                            )}
                        </>
                    )
                }


            </WalletMultiButton>}
            <span className="closenav" onClick={() => navState ? opennav() : closenav()}>
                {
                    navState ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="40" fill="#FFF"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="40" fill="#FFF"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                }                
            </span>
        </div>
    );
};

export default WalletConnectButton;
