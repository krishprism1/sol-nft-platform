import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { IDL, NftPlatform } from "./nft_program";
import { PROGRAM_ID, RPC_URL, SEED } from "./constant";
import { GlobalStateData, ParsedNfts, RandomNumber } from "./type";
import axios from "axios";

const connection = new Connection(RPC_URL, "confirmed");


export const getProgram = (wallet: { publicKey: PublicKey }) => {
    // @ts-expect-error Program instantiation can have type issues
    const provider = new AnchorProvider(connection, wallet || null, {
        commitment: "confirmed",
    });

    // @ts-expect-error Program instantiation can have type issues
    const program = new Program<NftPlatform>(IDL, PROGRAM_ID, provider);
    return program;
};


export const fetchGlobalState = async (wallet: { publicKey: PublicKey }) => {
    try {
        const program = getProgram(wallet)
        const [globalStatePDA] = await PublicKey.findProgramAddress(
            [Buffer.from(SEED)],
            program.programId
        );

        // @ts-expect-error Program instantiation can have type issues
        const state = await program.account.globalState.fetch(globalStatePDA);
        const data: GlobalStateData = {
            totalNftsMinted: state.totalNftsMinted.toNumber(),
            purchaseStart: state.purchaseStart.toNumber() * 1000,
            purchaseEnd: state.purchaseEnd.toNumber() * 1000,
            revealStart: state.revealStart.toNumber() * 1000,
            revealEnd: state.revealEnd.toNumber() * 1000,
            total_raised: state.totalRaised.toNumber(),
            treasury_raised: parseFloat((state.totalRaised.toNumber() * (25 / 10 ** 11)).toFixed(4)),
            totalRevealed: state.totalRevealed.toNumber()
        }
        return data
    } catch (error) {
        console.log(error)
    }
};

export const fetchRandomState = async (wallet: { publicKey: PublicKey }) => {
    try {
        const program = getProgram(wallet)

        // @ts-expect-error Program instantiation can have type issues
        const state = await program.account.usedRandomNumber.all();
        return state
    } catch (error) {
        console.log(error)
    }
};

export const fetchallNfts = async (wallet: { publicKey: PublicKey }) => {
    const program = getProgram(wallet)
    // @ts-expect-error Program instantiation can have type issues
    const userNfts = await program.account.userNfTs.all();

    // @ts-expect-error Program instantiation can have type issues
    const parsedNfts: ParsedNfts = userNfts.map(({ publicKey, account }) => ({
        publicKey: publicKey.toBase58(),
        owner: account.owner.toBase58(),
        mintKey: account.mintKey.toBase58(),
        revealedNumber: parseInt(account.revealedNumber)
    }));

    const filteredNfts = parsedNfts.filter(item => item.revealedNumber > 0)
    const randomNum = await allRandomNuber()

    const winners = filteredNfts
        .filter((item) => randomNum.some((rand: RandomNumber) => rand.randomId === item.revealedNumber))
        .map((item) => ({
            prize: getReward(item.revealedNumber, randomNum),
            owner: item.owner,
            revealedNumber: item.revealedNumber,
        }));

    return winners
}

export const fetchUserNfts = async (wallet: { publicKey: PublicKey }) => {
    const program = getProgram(wallet)
    // @ts-expect-error Program instantiation can have type issues
    const userState = await program.account.userNfTs.all([
        { memcmp: { offset: 8, bytes: wallet.publicKey.toBase58() } },
    ]);

    // console.log(userState, "userState", userState[0].account.revealedNumber)
    // @ts-expect-error Program instantiation can have type issues
    const parsedNfts: ParsedNfts = userState.map(({ publicKey, account }) => ({
        publicKey: publicKey.toBase58(),
        owner: account.owner.toBase58(),
        mintKey: account.mintKey.toBase58(),
        revealedNumber: parseInt(account.revealedNumber)
    }));

    return parsedNfts
}


const getReward = (revealedNumber: number, randomNum: { randomId: number; prize: number }[]) => {
    const element = randomNum.find((item) => item.randomId === revealedNumber);
    return element ? element.prize : 0;
};

const allRandomNuber = async () => {
    try {
        const list = await axios.get(`/api/prize/all`);
        return list.data
    } catch (error) {
        console.log(error)
    }
}