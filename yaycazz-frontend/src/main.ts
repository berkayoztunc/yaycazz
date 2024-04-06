import { createApp } from 'vue'
import App from './App.vue'
import SolanaWallets from "solana-wallets-vue";
import * as VueRouter from 'vue-router'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
// You can either import the default styles or create your own.
import './style.css'
import "preline/preline";

import { inject } from '@vercel/analytics';
inject();

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
};




const Home = () => import('./components/Home.vue');


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/create-pool', component: () => import('./components/Create.vue') },
  { path : '/road', component: () => import('./components/Mission.vue') },
  { path: '/event-list', component: () => import('./components/PoolList.vue') },
  { path: '/event/:id', component: () => import('./components/PoolDetail.vue') },
  { path: '/pair-list', component: () => import('./components/LbPairList.vue') },
  { path: '/pair/:id', component: () => import('./components/LbPairDetail.vue') },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

createApp(App).use(SolanaWallets, walletOptions).use(router).component('EasyDataTable', Vue3EasyDataTable).mount("#app");
