<script setup lang="ts">

import WelcomeItem from "@/components/WelcomeItem.vue";
import 'primeicons/primeicons.css'

import { onMounted, ref } from 'vue'
import axios from "axios";  // 引入 Store

const serverDevSkills = ref();
const clientDevSkills = ref();
const databaseSkills = ref();
const nosqlSkills = ref();
const serverSkills = ref();
const desc = ref();

// 在组件挂载后解析参数（确保路由已加载）
onMounted(async () => {
//   try {
//     const response = await axios.get(import.meta.env.VITE_BASE_URL + '/api/skills');
//     console.log('response: ', response);
//     serverDevSkills.value = response.data.server_dev_skills;
//     clientDevSkills.value = response.data.client_dev_skills;
//     databaseSkills.value = response.data.database_skills;
//     nosqlSkills.value = response.data.nosql_skills;
//     serverSkills.value = response.data.server_skills;
//     desc.value = response.data.desc;

//   } catch (error) {
//     console.log('Erro fetching data: ', error);
//   }
})

</script>

<template>
  <main>
    <WelcomeItem>
      <template #icon>
        <i class="pi pi-cog pi-spin" style="font-size: 2rem"></i>
      </template>
      <template #heading>后端技术栈</template>
      <!-- <h2>{{ serverDevSkills}}</h2> -->
       <h2>php7.4, thinkphp6, laravel</h2>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="pi pi-sparkles" style="font-size: 2rem"></i>
      </template>
      <template #heading>前端技术栈</template>
      <!-- <h2>{{ clientDevSkills }}</h2> -->
       <h2>html, js, css, vue</h2>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="pi pi-database" style="font-size: 2rem"></i>
      </template>
      <template #heading>数据库</template>
      <!-- <h2>{{ databaseSkills }}</h2> -->
      <h2>mysql, sqlite</h2>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </template>
      <template #heading>缓存技术</template>
      <!-- <h2>{{ nosqlSkills }}</h2> -->
      <h2>redis</h2>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="pi pi-server" style="font-size: 2rem"></i>
      </template>
      <template #heading>服务器</template>
      <!-- <h2>{{ serverSkills }}</h2> -->
      <h2>nginx, linux, centos</h2>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <i class="pi pi-align-justify" style="font-size: 2rem"></i>
      </template>
      <template #heading>其他</template>
      <!-- <h2>{{ desc }}</h2> -->
      <h2>遵循 PSR 代码规范，熟悉RESTful API。代码管理工具：git、svn。熟悉思维导图设计</h2>
    </WelcomeItem>
  </main>

</template>
