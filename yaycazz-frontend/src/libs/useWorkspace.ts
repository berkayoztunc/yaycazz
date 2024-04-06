import { ComputedRef, computed } from "vue";
import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";

import { IDL, RegistrationProgram } from "./idl.ts";
import { Buffer } from 'buffer';
import { Provider } from "@coral-xyz/anchor";

const preflightCommitment = "processed";
const commitment = "confirmed";


export interface Workspace {
    formatThePubkey: (pubkey: PublicKey) => string;
    handlePoolPDA: (wallet: Wallet, pool: PublicKey) => Promise<[PublicKey, number]>;
    handleRegisterPDA: (wallet: Wallet, pool: PublicKey) => Promise<[PublicKey, number]>;
    handleEscorowVault: (creator: PublicKey, mint: PublicKey) => Promise<[PublicKey, number]>;
    fetchPoolData: (pool: PublicKey) => Promise<any>;
    fetchPoolDataAll: () => Promise<any>;
    fetchPoolRegisterData: (pool: PublicKey) => Promise<any>;

    fetchRegisterData: (vault: PublicKey,wallet:PublicKey) => Promise<any>;
    wallet: any;
    connection: Connection;
    provider: ComputedRef<Provider>;
    program: ComputedRef<Program>;
}
let workspace: {
    formatThePubkey: (pubkey: PublicKey) => string;
    handlePoolPDA: (wallet: Wallet, pool: PublicKey) => Promise<[PublicKey, number]>;
    handleRegisterPDA: (wallet: Wallet, pool: PublicKey) => Promise<[PublicKey, number]>;
    handleEscorowVault: (creator: PublicKey, mint: PublicKey) => Promise<[PublicKey, number]>;
    fetchPoolData: (pool: PublicKey) => Promise<any>;
    fetchPoolDataAll: () => Promise<any>;
    fetchPoolRegisterData: (pool: PublicKey) => Promise<any>;
    fetchRegisterData: (vault: PublicKey,wallet:PublicKey) => Promise<any>;
    wallet: any;
    connection: Connection;
    provider: ComputedRef<AnchorProvider>;
    program: ComputedRef<Program<RegistrationProgram>>;
} | null = null;
export const useWorkspace = () => workspace;

export const initWorkspace = () => {
    const programID = new PublicKey(
        "5c8fu4a3U9fW6nLmND2fdhQFSfuyf9GEzDmfNHfTun4R"
    );

    const seedForEscorowVault = "vault";
    const seedForPoolPDA = "pool";
    const seedForRegisterPDA = "register";
    

    const wallet = useAnchorWallet();
    const connection = new Connection("https://rpc.ironforge.network/mainnet?apiKey=01HJ4ABFFMZ9C317YSQ229DFQG", commitment);
    const provider = computed(
        () =>
            new AnchorProvider(connection, wallet.value, {
                preflightCommitment,
                commitment,
            })
    );
    const program = computed(() => new Program(IDL, programID, provider.value));
    const handlePoolPDA = async (wallet: Wallet, pool: PublicKey): Promise<[PublicKey, number]> => {
        const [pda, bump] =
            await PublicKey.findProgramAddressSync(
                [
                    Buffer.from(seedForPoolPDA),
                    wallet.publicKey.toBytes(),
                    pool.toBytes(),
                ],
                programID
            );

        return [pda, bump];
    };

    const handleRegisterPDA = async (wallet: Wallet, pool: PublicKey): Promise<[PublicKey, number]> => {
        const [pda, bump] = await PublicKey.findProgramAddressSync(
                [
                    Buffer.from(seedForRegisterPDA),
                    pool.toBytes(),
                    wallet.publicKey.toBytes(),
                ],
                programID
            );

        return [pda, bump];
    };
    const handleEscorowVault = async (creator: PublicKey, mint: PublicKey): Promise<[PublicKey, number]> => {
        const [pda, bump] =
            await PublicKey.findProgramAddressSync(
                [
                    Buffer.from(seedForEscorowVault),
                    creator.toBytes(),
                    mint.toBytes(),
                ],
                programID
            );

        return [pda, bump];
    };
    
    async function fetchPoolData(pool) {
        const poolAccount = await program.value.account.registration.fetch(pool);
        return poolAccount;
    }
    async function fetchPoolRegisterData(pool) {
        const registerFilter = await program.value.account.registerers.all([
            {
              memcmp: {
                offset: 56,
                bytes: pool.toBase58(),
              },
            },
          ]);
        return registerFilter;
    }
    async function fetchPoolDataAll() {
        const vaultAccount = await program.value.account.registration.all();
        return vaultAccount;
    }
    async function fetchRegisterData(wallet,vault) {
        const [pda,bump] = await handleRegisterPDA(wallet, vault);
        const vaultAccount = await program.value.account.registerers.fetch(pda);
        return vaultAccount;
    }



    const formatThePubkey = (pubkey: PublicKey) => {
        const pubkeyStr = pubkey.toString();
        const pubkeyStrLength = pubkeyStr.length;
        const pubkeyStrFirst = pubkeyStr.slice(0, 5);
        const pubkeyStrLast = pubkeyStr.slice(pubkeyStrLength - 5, pubkeyStrLength);
        return `${pubkeyStrFirst}...${pubkeyStrLast}`;
    };

    workspace = {
        formatThePubkey,
        handlePoolPDA,
        handleRegisterPDA,
        handleEscorowVault,
        fetchPoolData,
        fetchPoolDataAll,
        fetchRegisterData,
        fetchPoolRegisterData,
        wallet,
        connection,
        provider,
        program,
    };
};



