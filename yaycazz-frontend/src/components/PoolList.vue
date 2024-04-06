<script setup>
import { onMounted, ref } from 'vue';
import { useWorkspace } from '../libs/useWorkspace';
import ListPDA from '../components/ListPDA.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

onMounted(() => {

});
const { program, handlePoolPDA, wallet, fetchPoolData, handleRegisterPDA, fetchRegisterData, fetchPoolDataAll } = useWorkspace();

const formatThePubkey = (pubkey) => {
  return `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`;
};
const data = ref(null);

onMounted(() => {
  poolData();
});

const poolData = async () => {
  const response = await fetchPoolDataAll();
  data.value = response;
}




</script>

<template>
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

    <div class="overflow-x-auto mt-3">
      <div v-for="(item) in data" class="p-4">
        <ListPDA :item="item" />

      </div>

    </div>
  </div>

</template>
