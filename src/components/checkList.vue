<template>
  <label for="library">選擇圖書館</label>
  <select id="library" v-model="selectedLibrary">
    <option v-for="(one, i) of  oneLibrary " :key="i" :value="one">{{ one }}</option>
  </select>
  <div v-if="getData">
    <h2>{{ selectedLibrary }}目前座位狀況：</h2>
    <ul>
      <li v-for="seat in getData" :key="seat.areaId">{{ seat.floorName }}的{{ seat.areaName }} - {{ seat.freeCount }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const selectedLibrary = ref('')
// const proxyServer = `https://seat.tpml.edu.tw/sm/service/getAllArea`;
const proxyServer = '/netlify/functions/getLibrary'; // 使用代理 URL
let branchs = ref([])
const fetchLibraryStatu = async () => {
  try {
    // const res = await axios.get(`${proxyServer}`)
    const res = await axios.get(proxyServer); // 使用代理 URL
    branchs.value = res.data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchLibraryStatu(); //initData
})


const oneLibrary = computed(() => {
  return Array.from(new Set(branchs.value.map(item => item.branchName)))
})

const getData = computed(() => {
  if (selectedLibrary.value) {
    const selectedData = branchs.value.filter(data => data.branchName === selectedLibrary.value);
    return selectedData.length > 0 ? selectedData : null;
  } else {
    return null;
  }
});
</script>