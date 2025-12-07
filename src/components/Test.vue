<template>
    <div>
        姓名：<input v-model="userName" />{{ userName }}
        薪水：<input v-model="salary" type="number"/>{{ salary }}
    </div>
</template>

<script lang="ts">
export default{
    data() {
        return {
            userName:"test",
            salary:12345
        }
    }
}
</script>

<style>

</style>
