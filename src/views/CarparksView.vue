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
              <button
                :disabled="!item.hasData"
                class="btn btn-outline-danger"
                @click="openDeleteForm(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
              即將刪除
              <span class="text-decoration-underline fw-bold"
                >{{ deleteItem }}
              </span>
              ，請確認
              <p v-if="deleteItem === '路外停車場基本資料'" class="fw-light">
                請注意，刪除基本資料將會連動刪除本場次的所有表單資料！
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
                @click="deleteItemConfirmed()"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import NavBar from "../components/NavBar.vue";
import { API } from "../App.vue";
import * as bootstrap from "bootstrap";
export default {
  data() {
    return {
      isLoading: false,
      CompanyId: "",
      CarParkID: "",
      CarParkName: "",
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
      deleteItem: null,
      deleteFormAPI: "",
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
                item.id = response.data.data[0].id;
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
    goToForm(item) {
      if (item.hasData == true) {
        router.push(`/${item.type}/edit/${this.CarParkID}`);
      } else {
        router.push(`/${item.type}/create/${this.CarParkID}`);
      }
    },
    openDeleteForm(item) {
      this.myModal = new bootstrap.Modal(document.getElementById("myModal"));
      this.deleteFormAPI = `${API}/main/delete/${item.type}/${item.id}`;
      this.deleteItem = item.form;
      this.myModal.show();
    },
    deleteAll() {
      for (const item of this.formTypes) {
        if (item.hasData && item.type !== "CarParkList") {
          this.deleteFormAPI = `${API}/main/delete/${item.type}/${item.id}`;
          this.$http.post(this.deleteFormAPI).then((response) => {
            if (response.data.returnCode === 0) {
              alert(`刪除成功`);
              this.myModal.hide();
            }
          });
        }
      }
    },
    deleteItemConfirmed() {
      this.$http
        .post(this.deleteFormAPI)
        .then((response) => {
          // Check for successful response
          if (response.data.returnCode === 0) {
            if (this.deleteItem === "路外停車場基本資料") {
              this.deleteAll();
              this.$router.push({ name: "stations" });
            } else {
              this.checkPark();
            }
            this.myModal.hide();
          } else {
            console.error("Error deleting item:", response.data.errorMessage);
          }
        })
        .catch((error) => {
          console.error("Error making API request:", error);
        });
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
