import React, { useState } from 'react';
import Spinner from '../common/Spinner';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import * as anchor from "@coral-xyz/anchor";
// import { PublicKey, Transaction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { SEED } from "@/utils/constant";
import { getProgram } from '@/utils/web3';
// import getProvider from '@/utils/getProvider';
// import signAndSendTransaction from '@/utils/signAndSendTx';

const UpdateTime = () => {
    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();
    const [load, setLoad] = useState(false);

    const updateTime = async () => {
        try {
            setLoad(true);
            if (!anchorWallet) {
                setLoad(false);
                return toast.error("Please connect your wallet to proceed.");
            }

            const program = getProgram(anchorWallet);
            const [globalStatePDA] = await PublicKey.findProgramAddress(
                [Buffer.from(SEED)],
                program.programId
            );

            const accounts = {
                globalState: globalStatePDA,
                admin: anchorWallet.publicKey,
            };

            const PURCHASE_START = 1739034000; // Current time in seconds
            const PURCHASE_END = PURCHASE_START + 60 * 24* 3600; // 1 hour later
            const REVEAL_START = PURCHASE_END; // 10 minutes after purchase ends
            const REVEAL_END = REVEAL_START + 100 * 24 * 3600;  // 10 minutes

            const tx = await program.methods
                .setPeriods(
                    new anchor.BN(PURCHASE_START),
                    new anchor.BN(PURCHASE_END),
                    new anchor.BN(REVEAL_START),
                    new anchor.BN(REVEAL_END)
                )
                .accounts(accounts)
                .transaction(); // Get transaction object

            tx.feePayer = anchorWallet.publicKey;
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

            // Sign and send transaction
            const signedTx = await anchorWallet.signTransaction(tx);
            const txId = await connection.sendRawTransaction(signedTx.serialize());

            // // Confirm transaction
            await connection.confirmTransaction(txId, "confirmed");

            // const provider = getProvider()
            // const signature = await signAndSendTransaction(provider, tx);


            toast.success(`Transaction successful!`);
        } catch (error) {
            console.error("Transaction failed:", error);
        } finally {
            setLoad(false);
        }
    };

    return (
        <>
            <button className='popup-btn' onClick={() => updateTime()}>
                {load ? <Spinner /> : "Update Time"}
            </button>
        </>
    );
};

export default UpdateTime;
