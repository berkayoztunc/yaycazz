<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { watchDebounced } from '@vueuse/core'

onMounted(() => {
    
});
const state = ref(0)
const tokenomics = ref([
    {
        address: '',
        percentage: 20,
        provider: '5'
    },
    {
        address: '',
        percentage: 20,
        provider: '6'
    },
    {
        address: '',
        percentage: 60,
        provider:4
    }
]);

function addTokenomics() {
    let totalPercentage = 0;
    tokenomics.value.forEach((item) => {
        totalPercentage += item.percentage;
    });
    let remainingPercentage = 100 - totalPercentage;

    tokenomics.value.push({
        address: '',
        percentage: remainingPercentage,
        provider: 4
    });
}

function removeTokenomics(index) {
    tokenomics.value.splice(index, 1);
}

watchDebounced(tokenomics, (newVal) => {
    // check totoal percentage is more than 100
    let totalPercentage = 0;
    newVal.forEach((item) => {
        totalPercentage += item.percentage;
    });
    if (totalPercentage > 100) {
        toast.error('Total percentage should be less than 100');
    }
    // check no one bigger than 100
    newVal.forEach((item) => {
        if (item.percentage > 100) {
            toast.error('Percentage should be less than 100');
        }
    });
    // check no one smaller than 0
    newVal.forEach((item) => {
        if (item.percentage < 0) {
            item.percentage = 0;
            toast.error('Percentage should be more than 0');
        }
    });
    

}, { deep: true, debounce: 1000 });

function genereteToken() {
    state.value = 1;
}

function setTokenomics() {
    state.value = 2;
}

function setApprovment() {
    state.value = 3;
}

function createEvent() {
    state.value = 4;
}

function setTimeEvent() {
    state.value = 5;
}



</script>

