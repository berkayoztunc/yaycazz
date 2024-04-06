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
import Tokenomics from '../components/Tokenomics.vue';


const headers = [
  { text: "address", value: "user"},
  { text: "Valid Mint", value: "count", sortable: true},
  { text: "Try Count", value: "tryCount",sortable : true},
];
import { getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token"

import { RouterLink, useRoute } from "vue-router";

const loading = ref(false);
const registrationData = ref(null);
const myData = ref({
    count: 0,
    tryCount: 0,
});
const { program, handlePoolPDA, wallet ,fetchPoolData,handleRegisterPDA,fetchRegisterData,formatThePubkey,fetchPoolRegisterData} = useWorkspace();

// get id from router
const id = ref(null);
const searchValue = ref();
const { params } = useRoute();
id.value = params.id;
const registration = new anchor.web3.PublicKey(params.id);
const { publicKey, sendTransaction } = useWallet();

const StartTimer = new Date();
const EndTimer = new Date();
const Token = ref(null);
const UserList = ref(null);


const timer = useTimer(StartTimer);
const timerEnd = useTimer(EndTimer);

const url = `https://rpc.ironforge.network/mainnet?apiKey=01HJ4ABFFMZ9C317YSQ229DFQG`

const getAsset = async (wallet,token) => {
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
  console.log("Asset: ", result);
};

onMounted(async () => {
    await initWorkspace();
    await loadData();
    const data = await fetchPoolRegisterData(registration);
    UserList.value=  data

});

watchEffect(wallet, async (wallet) => {
    if (wallet) {
        await loadMyData(wallet);
        await loadData();
    }
});

async function register() {

    const [vault, bump] = await handleRegisterPDA(wallet.value, registration);
    loading.value = true;
    if (registrationData.value.startTime*1000 > Date.now()) {
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

async function adminClaim(toaddress,registerer) {
    try {
        const tx = await program.value.methods.claimViaAdmin().accounts({
            user: publicKey.value,
            registerer: registerer,
            registration: registration,
            toAddress: toaddress,
            systemProgram: SystemProgram.programId,
        }).rpc();
        toast.success("Transaction completed", {
            autoClose: 1000,
            theme: "dark",

        });
        window.open(`https://explorer.solana.com/tx/${tx}`, '_blank');
    } catch (error) {
        console.log(error);
        toast.error(error.message, {
            autoClose: 1000,
            theme: "dark",
        });
    }
    const data = await fetchPoolRegisterData(registration);
    UserList.value=  data
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
    const bobTokenAccount = await connection.getTokenAccountsByOwner(wallet.value.publicKey, { mint: mint })
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
    EndTimer.setTime(data.endTime *1000);
    EndTimer.setHours(EndTimer.getHours());
    EndTimer.setMinutes(EndTimer.getMinutes());
    timerEnd.re
    StartTimer.setTime(data.startTime * 1000);
    StartTimer.setHours(StartTimer.getHours());
    StartTimer.setMinutes(StartTimer.getMinutes());
    timer.restart();
    registrationData.value = data
    console.log(data)
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
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mb-20">
      

        <div class="overflow-hidden px-6 mt-4">
            <div class="text-sm breadcrumbs">
                <ul>
                    <li><RouterLink to="/pool-list">Pool list</RouterLink></li> 
                    <li><a>{{ registration }}</a></li> 
                </ul>
            </div>
            <div class="mx-auto  ">
                <div class="mx-auto grid  grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20  lg:grid-cols-2">
                    <div class="block  p-6  rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
                        <div class=" p-4 ">
                            <div class="grid grid-cols-5 gap-5 px-4" v-if="Token">
                                <div class="col-span-1">
                                    <div class="avatar">
                                        <div class=" m:w-auto rounded-full">
                                            <img :src="Token.content.links.image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-4">
                                    <p>{{ Token.content.metadata.name }}</p>
                                    <p class="text-xs font-semibold text-gray-400">Token Supply</p>

                                    <p class="text-xl font-bold  text-white" v-if="Token">{{
                                        Token.token_info.supply / (10 ** Token.token_info.decimals) }} {{
        Token.content.metadata.symbol }}</p>
                                    <p><a class="cursor-pointer" :href="'https://solscan.io/token/' + Token.id">{{
                                        formatThePubkey(Token.id.toString()) }}</a></p>

                                    <div><b>Start</b> : {{ moment(StartTimer).format("MMMM Do YYYY, h:mm:ss a") }} </div>
                                    <div><b>End</b> : {{ moment(EndTimer).format("MMMM Do YYYY, h:mm:ss a") }}</div>

                                </div>

                            </div>
                            <div class="grid grid-cols-3">
                                <div class="p-4">
                                    <p class="text-xl font-bold  text-white" v-if="registrationData">{{
                                        registrationData.maxRegister }}</p>
                                    <p class="text-xs font-semibold text-gray-400">Mint Total Supply</p>
                                </div>
                                <div class="p-4">
                                    <p class="text-xl font-bold  text-white" v-if="registrationData">{{
                                        registrationData.remainSupply }}</p>
                                    <p class="text-xs font-semibold text-gray-400">Remaining</p>
                                </div>
                                <div class="p-4">
                                    <p class="text-xl font-bold  text-white" v-if="registrationData">◎ {{
                                        registrationData.price / 1000000000 }}</p>
                                    <p class="text-xs font-semibold text-gray-400">Price</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3">
                                <div class="p-4">
                                    <p class="text-xl font-bold text-white" v-if="myData">{{ (myData.tryCount > 0 ?
                                        (myData.count * 100) / myData.tryCount : 0).toFixed(2) }} % </p>
                                    <p class="text-xs font-semibold text-gray-400">Success Rate</p>
                                </div>
                                <div class="p-4">
                                    <p class="text-xl font-bold  text-white" v-if="myData">{{ myData.count }}</p>
                                    <p class="text-xs font-semibold text-gray-400">Valid Mint</p>
                                </div>
                                <div class="p-4">
                                    <p class="text-xl font-bold  text-white" v-if="myData">{{ myData.tryCount }}</p>
                                    <p class="text-xs font-semibold text-gray-400">Total Try</p>
                                </div>

                            </div>
                            <div role="alert" class="alert alert-warning my-2"
                                v-if="registrationData && registrationData.isCanceled">
                                <span>These pool is canceled. You can claim back your fund</span>
                            </div>
                            <template v-if="wallet">


                                <a v-if="registrationData && registrationData.distrubuteIsStart" @click="claim"
                                    class="btn w-full bg-success text-white mb-1">
                                    Claim
                                </a>
                                <button @click="register" class="btn w-full bg-indigo-600 text-white "
                                    v-if="wallet && registrationData && !registrationData.isCanceled">
                                    Mint

                                </button>
                            </template>


                            <wallet-multi-button dark v-if="!wallet"></wallet-multi-button>

                        </div>
                        <Tokenomics />


                    </div>

                    <div >
                        <input type="text" v-model="searchValue" placeholder="Wallet" class="input input-bordered w-full mb-2 " />

                        <EasyDataTable v-if="UserList" class="bg-slate-800"
                            :search-field="[ 'user' ]"
                            :search-value="searchValue"
                            :headers="headers"
                            :items="UserList.map((item)=>{return item.account })"
                        />
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<style>
.vue3-easy-data-table__main{
    background-color: #1f2937;
    border-radius: 0.5rem;
}

</style>