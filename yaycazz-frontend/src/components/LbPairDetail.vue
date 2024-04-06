<script setup>
import { ref } from 'vue';

import Tokenomics from '../components/Tokenomics.vue';


const tab = ref(0);
</script>
<template>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

        <div class="flex flex-col mt-4 lg:mt-10 px-4 xl:px-0">
            <div class="flex flex-col xl:flex-row xl:space-x-4 w-full">
                <div class="flex flex-col space-y-3 xl:basis-3/5">
                    <div class=" w-full">
                        <div class="flex flex-col px-6 py-7 bg-gray-800  rounded-lg shadow-mer2 leading-none w-full">
                            <div class="flex flex-col"><span class="text-black-50 text-sm font-medium">Total Value
                                    Locked</span><span class="mt-1 font-semibold text-[28px]">$6,361,268.14</span></div>
                            <div class="my-5 border-t">
                                <div class="text-black-50 text-sm font-medium mt-4">Liquidity Allocation</div>
                                <div class="flex flex-col mt-4 space-y-4">
                                    <div class="flex items-start text-sm justify-between">
                                        <div class="flex flex-row items-center space-x-4">
                                            <div class="w-6 h-6 self-start lg:self-center"><span class="relative"><img
                                                        alt="SOL" fetchpriority="high" width="32" height="32"
                                                        decoding="async" data-nimg="1" class="rounded-full"
                                                        src="https://app.meteora.ag/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=64&amp;q=75"
                                                        style="color: transparent;"></span></div>
                                            <div class="flex flex-col">
                                                <div
                                                    class="flex flex-col space-y-1 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-3">
                                                    <div class="text-sm font-semibold">SOL</div><a target="_blank"
                                                        rel="noreferrer"
                                                        class="flex justify-center items-center rounded-lg px-1.5 text-white bg-black/5 fill-current space-x-1"
                                                        href="https://xray.helius.xyz/token/So11111111111111111111111111111111111111112">
                                                        <div class="text-3xs">So11...1112</div><svg width="10"
                                                            height="10" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <line x1="10.8492" y1="13.0606" x2="19.435" y2="4.47485"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></line>
                                                            <path d="M19.7886 4.12134L20.1421 8.01042"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M19.7886 4.12134L15.8995 3.76778"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path
                                                                d="M18 13.1465V17.6465C18 19.3033 16.6569 20.6465 15 20.6465H6C4.34315 20.6465 3 19.3033 3 17.6465V8.64648C3 6.98963 4.34315 5.64648 6 5.64648H10.5"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div><span class="ml-2 text-black-75 font-normal lg:hidden">12,829.22<span
                                                class="ml-1">(42.46%)</span></span><span
                                            class="ml-2 text-black-75 font-normal hidden lg:block">12,829.216467061<span
                                                class="ml-1">(42.46%)</span></span>
                                    </div>
                                    <div class="flex items-start text-sm justify-between">
                                        <div class="flex flex-row items-center space-x-4">
                                            <div class="w-6 h-6 self-start lg:self-center"><span class="relative"><img
                                                        alt="mSOL" fetchpriority="high" width="32" height="32"
                                                        decoding="async" data-nimg="1" class="rounded-full"
                                                        src="https://yaycazz.com/yaycazz.png"
                                                        style="color: transparent;"></span></div>
                                            <div class="flex flex-col">
                                                <div
                                                    class="flex flex-col space-y-1 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-3">
                                                    <div class="text-sm font-semibold">YAY</div><a target="_blank"
                                                        rel="noreferrer"
                                                        class="flex justify-center items-center rounded-lg px-1.5 text-white bg-black/5 fill-current space-x-1"
                                                        href="https://xray.helius.xyz/token/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So">
                                                        <div class="text-3xs">mSoL...m7So</div><svg width="10"
                                                            height="10" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <line x1="10.8492" y1="13.0606" x2="19.435" y2="4.47485"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></line>
                                                            <path d="M19.7886 4.12134L20.1421 8.01042"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M19.7886 4.12134L15.8995 3.76778"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path
                                                                d="M18 13.1465V17.6465C18 19.3033 16.6569 20.6465 15 20.6465H6C4.34315 20.6465 3 19.3033 3 17.6465V8.64648C3 6.98963 4.34315 5.64648 6 5.64648H10.5"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div><span class="ml-2 text-black-75 font-normal lg:hidden">17,388.44<span
                                                class="ml-1">(57.54%)</span></span><span
                                            class="ml-2 text-black-75 font-normal hidden lg:block">17,388.444833678<span
                                                class="ml-1">(57.54%)</span></span>
                                    </div>
                                </div>
                            </div>
                            <Tokenomics />
                            <div class="flex flex-col border-t space-y-3 pt-5 py-5">
                                <div class="flex justify-between">
                                    <div class="flex items-center space-x-2"><span
                                            class="text-white text-sm font-medium">Pool Address</span></div>
                                    <div
                                        class="flex items-center space-x-1 text-white bg-black/5 px-1.5 rounded-lg text-xs">
                                        <a target="_blank"
                                            href="https://xray.helius.xyz/account/HcjZvfeSNJbNkfLD4eEcRBr96AD3w1GpmMppaeRZf7ur">HcjZ...f7ur</a><svg
                                            width="10" height="10" viewBox="0 0 10 10" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4 2V3H1.5V8.5H7V6H8V9C8 9.13261 7.94732 9.25979 7.85355 9.35355C7.75979 9.44732 7.63261 9.5 7.5 9.5H1C0.867392 9.5 0.740215 9.44732 0.646447 9.35355C0.552678 9.25979 0.5 9.13261 0.5 9V2.5C0.5 2.36739 0.552678 2.24021 0.646447 2.14645C0.740215 2.05268 0.867392 2 1 2H4ZM9.5 0.5V4.5H8.5V2.2065L4.6035 6.1035L3.8965 5.3965L7.7925 1.5H5.5V0.5H9.5Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <div class="flex items-center space-x-2"><span
                                            class="text-white text-sm font-medium">LP
                                            Mint</span></div>
                                    <div
                                        class="flex items-center space-x-1 text-white bg-black/5 px-1.5 rounded-lg text-xs">
                                        <a target="_blank"
                                            href="https://xray.helius.xyz/account/B2uEs9zjnz222hfUaUuRgesryUEYwy3JGuWe31sE9gsG">B2uE...9gsG</a><svg
                                            width="10" height="10" viewBox="0 0 10 10" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4 2V3H1.5V8.5H7V6H8V9C8 9.13261 7.94732 9.25979 7.85355 9.35355C7.75979 9.44732 7.63261 9.5 7.5 9.5H1C0.867392 9.5 0.740215 9.44732 0.646447 9.35355C0.552678 9.25979 0.5 9.13261 0.5 9V2.5C0.5 2.36739 0.552678 2.24021 0.646447 2.14645C0.740215 2.05268 0.867392 2 1 2H4ZM9.5 0.5V4.5H8.5V2.2065L4.6035 6.1035L3.8965 5.3965L7.7925 1.5H5.5V0.5H9.5Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="mt-3 lg:mt-0 flex flex-col xl:basis-2/5">

                    <div class="p-6  w-full bg-gray-800  rounded-lg shadow-mer2">
                        <div class="flex justify-between border-b">
                            <div class="flex space-x-5 lg:space-x-8 basis-3/4 overflow-x-auto">
                                <div class="cursor-pointer pb-2 lg:pb-3 font-semibold text-sm lg:text-base "
                                    :class="tab == 0 ? 'btn btn-xs btn-primary' : ''" @click="tab = 0">
                                    Deposit</div>
                                <div class="cursor-pointer pb-2 lg:pb-3 font-semibold text-sm lg:text-base "
                                    :class="tab == 2 ? 'btn btn-xs btn-primary' : ''" @click="tab = 2">
                                    Withdraw</div>
                                <div class="cursor-pointer pb-2 lg:pb-3 font-semibold text-sm lg:text-base "
                                    :class="tab == 1 ? 'btn btn-xs btn-primary' : ''" @click="tab = 1">
                                    Swap</div>
                            </div>
                        </div>
                        <form class="mt-6 text-sm lg:text-base" v-if="tab == 0">
                            <div
                                class="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between lg:mb-5">
                                <div class="text-base text-black-75 font-medium mt-4 lg:mt-0">Enter deposit amount</div>

                            </div>
                            <input type="text" placeholder="Token A" class="input input-bordered w-full  " />
                            <input type="text" placeholder="Token B" class="input input-bordered w-full mt-2  " />


                            <div class="flex flex-col space-y-3 mt-6">
                                <a class="w-full btn btn-info"><span class="text-white font-semibold">Deposit</span>
                                </a>
                            </div>
                        </form>
                        <form class="mt-6 text-sm lg:text-base " v-if="tab == 1">
                            <form class="mt-6 flex flex-col">
                                <input type="text" placeholder="Token A" class="input input-bordered w-full  " />

                                <div class="flex my-7 h-px bg-mer2-border-2 relative"><button type="button"
                                        class="absolute w-8 h-8  flex items-center justify-center rounded-full -translate-y-1/2 left-1/2 -translate-x-1/2">Change</button>
                                </div>
                                <input type="text" placeholder="Token B" class="input input-bordered w-full  " />
                            </form>

                            <div class="flex flex-col space-y-3 mt-6">
                                <a class="w-full btn btn-info"><span class="text-white font-semibold">Swap</span> </a>
                            </div>
                        </form>
                        <form class="mt-6 text-sm lg:text-base " v-if="tab == 2">
                            <div
                                class="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between lg:mb-5">
                                <div class="text-base text-black-75 font-medium mt-4 lg:mt-0">Enter withdraw amount
                                </div>

                            </div>
                            <input type="text" placeholder="LP token" class="input input-bordered w-full  " />




                            <div class="flex flex-col space-y-3 mt-6">
                                <a class="w-full btn btn-info"><span class="text-white font-semibold">Withdraw</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>