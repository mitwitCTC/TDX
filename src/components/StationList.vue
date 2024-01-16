<script>
import { RouterLink, RouterView } from 'vue-router';
// import router from '../router';
export default {
  components: {
    RouterView,
    RouterLink,
  },
}
</script>

<template>
  <h1>場站列表</h1>
  <router-link :to="'/carParks'">carParks</router-link>
</template>

<style></style>
