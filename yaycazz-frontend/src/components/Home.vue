<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
import { SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

import { useWorkspace, initWorkspace } from "../libs/useWorkspace";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as anchor from "@coral-xyz/anchor";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useTimer } from 'vue-timer-hook';
import { useWallet } from "solana-wallets-vue";
import moment from 'moment';

import { getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token"


const loading = ref(false);
const registration = new anchor.web3.PublicKey("7Mhi3NK9DXL5ytZMfwpWiYxaEXBtCuiD4H3XGR4JyS9t");
const registrationData = ref(null);
const myData = ref({
    count: 0,
    tryCount: 0,
});
const { program, handlePoolPDA, wallet, fetchPoolData, handleRegisterPDA, fetchRegisterData, connection, handleEscorowVault, formatThePubkey } = useWorkspace();
const { publicKey, sendTransaction } = useWallet();

const StartTimer = new Date();
const EndTimer = new Date();
const Token = ref(null);


const timer = useTimer(StartTimer);
const timerEnd = useTimer(EndTimer);

const url = `https://rpc.ironforge.network/mainnet?apiKey=01HJ4ABFFMZ9C317YSQ229DFQG`

const getAsset = async (wallet, token) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: wallet,
            method: 'getAsset',
            params: {
                id: token,
                displayOptions: {
                    showFungible: true //return details about a fungible token
                }
            },
        }),
    });
    const { result } = await response.json();
    Token.value = result;
};

onMounted(async () => {
    await initWorkspace();
    await loadData();
    setInterval(() => {
        loadData();
    }, 5000);

});

watch(wallet, async (wallet) => {
    if (wallet) {
        await loadMyData(wallet);
        await loadData();
    }
});

async function register() {

    const [vault, bump] = await handleRegisterPDA(wallet.value, registration);
    loading.value = true;
    if (registrationData.value.startTime * 1000 > Date.now()) {
        toast.error("The mint is not yet open", {
            autoClose: 1000,
            theme: "dark",
        });
        return;
    }
    try {
        await program.value.methods.register().accounts({
            registerer: vault,
            user: wallet.publicKey,
            registration: registration,
            vault: new anchor.web3.PublicKey(registrationData.value.vault),
            systemProgram: SystemProgram.programId,
        }).rpc();
        toast.success("Transaction completed Congratulations", {
            autoClose: 1000,
            theme: "dark",

        });
    } catch (error) {
        console.log(error);
        toast.error(error.message, {
            autoClose: 1000,
            theme: "dark",
        });
    }
    await loadMyData(wallet.value);
    await loadData();
}


async function claim() {

    if (loading.value) return;

    const [registerer, bump] = await handleRegisterPDA(wallet.value, registration);
    loading.value = true;
    console.log(registrationData.value.mint)
    const mint = new anchor.web3.PublicKey(registrationData.value.mint);
    const vault = new anchor.web3.PublicKey(registrationData.value.vault);
    const creator = new anchor.web3.PublicKey(registrationData.value.updateAuthority);

    const [escrowWalletState, bump2] = await handleEscorowVault(creator, mint);

    let walletAddress = new anchor.web3.PublicKey(wallet.value.publicKey);
    const tokenAccount = await connection.getTokenAccountsByOwner(wallet.value.publicKey, { mint: mint })

    if (tokenAccount.value.length == 0) {
        try {
            const associatedAccount = await getAssociatedTokenAddress(
                mint,
                walletAddress
            )
            const createToken = new Transaction();
            createToken.add(
                createAssociatedTokenAccountInstruction(
                    publicKey.value,
                    associatedAccount,
                    publicKey.value,
                    mint
                )
            );
            const signature = await sendTransaction(createToken, connection);
            await connection.confirmTransaction(signature, 'processed');
        }
        catch (error) {
            toast.error(error.message, {
                autoClose: 1000,
                theme: "dark",
            });
            loading.value = false;
            return;
        }

    }
    const bobTokenAccount = await connection.getTokenAccountsByOwner(wallet.value.publicKey, { mint: mint })
    if (bobTokenAccount.value.length == 0) {
        toast.error("Pleas try again", {
            autoClose: 1000,
            theme: "dark",
        });
        loading.value = false;
        return;
    }
    try {
        await program.value.methods.claim(bump2).accounts({
            user: publicKey.value,
            creator: creator,
            registerer: registerer,
            registration: registration,
            escrowWalletState: escrowWalletState,
            walletToDepositTo: bobTokenAccount.value[0].pubkey,
            vault: vault,
            mint: mint,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        }).rpc();
        toast.info("Claim successful", {
            autoClose: 1000,
            theme: "dark",
        });

    } catch (error) {
        console.log(error);
        toast.error(error.message, {
            autoClose: 1000,
            theme: "dark",
        });
    }

    await loadMyData(wallet.value);
    await loadData();
    loading.value = false;
}


