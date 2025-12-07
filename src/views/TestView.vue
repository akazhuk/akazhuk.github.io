<template>
  <div class="test">
    <h1>这是Test页面：{{ msg }}</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";

const msg = ref("请求跨域了！")
onMounted(async() => {
  try{
    const response = await axios.get(import.meta.env.VITE_BASE_URL+'/api/index');
    // const response = await axios.get('http://127.0.0.1:8000/api.test/index');
    console.log('response: ', response);
    msg.value = response.data.msg;
  }catch(error){
    console.log('Erro fetching data: ', error);
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .test {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
