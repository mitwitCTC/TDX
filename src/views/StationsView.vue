<script>
import { RouterLink, RouterView } from 'vue-router';
import router from '../router';
import SecureLS from 'secure-ls';
import { API } from '../App.vue';
import NavBar from '../components/NavBar.vue';

const ls = new SecureLS({
  isCompression: false,
  encryptionSecret: 'your-secret-key',
  encryptionNamespace: 'your-namespace'
});

export default {
  data() {
    return {
      CompanyId: null,
      stations: [
        {
          CompanyId: "",
          CarParkID: "",
          Zh_tw: ""
        }
      ],
    }
  },
  methods: {
    decodeGlobalCompanyId() {
      // get CompanyId
      this.CompanyId = this.$store.getters.getGlobalCompanyId;
    },
    getStations() {
      const getStationsAPI = `${API}/main/search/Park`;
      this.$http
        .post(getStationsAPI, { "CompanyId": this.CompanyId })
        .then((response) => {
          this.stations = response.data.data
        })
    },
    goToCarParkList(mode, station) {
      if (mode === 'create') {
        router.push(`/CarParkList/${mode}`);
      } else if (mode === 'edit') {
        const CarParkID = station.CarParkID;
        router.push(`/carparks/${CarParkID}`);
      }
    },
    deleteCarParkList(station){
      console.log(station);
    }
  },
  mounted() {
    this.getStations();
  },
  created() {
    this.decodeGlobalCompanyId();
  },
  computed: {
    GlobalCompanyId() {
      return this.$store.getters.getGlobalCompanyId;
    }
  },
  components: {
    RouterView,
    RouterLink,
    NavBar
  },
}
</script>

<template>
  <div class="container">
    <header class="py-3">
      <NavBar></NavBar>
      <h1 class="text-center">場站列表</h1>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-info" @click="goToCarParkList('create')">新增</button>
      </div>
    </header>

    <div v-if="stations.length" class="table-container">
      <div class="scrollable-table">
        <table class="table table-light table-striped text-center">
          <thead>
            <tr>
              <th scope="col">場站名稱</th>
              <th scope="col">編輯</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(station, index) in stations" :key="index">
              <th>{{ station.Zh_tw }}</th>
              <td>
                  <button type="button" class="btn btn-info" @click="goToCarParkList('edit', station)">編輯</button>
              </td>
              <td><button type="button" class="btn btn-outline-danger" @click="deleteCarParkList(station)">刪除</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center">
      <p>目前尚無場站資料，請新增</p>
    </div>
  </div>
</template>

<style>
/* Custom styles for the scrollable table */
.scrollable-table {
  overflow-x: auto;
  white-space: nowrap;
  /* 確保內容不換行 */
}

/* Optional: Set a specific width for the table */
.table-container {
  max-width: 100%;
  /* 設定表格最大寬度 */
}

thead tr {
  cursor: default
}
</style>