const loadData = async () => {
    const data = await fetchPoolData(registration);
    if (registrationData.value != undefined && data.remainSupply.toNumber() < registrationData.value.remainSupply.toNumber()) {
        toast.success("New Mint", {
            autoClose: 400,
            theme: "dark",
        });
    }
    registrationData.value = data
    EndTimer.setTime(data.endTime * 1000);
    EndTimer.setHours(EndTimer.getHours());
    EndTimer.setMinutes(EndTimer.getMinutes());
    timerEnd.restart();
    StartTimer.setTime(data.startTime * 1000);
    StartTimer.setHours(StartTimer.getHours());
    StartTimer.setMinutes(StartTimer.getMinutes());
    timer.restart();
    if (Token.value == null) {
        getAsset(data.updateAuthority, data.mint);
    }
    if (wallet.value) await loadMyData(wallet.value);
};
const loadMyData = async (wallet) => {
    try {
        const data = await fetchRegisterData(wallet, registration);
        myData.value = data;
    } catch (error) {
        myData.value = {
            count: 0,
            tryCount: 0,
        };
    }
};
</script>

<template>
    <div>
        <!-- Hero -->
        <div class="relative overflow-hidden">
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div class="max-w-2xl text-center mx-auto">
                    <h1 class="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">Launch a token is now more <span class="text-blue-600">simple</span></h1>
                    <p class="mt-3 text-lg text-gray-800 dark:text-gray-400">Trust, define, choose and launch your token with yaycazz</p>
                </div>

                <div class="mt-10 relative max-w-5xl mx-auto">
                    <iframe width="100%" height="500"
                        src="https://www.youtube.com/embed/aM_b46ZyMaw?si=kOOS5lAkQ8XwNd4K" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



                    <div
                        class="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
                        <div class="bg-white size-48 rounded-lg dark:bg-slate-900"></div>
                    </div>

                    <div
                        class="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
                        <div class="bg-white size-48 rounded-full dark:bg-slate-900"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
                <!-- Card -->
                <a class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all dark:hover:bg-white/[.075] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#">
                    <svg class="flex-shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="13.5" cy="6.5" r=".5" />
                        <circle cx="17.5" cy="10.5" r=".5" />
                        <circle cx="8.5" cy="7.5" r=".5" />
                        <circle cx="6.5" cy="12.5" r=".5" />
                        <path
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                    </svg>

                    <div>
                        <div>
                            <h3 class="block font-bold text-gray-800 dark:text-white">Build your token</h3>
                            <p class="text-gray-600 dark:text-gray-400">You can simply create token via yaycazz wizzard.
                                And choose your mint experience for launch</p>
                        </div>

                        <p
                            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            Learn more
                            <svg class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </p>
                    </div>
                </a>
                <!-- End Card -->

                <!-- Card -->
                <a class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all dark:hover:bg-white/[.075] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#">
                    <svg class="flex-shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 3h20" />
                        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                        <path d="m7 21 5-5 5 5" />
                    </svg>

                    <div>
                        <div>
                            <h3 class="block font-bold text-gray-800 dark:text-white">Event listing</h3>
                            <p class="text-gray-600 dark:text-gray-400">All processes occur automatically and quickly.
                                You just need to have the right strategy and marketing. Yaycazz handles all the
                                remaining work.</p>
                        </div>

                        <p
                            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            Learn more
                            <svg class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </p>
                    </div>
                </a>
                <!-- End Card -->

                <!-- Card -->
                <a class="group flex gap-y-6 size-full hover:bg-gray-100 rounded-lg p-5 transition-all dark:hover:bg-white/[.075] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#">
                    <svg class="flex-shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                        <path d="M2 7h20" />
                        <path
                            d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                    </svg>

                    <div>
                        <div>
                            <h3 class="block font-bold text-gray-800 dark:text-white">Permissionless</h3>
                            <p class="text-gray-600 dark:text-gray-400">Yaycazz is open source and it permissionless
                                fulfilment progress. So you can chose all diffrent kind of path</p>
                        </div>

                        <p
                            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            Learn more
                            <svg class="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </p>
                    </div>
                </a>
                <!-- End Card -->
            </div>
        </div>
        <!-- Masonry Cards -->
        <div class="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <!-- Grid -->
            <div class="grid sm:grid-cols-12 gap-6">
                <div class="sm:self-end col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-5 lg:col-start-3">
                    <!-- Card -->
                    <a class="group relative block rounded-xl overflow-hidden" href="#">
                        <div class="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                            <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                src="/machine.webp" alt="Image Description">
                        </div>
                        <div class="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                            <div
                                class="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200">
                                Launch events
                            </div>
                        </div>
                    </a>
                    <!-- End Card -->
                </div>
                <!-- End Col -->

                <div class="sm:self-end col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3">
                    <!-- Card -->
                    <a class="group relative block rounded-xl overflow-hidden" href="#">
                        <div class="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                            <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                src="/document.webp" alt="Image Description">
                        </div>
                        <div class="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                            <div
                                class="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200">
                                System Document
                            </div>
                        </div>
                    </a>
                    <!-- End Card -->
                </div>
                <!-- End Col -->

                <div class="col-span-12 md:col-span-4">
                    <!-- Card -->
                    <a class="group relative block rounded-xl overflow-hidden" href="#">
                        <div class="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                            <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                src="/swap.webp" alt="Image Description">
                        </div>
                        <div class="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                            <div
                                class="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200">
                                Swap your tokens
                            </div>
                        </div>
                    </a>
                    <!-- End Card -->
                </div>
                <!-- End Col -->

                <div class="col-span-12 sm:col-span-6 md:col-span-4">
                    <!-- Card -->
                    <a class="group relative block rounded-xl overflow-hidden" href="#">
                        <div class="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                            <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                src="/market.webp" alt="Image Description">
                        </div>
                        <div class="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                            <div
                                class="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200">
                                Check the market
                            </div>
                        </div>
                    </a>
                    <!-- End Card -->
                </div>
                <!-- End Col -->

                <div class="col-span-12 sm:col-span-6 md:col-span-4">
                    <!-- Card -->
                    <a class="group relative block rounded-xl overflow-hidden" href="#">
                        <div class="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                            <img class="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                src="/create.webp" alt="Image Description">
                        </div>
                        <div class="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                            <div
                                class="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200">
                                Create Your Own Launch
                            </div>
                        </div>
                    </a>
                    <!-- End Card -->
                </div>
                <!-- End Col -->
            </div>
            <!-- End Grid -->
        </div>

        <!-- End Clients -->
        <!-- Card Section -->
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <!-- Grid -->
            <div class="grid sm:grid-cols-4 border-y border-gray-200 dark:border-gray-800">
                <!-- Card -->
                <div
                    class="p-4 md:p-5 relative before:absolute before:top-0 before:start-0 before:w-full before:h-px sm:before:w-px sm:before:h-full before:bg-gray-200 before:first:bg-transparent dark:before:bg-gray-700">
                    <div>
                        <svg class="flex-shrink-0 size-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>

                        <div class="mt-3">
                            <div class="flex items-center gap-x-2">
                                <p class="text-xs uppercase tracking-wide text-gray-500">
                                    Total users
                                </p>
                                <div class="hs-tooltip">
                                    <div class="hs-tooltip-toggle">
                                        <svg class="flex-shrink-0 size-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <path d="M12 17h.01" />
                                        </svg>
                                        <span
                                            class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            The number of daily users
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-1 lg:flex lg:justify-between lg:items-center">
                                <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    72,540
                                </h3>
                                <a class="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2 text-gray-800 bg-gray-200/[.7] hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-200"
                                    href="#">
                                    <svg class="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                    </svg>
                                    <span class="inline-block text-xs font-semibold">
                                        12.5%
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Card -->

                <!-- Card -->
                <div
                    class="p-4 md:p-5 relative before:absolute before:top-0 before:start-0 before:w-full before:h-px sm:before:w-px sm:before:h-full before:bg-gray-200 before:first:bg-transparent dark:before:bg-gray-700">
                    <div>
                        <svg class="flex-shrink-0 size-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 22h14" />
                            <path d="M5 2h14" />
                            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                        </svg>

                        <div class="mt-3">
                            <p class="text-xs uppercase tracking-wide text-gray-500">
                                TVL
                            </p>
                            <div class="mt-1 lg:flex lg:justify-between lg:items-center">
                                <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    123,267,182.34$
                                </h3>
                                <a class="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2 text-gray-800 bg-gray-200/[.7] hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-200"
                                    href="#">
                                    <svg class="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                    </svg>
                                    <span class="inline-block text-xs font-semibold">
                                        2.25%
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Card -->

                <!-- Card -->
                <div
                    class="p-4 md:p-5 relative before:absolute before:top-0 before:start-0 before:w-full before:h-px sm:before:w-px sm:before:h-full before:bg-gray-200 before:first:bg-transparent dark:before:bg-gray-700">
                    <div>
                        <svg class="flex-shrink-0 size-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                            <path d="m12 12 4 10 1.7-4.3L22 16Z" />
                        </svg>

                        <div class="mt-3">
                            <div class="flex items-center gap-x-2">
                                <p class="text-xs uppercase tracking-wide text-gray-500">
                                    Success Trx rate
                                </p>
                                <div class="hs-tooltip">
                                    <div class="hs-tooltip-toggle">
                                        <svg class="size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path
                                                d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                        </svg>
                                        <span
                                            class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-slate-700"
                                            role="tooltip">
                                            The average number of click rate
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-1 lg:flex lg:justify-between lg:items-center">
                                <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    56.8%
                                </h3>
                                <a class="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2 text-red-700 bg-red-200/[.7] hover:bg-red-200 rounded-md dark:bg-red-700 dark:hover:bg-red-800 dark:text-red-100"
                                    href="#">
                                    <svg class="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <span class="inline-block text-xs font-semibold">
                                        Need attention
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Card -->

                <!-- Card -->
                <div
                    class="p-4 md:p-5 relative before:absolute before:top-0 before:start-0 before:w-full before:h-px sm:before:w-px sm:before:h-full before:bg-gray-200 before:first:bg-transparent dark:before:bg-gray-700">
                    <div>
                        <svg class="flex-shrink-0 size-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
                            <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
                            <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
                        </svg>

                        <div class="mt-3">
                            <p class="text-xs uppercase tracking-wide text-gray-500">
                                Pageviews
                            </p>
                            <div class="mt-1 lg:flex lg:justify-between lg:items-center">
                                <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    92,913
                                </h3>
                                <a class="mt-1 lg:mt-0 min-h-[24px] inline-flex items-center gap-x-1 py-0.5 px-2 text-orange-700 bg-orange-200/[.7] hover:bg-orange-200 rounded-md dark:bg-orange-700 dark:hover:bg-orange-800 dark:text-orange-100"
                                    href="#">
                                    <svg class="inline-block size-3 self-center" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <span class="inline-block text-xs font-semibold">
                                        2 warnings
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Card -->
            </div>
            <!-- End Grid -->
        </div>
        <!-- End Card Section -->

    </div>
</template>
