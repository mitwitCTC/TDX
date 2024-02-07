<script>
import { RouterLink, RouterView } from 'vue-router'
import store from './store';
export const API = 'https://8e84-122-116-23-30.ngrok-free.app';
export default {
  data() {
    return {
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="bg-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.bg-full {
  background-image: linear-gradient(80deg, #84fab0 0%, #8fd3f4 100%);
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>