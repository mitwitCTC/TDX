<script>
import router from '../router';
import { API } from '../App.vue';
import NavBar from '../components/NavBar.vue';
import * as bootstrap from "bootstrap";

export default {
  data() {
    return {
      CompanyId: null,
      stations: [
        {
          CompanyId: "",
          CarParkID: "",
          Zh_tw: "",
        },
      ],
      formTypes: [
        {
          id: "",
          type: "CarParkList",
          form: "路外停車場基本資料",
          hasData: false,
        },
        {
          id: "",
          type: "ParkingSpaceList",
          form: "路外停車場車位數資料",
          hasData: false,
        },
        {
          id: "",
          type: "ParkingServiceTimeList",
          form: "路外停車場營業時間資料",
          hasData: false,
        },
        // {
        //   id: "",
        //   type: "ParkingRateList",
        //   form: "路外停車場費率資料",
        //   hasData: false,
        // },
      ],
      myModal: null,
      deleteItem: "",
    };
  },
  methods: {
    decodeGlobalCompanyId() {
      // get CompanyId
      this.CompanyId = this.$store.getters.getGlobalCompanyId;
    },
    getStations() {
      const getStationsAPI = `${API}/main/search/Park`;
      this.$http
        .post(getStationsAPI, { CompanyId: this.CompanyId })
        .then((response) => {
          this.stations = response.data.data;
        });
    },
    goToCarParkList(mode, station) {
      if (mode === "create") {
        router.push(`/CarParkList/${mode}`);
      } else if (mode === "edit") {
        const CarParkID = station.CarParkID;
        router.push(`/carparks/${CarParkID}`);
      }
    },
    openDeleteForm(station) {
      this.myModal = new bootstrap.Modal(document.getElementById("myModal"));
      this.myModal.show();
      this.deleteItem = station;
      for (const item of this.formTypes) {
        try {
          const checkParkAPI = `${API}/main/search/${item.type}`;
          this.$http
            .post(checkParkAPI, {
              CompanyId: this.CompanyId,
              CarParkID: station.CarParkID,
            })
            .then((response) => {
              if (
                response.data.message == "查詢成功" &&
                response.data.data.length > 0
              ) {
                item.hasData = true;
                item.id = response.data.data[0].id;
                this.isLoading = false;
              } else {
                item.hasData = false;
                this.isLoading = false;
              }
            });
        } catch (error) {
          console.error(`Error fetching data for ${item}:`, error);
        }
      }
    },
    deleteCarParkList() {
      for (const item of this.formTypes) {
        this.deleteFormAPI = `${API}/main/delete/${item.type}/${item.id}`;
        this.$http.post(this.deleteFormAPI).then((response) => {
          if (response.data.returnCode === 0) {
            alert(`刪除成功`);
            this.getStations();
            this.myModal.hide();
          }
        });
        this.myModal.hide();
      }
    },
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
    },
  },
  components: {
    NavBar,
  },
};
</script>

<template>
  <div class="container">
    <header class="py-3">
      <NavBar></NavBar>
      <h1 class="text-center">場站列表</h1>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-info"
          @click="goToCarParkList('create')"
        >
          新增
        </button>
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
                <button
                  type="button"
                  class="btn btn-info"
                  @click="goToCarParkList('edit', station)"
                >
                  編輯
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="openDeleteForm(station)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center">
      <p>目前尚無場站資料，請新增</p>
    </div>

    <!-- Bootstrap Modal 元素，設定唯一的 ID -->
    <div
      class="modal fade"
      data-bs-backdrop="static"
      id="myModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              請確認是否刪除表單
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>即將刪除<span class="text-decoration-underline fw-bold">{{ deleteItem.Zh_tw }}</span></p>
            <p class="fw-light">
              請注意，刪除場站將會連動刪除本場次所有的表單資料！
            </p> 
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCarParkList()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
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
  cursor: default;
}
</style>
