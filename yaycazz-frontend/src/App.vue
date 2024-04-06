<script setup>
import { WalletMultiButton } from "solana-wallets-vue";

import { initWorkspace } from "./libs/useWorkspace";
initWorkspace();


</script>

<template>
  <!-- Announcement Banner -->
  <div class="bg-gradient-to-r from-purple-600 to-blue-400">
    <div class="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
      <!-- Grid -->
      <div class="grid justify-center  gap-2">
        

        <div class="flex items-center">
          <a class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg font-medium text-white hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm"
            href="#">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch demo
          </a>
          <span class="inline-block border-e border-white/[.3] w-px h-5 mx-2"></span>
          <a class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg font-medium text-white hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm"
            href="#">
            we are ready for the hackaton
          </a>
        </div>
        <!-- End Col -->
      </div>
      <!-- End Grid -->
    </div>
  </div>
  <!-- End Announcement Banner -->
  <div class="">


    <div class="container mx-auto mt-2 navbar bg-base-100 p-0 m-0">
      <div class="flex-1">
        <img src="/white-logo.png" class="h-16" alt="">
        <RouterLink to="/"><a class="pl-2 text-xl font-bold text-white">YayCazz</a></RouterLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal text-white font-bold hidden md:flex p-0">
          <li class="justify-evenly">
            <RouterLink to="/road">Road</RouterLink>
          </li>
          <li class="justify-evenly">
            <RouterLink to="/event-list">Event List</RouterLink>
          </li>
          <li class="justify-evenly">
            <RouterLink to="/pair-list">Pool List</RouterLink>
          </li>
          <li class="justify-evenly">
            <RouterLink to="/create-pool">Create Fair Launch</RouterLink>
          </li>
          <li class="justify-evenly">
            <WalletMultiButton />
          </li>
        </ul>
      </div>
      <details class="dropdown dropdown-end flex md:hidden">
        <summary class="m-1 btn">Menu</summary>
        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <RouterLink to="/road">Road</RouterLink>
          </li>
          <li>
            <RouterLink to="/event-list">Event List</RouterLink>
          </li>
          <li>
            <RouterLink to="/pair-list">Pool List</RouterLink>
          </li>
          <li>
            <RouterLink to="/create-pool">Create Fair Launch</RouterLink>
          </li>
          <li>
            <WalletMultiButton />

          </li>
        </ul>
      </details>
    </div>
    <RouterView />

  </div>

  <!-- ========== END FOOTER ========== -->
</template>
