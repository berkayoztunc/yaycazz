<script setup >
import { onMounted, ref } from 'vue';
import { useWorkspace } from '../libs/useWorkspace';
import LbPairCard from '../components/LbPairCard.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

onMounted(() => {
   
});
// const { program, handlePoolPDA, wallet ,fetchPoolData,handleRegisterPDA,fetchRegisterData,fetchPoolDataAll} = useWorkspace();

// const formatThePubkey = (pubkey) => {
//   return `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`;
// };
const data = ref([1,2,3,4,5,6,7,8]);

// onMounted(() => {
//   poolData();
// });

// const poolData = async () => {
//   const response = await fetchPoolDataAll();
//   data.value = response;
// }




</script>

<template>
    <div class="max-w-[85rem] py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

  <div class="overflow-x-auto">
    <div class="p-4">
      <input type="text" placeholder="symbol, mint, name" class="input input-bordered w-full input" />
    </div>

    <div  class="grid grid-cols-4 gap-3">
      <LbPairCard v-for="(item) in data" :item="item" />
    </div>
    
  </div>
</div>

</template>

