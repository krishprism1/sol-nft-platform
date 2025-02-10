import React, { useState } from 'react'
import Spinner from '../common/Spinner'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-toastify'
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from '@/utils/web3'


const InitializeRandomState = () => {
    const anchorWallet = useAnchorWallet();
    const [load, setLoad] = useState(false)


    const initializeRandomState = async () => {
        try {
            setLoad(true)
            if (!anchorWallet) {
                setLoad(false)
                return toast.error("Please connect your wallet to proceed.");
            }

            const index = 1;
            const indexBuffer = Buffer.alloc(2); // 2 bytes for u16
            indexBuffer.writeUInt16LE(index);

            const program = getProgram(anchorWallet)
            const [randomState] = await PublicKey.findProgramAddress(
                [Buffer.from("STATE"), indexBuffer],
                program.programId
            );

            const accounts = {
                state: randomState,
                signer: anchorWallet.publicKey,
                systemProgram: SystemProgram.programId,
            }


            await program.methods
                .initializeRandomState(index)
                .accounts(accounts)
                .signers([])
                .rpc();

            toast.success("Random state initialized successfully!")
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
            <button className='popup-btn' onClick={() => initializeRandomState()}>{load ? <Spinner /> : "initialize state"}</button>
        </>
    )
}

export default InitializeRandomState
