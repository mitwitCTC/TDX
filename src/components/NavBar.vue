<template>
    <div class="my-3">
        <h1 class="text-center">新北市 TDX上傳平台</h1>
    </div>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<style>
.td-n {
    text-decoration: none;
}
</style>
<script>
import { RouterLink, RouterView } from 'vue-router';
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        RouterView,
        RouterLink,
    },
}
</script>