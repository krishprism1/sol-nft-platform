import React, { useState } from 'react'
import Spinner from './Spinner'
import { getCampaignStatus, warningMessage } from '@/utils/helper'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { GlobalStateData } from '@/utils/type'
import { toast } from 'react-toastify'
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createInitializeMintInstruction,
    createAssociatedTokenAccountInstruction,
    // @ts-expect-error spl-token instantiation can have type issues
} from "@solana/spl-token";
import { ADMIN_ACCOUNT, CLUSTER, SEED, TREASURY_ACCOUNT } from "@/utils/constant";
import { getProgram } from '@/utils/web3'
import signAndSendTransaction from '@/utils/signAndSendTx'
import getProvider from '@/utils/getProvider'

interface BuyProps {
    globalState: GlobalStateData | undefined;
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateData | undefined>>;
}

const Buy: React.FC<BuyProps> = ({ globalState, setGlobalState }) => {
    const anchorWallet = useAnchorWallet();
    const [load, setLoad] = useState(false)

    const getGlobalState = async () => {
        // @ts-expect-error null wallet for public fn
        fetchGlobalState(anchorWallet).then(result => setGlobalState(result))
      }

    const buyTicket = async () => {
        try {
            setLoad(true)
            if (!anchorWallet) {
                setLoad(false)
                return toast.error("Please connect your wallet to proceed.");
            }

            if (globalState) {
                const _status = getCampaignStatus(globalState?.purchaseStart, globalState?.purchaseEnd)
                if (_status != "Ongoing") {
                    setLoad(false)
                    return toast.warn(warningMessage[_status])
                }
            }
            const program = getProgram(anchorWallet)
            const [globalStatePDA] = await PublicKey.findProgramAddress(
                [Buffer.from(SEED)],
                program.programId
            );

            const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();
            const mintAccount = mintKeypair.publicKey;
            const associateTokenAccount = await anchor.utils.token.associatedAddress({
                mint: mintAccount,
                owner: anchorWallet.publicKey
            })
            const lamports: number = await program.provider.connection.getMinimumBalanceForRentExemption(MINT_SIZE);
            const mint_tx = new anchor.web3.Transaction().add(
                anchor.web3.SystemProgram.createAccount({
                    fromPubkey: anchorWallet.publicKey,
                    newAccountPubkey: mintAccount,
                    space: MINT_SIZE,
                    programId: TOKEN_PROGRAM_ID,
                    lamports,
                }),
                createInitializeMintInstruction(mintAccount, 0, anchorWallet.publicKey, anchorWallet.publicKey),
                createAssociatedTokenAccountInstruction(anchorWallet.publicKey, associateTokenAccount, anchorWallet.publicKey, mintAccount),
            );

            // @ts-expect-error Program instantiation can have type issues
            await program.provider.sendAndConfirm(mint_tx, [mintKeypair]);
            const [userNfts] = await PublicKey.findProgramAddress(
                [mintAccount.toBuffer(), anchorWallet.publicKey.toBuffer()],
                program.programId
            );

            const adminSolAccount = new PublicKey(ADMIN_ACCOUNT);
            const treasuryAccount = new PublicKey(TREASURY_ACCOUNT);

            const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
            const getMetadata = async (data: Buffer[]) => {
                const seed = await PublicKey.findProgramAddress(
                    data,
                    TOKEN_METADATA_PROGRAM_ID
                );
                return seed[0]
            }
            const metadataAddress = await getMetadata([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mintAccount.toBuffer()])
            const solUsdPriceFeedAccount = new PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE")

            const accounts = {
                globalState: globalStatePDA,
                userNfts,
                payer: anchorWallet.publicKey,
                mintAccount: mintAccount,
                associatedTokenAccount: associateTokenAccount,
                adminSolAccount,
                treasuryAccount,
                metadataAccount: metadataAddress,
                priceUpdate: solUsdPriceFeedAccount,
                tokenProgram: TOKEN_PROGRAM_ID,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY
            }
            const tx = await program.methods
                .purchase()
                .accounts(accounts)
                .signers([])
                // .rpc();

            const provider = getProvider()
            //@ts-expect-error type warning
            const transaction  = await signAndSendTransaction(provider, tx)

            notify(transaction)
            await getGlobalState()
            setLoad(false)
        } catch (error) {
            console.log(error, "+++")
            setLoad(false)
            // @ts-expect-error can have type issues
            toast.error(error);
        }
    }

    const notify = (txhash: string) => {
        const url = `https://solscan.io/tx/${txhash}?cluster=${CLUSTER}`
        toast.success(
            <div>
                <span style={{ display: "block" }}>Transaction processed!</span>
                <a
                    href={url}
                    style={{ color: 'blue', textDecoration: 'underline', textAlign: "center", display: "block" }}
                    target="_blank"
                >
                    View Transaction
                </a>
            </div>
        );
    };

    const status = globalState ? getCampaignStatus(globalState?.purchaseStart, globalState?.purchaseEnd) : "Comming"

    return (
        <>
            <button onClick={() => buyTicket()}>{load ? <Spinner /> : status == "Ongoing" ? "Buy" : status}</button>
        </>
    )
}

export default Buy
