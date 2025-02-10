"use client"
import React, { useEffect, useState } from 'react'
import "./page.css"
import Header from '@/components/common/Header'
import Link from "next/link";
import "../globals.css";
import "../responsive/pageresponsive.css"
import "./ticketresposive.css"
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { fetchGlobalState, fetchUserNfts, getProgram } from '@/utils/web3';
import { GlobalStateData, ParsedNft, ParsedNfts } from '@/utils/type';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { CLUSTER, getRandomState, SEED } from '@/utils/constant';
import Spinner from '@/components/common/Spinner';
import { getCampaignStatus, revealWarnMessage } from '@/utils/helper';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//@ts-expect-error issue with slider 
import Slider from "react-slick";
import getProvider from '@/utils/getProvider';
import signAndSendTransaction from '@/utils/signAndSendTx';

const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Tickets = () => {
    const router = useRouter();
    const anchorWallet = useAnchorWallet();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [userNfts, setUserNfts] = useState<ParsedNfts>();
    const [nfts, setNfts] = useState<ParsedNfts>();
    const [globalState, setGlobalState] = useState<GlobalStateData>()
    const [toggle, setToggle] = useState(true)


    const clickToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        getGlobalState()
        fetchNfts()
    }, [anchorWallet])

    const getGlobalState = () => {
        // @ts-expect-error null wallet for public fn
        fetchGlobalState(anchorWallet).then(result => setGlobalState(result))
    }
    const fetchNfts = () => {
        if (anchorWallet) {
            fetchUserNfts(anchorWallet).then((result) => {
                setUserNfts(result)
                setNfts(result)
            });
        }
    };

    const handleClaimClick = () => {
        router.push('/prizes');
    };

    const revealTicket = async (mintKey: string) => {
        try {
            setLoadingStates((prevState) => ({ ...prevState, [mintKey]: true }));
            if (!anchorWallet) {
                return toast.error("Please connect your wallet to proceed.");
            }

            if (globalState) {
                const _status = getCampaignStatus(globalState?.revealStart, globalState?.revealEnd)
                if (_status != "Ongoing") {
                    setLoadingStates((prevState) => ({ ...prevState, [mintKey]: false }));
                    return toast.warn(revealWarnMessage[_status])
                }
            }

            const program = getProgram(anchorWallet);
            const [globalStatePDA] = await PublicKey.findProgramAddress(
                [Buffer.from(SEED)],
                program.programId
            );

            const mint = new PublicKey(mintKey);
            const [userNftPDA] = await PublicKey.findProgramAddress(
                [mint.toBuffer(), anchorWallet.publicKey.toBuffer()],
                program.programId
            );

            //@ts-expect-error can have type issues
            const state = new PublicKey(getRandomState(globalState?.totalRevealed))
            const accounts = {
                globalState: globalStatePDA,
                userNfts: userNftPDA,
                state: state,
                payer: anchorWallet.publicKey,
                systemProgram: SystemProgram.programId,
            };

            const tx = await program.methods.reveal(mint).accounts(accounts).signers([]) //.rpc();
            const provider = getProvider()
            //@ts-expect-error type warning
            const transaction  = await signAndSendTransaction(provider, tx)
            notify(transaction);
            fetchNfts();
        } catch (error) {
            console.log(error, "+++");
            // @ts-expect-error can have type issues
            toast.error(error.message || "An error occurred.");
        } finally {
            setLoadingStates((prevState) => ({ ...prevState, [mintKey]: false }));
        }
    };

    const notify = (txhash: string) => {
        const url = `https://solscan.io/tx/${txhash}?cluster=${CLUSTER}`;
        toast.success(
            <div>
                <span style={{ display: "block" }}>Transaction processed!</span>
                <a
                    href={url}
                    style={{ color: 'blue', textDecoration: 'underline', textAlign: "center", display: "block" }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Transaction
                </a>
            </div>
        );
    };

    const setTab = (type: string) => {
        if (type == "Buy") {
            setUserNfts([])
        } else if (type == "Reveal") {
            const filteredNfts = nfts?.filter(item => item.revealedNumber == 0)
            setUserNfts(filteredNfts)
        } else if (type == "Claim") {
            const filteredNfts = nfts?.filter(item => item.revealedNumber != 0)
            setUserNfts(filteredNfts)
        }

    }

    const raised = globalState?.treasury_raised ? globalState?.totalNftsMinted * 555 : 0

    return (
        <>
            <Header />
            <div className="ticket-container">
                <div className="three-option-container">
                    <p>My own NFTS</p>
                    <div>
                        <a href="#" onClick={() => setTab("Buy")}>Buy</a>
                        <a href="#" onClick={() => setTab("Reveal")}>Reveal</a>
                        <a href="#" onClick={() => setTab("Claim")}>Claim</a>
                    </div>
                </div>

                <div className="ticket-bottom-container">
                    <div className="view-more-container1 tickte-main-container ticket-view-more-container jadoo">
                        <div className="small-box1">
                            <div>
                                <h4>Airdrop Campaign</h4>
                                <span>Draw: 1 / 1</span>
                            </div>
                            <div>
                                <h4>555 (USDC)</h4>
                                <span>Ticket Price</span>
                            </div>
                            <div>
                                <h4>{userNfts?.length} </h4>
                                <span>My NFTs</span>
                            </div>
                            <div>
                                <h4>{raised * 0.25}/ 1233210</h4>
                                <span>Prizes (USDC)</span>
                            </div>
                        </div>
                        <div className="small-box2">
                            <Link href="/view-more">
                                <button>View More</button>
                            </Link>
                            <span className="updown-arrow" onClick={() => clickToggle()}>
                                {
                                    toggle ?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#fff"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#fff"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>
                                }
                            </span>
                        </div>
                    </div>

                    <div className="nft-buy-container hidden-box-mbsize" >
                        <h3 className='nft-buy-heading'>My own NFTS</h3>
                        {toggle && userNfts?.length ? userNfts.map((item: ParsedNft) => (
                            <div key={item.mintKey} >
                                {item.revealedNumber === 0 ? (
                                    <div className="nft-buy-box">
                                        <div className="image-container">
                                            <img src="/imgone.png" alt="lottery-image" />
                                        </div>
                                        <button
                                            className="reveal"
                                            onClick={() => revealTicket(item.mintKey)}
                                            disabled={loadingStates[item.mintKey]}
                                        >
                                            {loadingStates[item.mintKey] ? <Spinner /> : "Reveal"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="nft-buy-box">
                                        <div className="image-container">
                                            <img src="/imgone.png" alt="lottery-image" />
                                            <span className="overlay-onimage ">#{item.revealedNumber}</span>
                                        </div>
                                        <button className="claim" onClick={handleClaimClick}>Claim</button>
                                    </div>
                                )}
                            </div>
                        )) : ""}
                    </div>

                    <div className='nft-buy-container22'>
                        <h3 className='nft-buy-heading22'>My own NFTS</h3>
                        <div>
                            <Slider {...settings}>
                                {toggle && userNfts?.length ? userNfts.map((item: ParsedNft) => (
                                    <div key={item.mintKey} >
                                        {item.revealedNumber === 0 ? (
                                            <div className="nft-buy-box22">
                                                <div className="image-container">
                                                    <img src="/imgone.png" alt="lottery-image" />
                                                </div>
                                                <button
                                                    className="reveal"
                                                    onClick={() => revealTicket(item.mintKey)}
                                                    disabled={loadingStates[item.mintKey]}
                                                >
                                                    {loadingStates[item.mintKey] ? <Spinner /> : "Reveal"}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="nft-buy-box">
                                                <div className="image-container">
                                                    <img src="/imgone.png" alt="lottery-image" />
                                                    <span className="overlay-onimage ">#{item.revealedNumber}</span>
                                                </div>
                                                <button className="claim" onClick={handleClaimClick}>Claim</button>
                                            </div>
                                        )}
                                    </div>
                                )) : ""}
                            </Slider>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Tickets;
