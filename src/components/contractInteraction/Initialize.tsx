import React, { useState } from 'react'
import Spinner from '../common/Spinner'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { ADMIN_ACCOUNT, SEED, TREASURY_ACCOUNT } from "@/utils/constant";
import { getProgram } from '@/utils/web3'


const Initialize = () => {
    const anchorWallet = useAnchorWallet();
    const [load, setLoad] = useState(false)


    const initialize = async () => {
        try {
            setLoad(true)
            if (!anchorWallet) {
                setLoad(false)
                return toast.error("Please connect your wallet to proceed.");
            }

            const program = getProgram(anchorWallet)
            const [globalStatePDA] = await PublicKey.findProgramAddress(
                [Buffer.from(SEED)],
                program.programId
            );
            
            const adminSolAccount = new PublicKey(ADMIN_ACCOUNT);
            const treasuryAccount = new PublicKey(TREASURY_ACCOUNT);

            const accounts = {
                globalState: globalStatePDA,
                admin: anchorWallet.publicKey,
                adminSolAccount: adminSolAccount,
                treasuryAccount: treasuryAccount,
                systemProgram: SystemProgram.programId,
            }

            const MAX_NFTS = 8888;
            const PURCHASE_START = 1737792935; // Current time in seconds
            const PURCHASE_END = PURCHASE_START + 60 * 24* 3600; // 1 hour later
            const REVEAL_START = PURCHASE_END; // 10 minutes after purchase ends
            const REVEAL_END = REVEAL_START + 100 * 24 * 3600;  // 10 minutes

            await program.methods
                .initialize(
                    new anchor.BN(MAX_NFTS),
                    new anchor.BN(PURCHASE_START),
                    new anchor.BN(PURCHASE_END),
                    new anchor.BN(REVEAL_START),
                    new anchor.BN(REVEAL_END))
                .accounts(accounts)
                .signers([])
                .rpc();

            toast.success("contract initialized successfully!")
            setLoad(false)
        } catch (error) {
            console.log(error, "+++")
            setLoad(false)
            // @ts-expect-error can have type issues
            toast.error(error);
        }
    }

    return (
        <>
            <button className='popup-btn' onClick={() => initialize()}>{load ? <Spinner /> : "initialize"}</button>
        </>
    )
}

export default Initialize
