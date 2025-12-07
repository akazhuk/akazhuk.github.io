<template>
  <main>
    <!-- 方式1：直接用a标签（最简，推荐） -->
  <a 
    href="/file/谭柱坤-简历.pdf" 
    download="谭柱坤简历.pdf" 
    class="download-btn"
  >
    下载简历附件
  </a>
  </main>
</template>

<style scoped>
.download-btn {
  padding: 8px 16px;
  background-color: #8B4513; /* 咖啡棕，可替换为你的配色 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none; /* a标签去掉下划线 */
}
.download-btn:hover {
  background-color: #A8643C; /* 摩卡棕，hover变色 */
}
</style>