<template>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid grid-cols-3 gap-3 mt-3">
            <div class="p-4 bg-gray-800 card  shadow-xl" :class="state  >= 0?  '': 'blur-sm'">
                <h2 class="card-title">#1 Create Token</h2>
                <p>Select Your Token</p>
                
                <input type="text" placeholder="Select your token" class="  w-full input " />
                <p>You can paste your mint address</p>

                <hr class="my-4">
                <p>Create Your Token</p>

                <div class="flex flex-col gap-2">
                    <label for="small-file-input" class="sr-only">Choose file</label>
                    <input type="file" class="file-input w-full " />
                    <input type="text" placeholder="Name" class="  w-full input " />
                    <input type="text" placeholder="Symbol" class="  w-full input " />
                    <input type="text" placeholder="Description" class="  w-full input " />
                    <input type="number" placeholder="Decimal" class="  w-full input " />
                    <input type="text" placeholder="Supply" class="  w-full input " />
                </div>
                <div class="card-actions justify-end mt-2">
                    <button class="btn btn-primary " @click="genereteToken" v-if="state == 0">Generate</button>
                </div>
            </div>
            <div class="p-4 bg-gray-800  card shadow-xl col-span-2 " :class="state  >= 1 ?  '': 'blur-sm'">
                <h2 class="card-title">#2 Tokenomics</h2>
                <div class="flex justify-between my-2">
                    <p>Define your tokenomics </p> <button class="btn  btn-success" @click="addTokenomics" v-if="state == 1">+ add new address</button>
                </div>
                <div class="flex flex-col gap-2">

                    <div class="grid grid-cols-5 gap-2 " v-for="(item,index) in tokenomics">
                        <input :max="100" type="number" placeholder="Persantege" class="input  w-full  " v-model="item.percentage"/>
                        <select class="select  w-full " v-model="item.provider" :disabled="item.provider == '5' || item.provider == '6' ? true : false">
                            <option disabled selected>Provider</option>
                            <option value="1">Valhala (Soon)</option>
                            <option value="2">StreamFlow (Soon)</option>
                            <option value="3">Yaycazz (Soon)</option>
                            <option value="4">Direct Address </option>
                            <option value="5" disabled>Liquidity </option>
                            <option value="6" disabled>Mint event</option>
                        </select>
                        <input type="text" placeholder="Address" v-model="item.address"
                            class="input  w-full  col-span-2 " :class="state == 1 ? 'col-span-2' : 'col-span-3'"  :disabled="item.provider == '5' || item.provider == '6' ? true : false" />
                        
                        <button class="btn  btn-error" @click="removeTokenomics(index)" v-if="state == 1" :disabled="item.provider == '5' || item.provider == '6' ? true : false">x</button>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mt-2">
                    <button class="btn btn-primary w-full" @click="setTokenomics" v-if="state == 1">Set</button>
                    <button class="btn btn-success  w-full" @click="setTokenomics" v-if="state == 1">Transfer</button>

                </div>
            </div>
            <div class="p-4 bg-gray-800  card shadow-xl col-span-1 " :class="state  >=  2?  '': 'blur-sm'">
                <h2 class="card-title">#3 Do you want to approvment</h2>
                <p>Chose your launch event</p>
                <p>Do you want to require DAO approval for your token launch process? If so, you can only mint tokens after receiving approval. If approval is not granted, you can continue minting tokens without approval.</p>
                <div class="flex gap-2 justify-end mt-2" v-if="state == 2">
                    <button class="btn btn-success w-1/2 " @click="setApprovment">Yes</button>

                    <button class="btn btn-primary w-1/2 " @click="setApprovment">No</button>
                </div>
            </div>
            <div class="p-4  bg-gray-800 card shadow-xl col-span-2 " :class="state  >= 3 ?  '': 'blur-sm'">
                <h2 class="card-title">4# Create Event</h2>
                <p>Chose your launch event</p>
                <div class="flex flex-col gap-2">
                    <input type="text" placeholder="Mint Price" class="input  w-full  " />
                    <input type="text" placeholder="Mint Supply" class="input  w-full  " />
                    <select class="select  w-full ">
                        <option disabled selected>Mint Type</option>
                        <option>Block Base With Penalty</option>
                        <option>Block Base</option>
                        <option>Public</option>
                    </select>
                    <select class="select  w-full ">
                        <option disabled selected>Provider</option>
                        <option>Yaycazz</option>
                        <option>Orca (Soon)</option>
                        <option>Meteora (Soon)</option>
                    </select>
                    <input type="text" placeholder="Valid Mint Per Block"
                        class="input  w-full  " />
                </div>
                <div class="card-actions justify-end mt-2">
                    <button class="btn btn-primary " @click="createEvent" v-if="state == 3">Create Event</button>
                </div>
            </div>
            <div class="p-4  bg-gray-800 card shadow-xl col-span-1" :class="state  >= 4 ?  '': 'blur-sm'">
                <h2 class="card-title">5# Set Time Event</h2>
                <p>Set your mint event time</p>
                <div class="flex flex-col gap-2">
                    <input type="date" placeholder="Start Date" class="  w-full input " />
                    <input type="date" placeholder="End Date" class="  w-full input " />
                </div>
                <div class="card-actions justify-end mt-2" v-if="state == 4">
                    <button class="btn btn-success " @click="setTimeEvent">LFG !...</button>
                </div>
            </div>
            <div class="p-4  bg-gray-800 card shadow-xl col-span-2" :class="state  >= 5 ?  '': 'blur-sm'">
                <h2 class="card-title">Manage Your Token</h2>
                <p>Set your mint event time</p>
                <div class="flex flex-col gap-2">
                    <button class="btn btn-error  w-full">Cancel Event</button>

                    <button class="btn btn-warning  w-full">Start Distrubution</button>
                    <button class="btn btn-success  w-full">Create AMM</button>
                    <button class="btn btn-primary  w-full">Request LP Tokens</button>
                    <button class="btn btn-primary  w-full">Change mint authority</button>

                </div>



            </div>
        </div>
    </div>
</template>
