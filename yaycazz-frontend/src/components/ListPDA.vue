<script setup >
import { onMounted, ref } from 'vue';
import { useWorkspace } from '../libs/useWorkspace';
const props = defineProps(['item'])

const { program, handlePoolPDA, wallet, fetchPoolData, handleRegisterPDA, fetchRegisterData, fetchPoolDataAll } = useWorkspace();

const item = props.item
const formatThePubkey = (pubkey) => {
    return `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`;
};
const data = ref(null);
const Token = ref(null);
const url = 'https://rpc.ironforge.network/mainnet?apiKey=01HJ4ABFFMZ9C317YSQ229DFQG';

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

onMounted(() => {
    getAsset(item.account.updateAuthority.toString(), item.account.mint.toString());
});

</script>

<template >
    <div class="grid grid-cols-2 md:grid-cols-7  card bg-gray-800  card-side shadow-xl">
        <div class="grid grid-cols-3 px-4 col-span-2 p-3 " v-if="Token">
            <div class="col-span-1">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img :src="Token.content.links.image"  />
                    </div>
                </div>
            </div>
            <div class="col-span-2 p-2">
                <p>{{ Token.content.metadata.name }}</p>
                <p class="text-xs font-semibold text-gray-400">Total Supply</p>

                <p class="text-xl font-bold  text-white" v-if="Token">{{
                    Token.token_info.supply / (10 ** Token.token_info.decimals) }} {{ Token.content.metadata.symbol }}
                </p>
                <p><a class="cursor-pointer" :href="'https://solscan.io/token/' + Token.id">{{
                    formatThePubkey(Token.id.toString()) }}</a></p>
            </div>

        </div>
        <div v-else class="col-span-2  flex items-center justify-center ">
            <div class="w-full flex flex-col gap-4  items-center ">
                <div class="flex gap-4 items-center">
                    <div class="skeleton w-16 h-16 rounded-full shrink-0"></div>
                    <div class="flex flex-col gap-4"></div>
                    <div class="skeleton h-4 w-20"></div>
                    <div class="skeleton h-4 w-28"></div>

                </div>
                
                
            </div>
        </div>
        <div class="p-3 col-span-2">
            <b>Price</b> :<span class="badge badge-ghost badge-sm"> {{ item.account.price / 1000000000 }}</span>
            <br />
            <b> Remaing Supply</b> : <span class="badge badge-ghost badge-sm"> {{ item.account.remainSupply }}</span>
            <br />
            <b>Pool status</b> : <span class="badge badge-info badge-sm">{{ item.account.isCanceled ? 'Canceled' : 'Active'
            }}</span>
            <br />
            <b>Distrubution status </b>
            : <span class="badge badge-success badge-sm">{{ !item.account.isDistributed ? 'Started' : 'Not Distributed'
            }}</span>
        </div>
        <div class="p-3 col-span-2">
            <b>Destination Vault</b> <br>
            <a class="cursor-pointer" target="_blank"
                :href="'https://solscan.io/account/' + item.account.vault.toString()">{{
                    formatThePubkey(item.account.vault.toString()) }}</a>
            <br>
            <b>Creator</b> <br>
            <a class="cursor-pointer" target="_blank"
                :href="'https://solscan.io/account/' + item.account.updateAuthority.toString()">{{
                    formatThePubkey(item.account.updateAuthority.toString()) }}</a>
        </div>
        <div class="col-span-3 md:col-span-1   ">
            <RouterLink :to="'/event/' + item.publicKey"
                class="left-shape bg-secondary text-white rounded-r-xl w-full btn-sm font-bold">Detail</RouterLink>

        </div>
    </div>
</template>

<style>
.left-shape {
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>

