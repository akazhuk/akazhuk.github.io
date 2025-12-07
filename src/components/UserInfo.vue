<script setup lang="ts">
defineProps<{
  nickname: string
  mobile: string
  email: string
  desc: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">hello world!</h1>
    <h3>
      昵称：JkTam 
    </h3>
    <h3>
      手机号：13288447064
    </h3>
    <h3>
      邮箱：511979003@qq.com
    </h3>
  </div>
  <div>
    <h3>
      你好！这是我的个人网站
    </h3>
    <h3>
    可以从下面的标签了解我的技术栈和工作经历。
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>