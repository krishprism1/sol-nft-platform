"use client"
import React, { useEffect, useState } from 'react';
import "./page.css";
import Header from '@/components/common/Header';
import "../globals.css";
import "../responsive/pageresponsive.css";
import "./prizeresponsive.css";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { fetchallNfts } from '@/utils/web3';
import { formatWalletAddress } from '@/utils/helper';
import Spinner from '@/components/common/Spinner';

const src = "https://solana-nft-platform.vercel.app/_next/image?url=%2Ficons%2Fcopied-icon.png&w=32&q=75";

type Winner = {
    prize: string | number;
    owner: string;
    revealedNumber: number;
};

const ITEMS_PER_PAGE = 15;

const Prizes = () => {
    const anchorWallet = useAnchorWallet();
    const [winners, setWinners] = useState<Winner[] | null>(null);
    const [visibleItems, setVisibleItems] = useState<Winner[]>([]);
    const [page, setPage] = useState(1);
    const [copyStatus, setCopyStatus] = useState<null | number>(null);


    useEffect(() => {
        if (anchorWallet) {
            getAllNfts();
        }
    }, [anchorWallet]);

    useEffect(() => {
        // Update visible items based on the current page
        if (winners) {
            const newVisibleItems = winners.slice(0, page * ITEMS_PER_PAGE);
            setVisibleItems(newVisibleItems);
        }
    }, [page, winners]);

    const getAllNfts = async () => {
        // Fetch all winners
        //@ts-expect-error wallet warning
        const allWinners = await fetchallNfts(anchorWallet);
        setWinners(allWinners);
        setPage(1); // Reset page when new data is fetched
    };

    const handleViewMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleCopy = async (text: string, index: number) => {
        await navigator.clipboard.writeText(text);
        setCopyStatus(index);
        setTimeout(() => {
            setCopyStatus(null);
        }, 500);
    };

    return (
        <>
            <Header />
            <div className="prize-main-container">
                <h3>Prizes in USDC</h3>
                <div className="prizelist-box">
                    <table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Prize(USDC)</td>
                                <td>Address</td>
                                <td>Number</td>
                            </tr>
                        </thead>
                    </table>

                    {winners ? <div className="table-list">
                        <table>
                            {visibleItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.prize}</td>
                                    <td>
                                        {formatWalletAddress(item.owner)} <img src={src} onClick={() => handleCopy(item.owner, index)} alt="copy" />
                                        {copyStatus == index && <span style={{position: 'absolute', right: '-66%', top: "25%", fontSize: 14}}>copied</span>}
                                    </td>
                                    <td>#{item.revealedNumber}</td>
                                </tr>
                            ))}
                        </table>
                    </div> :
                        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Spinner />
                        </div>
                    }
                </div>

                {winners && visibleItems.length < winners.length && (
                    <button className="view-more-btn" onClick={handleViewMore}>
                        View More
                    </button>
                )}
            </div>
        </>
    );
};

export default Prizes;
