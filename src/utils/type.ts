import { PublicKey, Transaction, VersionedTransaction, SendOptions } from '@solana/web3.js';

export type GlobalStateData = {
    totalNftsMinted: number
    purchaseStart: number
    purchaseEnd: number
    revealStart: number
    revealEnd: number
    total_raised: number
    treasury_raised: number
    totalRevealed: number
};

export type ParsedNft = {
    publicKey: string; 
    owner: string;     
    mintKey: string; 
    revealedNumber: number;
};

export type ParsedNfts = ParsedNft[]; 

export interface RandomNumber {
    randomId: number;
    prize: number;
}

type DisplayEncoding = 'utf8' | 'hex';

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signAndSendTransactionV0'
  | 'signAndSendTransactionV0WithLookupTable'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (
    transactions: (Transaction | VersionedTransaction)[]
  ) => Promise<(Transaction | VersionedTransaction)[]>;
  //@ts-expect-error type warning
  signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  //@ts-expect-error type warning
  on: (event: PhantomEvent, handler: (args) => void) => void;
  //@ts-expect-error type warning
  request: (method: PhantomRequestMethod, params) => Promise<unknown>;
}

export type Status = 'success' | 'warning' | 'error' | 'info';

export interface TLog {
  status: Status;
  method?: PhantomRequestMethod | Extract<PhantomEvent, 'accountChanged'>;
  message: string;
  messageTwo?: string;
}
