export const PROGRAM_ID = "Fbw4tX21sQ9XTpP869iqHCKhshPoN6CtGqeCeohbXAra"
export const SEED = "NFT_PLATFORM"
export const ADMIN_ACCOUNT = "HrFjzjeZHiQ3Goro6UxQL2gPiQrPAhmdkT7kUKZdZ3Fm"
export const TREASURY_ACCOUNT = "ECBME3yBHmff6sKdcUJadjXn8UPvVT65Srzmkj1Wu45r"

export const CLUSTER = "mainnet"
export const randomState = {
    1: "9Fcjx6rEAc6vAyJY2t5zSoQ6BSEG9zvJGpJ1suPNUonY",
    2: ""
}

export const getRandomState = (id: number) => {
    if (id >= 0 && id < 1111) {
        return randomState[1]
    } else if (id >= 1111 && id < 2222) {
        return randomState[2]
    }
}

export const getUrl = (mintKey: string) => {
    return `https://explorer.solana.com/address/${mintKey}?cluster=mainet`
}

export const RPC_URL = "https://distinguished-dry-sun.solana-mainnet.quiknode.pro/7b2c02272001f5c0a1349a5c92e342d8de078390"