<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="container">
      <h3 class="text-center">{{ CarParkName }}</h3>
      <table class="table table-light table-striped text-center">
        <thead>
          <tr>
            <th scope="col">內容</th>
            <th scope="col">新增 / 編輯</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in formTypes" :key="item.type">
            <td>{{ item.form }}</td>
            <td v-if="!isLoading">
              <button
                class="btn"
                :disabled="isLoading"
                :class="{
                  'btn-info': item.hasData,
                  'btn-outline-info': !item.hasData,
                }"
                @click="goToForm(item)"
              >
                {{ item.hasData ? "編輯" : "新增" }}
              </button>
            </td>
            <td v-else>
              <button class="btn btn-info" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status">
                </span>
                Loading...
              </button>
            </td>
            <td>
              <button :disabled="!item.hasData" class="btn btn-outline-danger">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import router from '../router';
import NavBar from '../components/NavBar.vue';
import { API } from '../App.vue';
export default {
  data() {
    return {
      isLoading: false,
      CompanyId: "",
      CarParkID: "",
      CarParkName: "",
      formTypes: [
        {
          type: "CarParkList",
          form: "路外停車場基本資料",
          hasData: false,
        },
        {
          type: "ParkingSpaceList",
          form: "路外停車場車位數資料",
          hasData: false,
        },
        {
          type: "ParkingServiceTimeList",
          form: "路外停車場營業時間資料",
          hasData: false,
        },
        // {
        //   type: "ParkingRateList",
        //   form: "路外停車場費率資料",
        //   hasData: false,
        // },
      ],
    };
  },
  methods: {
    decodeGlobalCompanyId() {
      // get CompanyId
      this.CompanyId = this.$store.getters.getGlobalCompanyId;
    },
    getCarParkID() {
      this.CarParkID = this.$route.params.CarParkID;
    },
    async checkPark() {
      this.isLoading = true;
      for (const item of this.formTypes) {
        try {
          const checkParkAPI = `${API}/main/search/${item.type}`;
          await this.$http
            .post(checkParkAPI, {
              CompanyId: this.CompanyId,
              CarParkID: this.CarParkID,
            })
            .then((response) => {
              if (
                response.data.message == "查詢成功" &&
                response.data.data.length > 0
              ) {
                item.hasData = true;
                this.CarParkName = response.data.data[0].Zh_tw;
                this.isLoading = false;
              }
            });
        } catch (error) {
          console.error(`Error fetching data for ${item}:`, error);
        }
      }
    },
    goToForm(item) {
      if (item.hasData == true) {
        router.push(`/${item.type}/edit/${this.CarParkID}`);
      } else {
        router.push(`/${item.type}/create/${this.CarParkID}`);
      }
    },
  },
  mounted() {
    this.decodeGlobalCompanyId();
    this.getCarParkID();
    this.checkPark();
  },
  components: {
    NavBar,
  },
};
</script>

<style></style>
