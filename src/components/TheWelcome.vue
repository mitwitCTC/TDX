<script>
import { RouterLink, RouterView } from 'vue-router';
import router from '../router';
export default {
  data() {
    return {
    }
  },
  methods: {
    login() {
      const GlobalCompanyId = '2';
      alert("登入成功～");
      // save CompanyId in Vuex Store
      this.$store.commit('setGlobalCompanyId', GlobalCompanyId);
      this.$router.push({ name: 'stations' });
    }
  },
  components: {
    RouterView,
    RouterLink,
  },
}
</script>

<template>
  <div class="container">
    <h1 class="py-3 text-center">新北市 TDX上傳平台</h1>
    <button class="btn btn-primary" @click="login">登入</button>
  </div>
</template>

<style></style>
