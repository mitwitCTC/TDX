<template>
  <div class="container">
    <h1 class="pt-3 text-center">
      {{ mode == "create" ? "新增" : "編輯" }}路外停車場營業時間資料
    </h1>
    <VForm v-slot="{ meta }" @submit="sendParkingServiceTimeList()">
      <div class="mb-3 d-flex flex-column">
        <label for="CarParkID" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          業管機關訂定之停車場代碼
          <span class="text-danger">*</span>
        </label>
        <div id="CarParkIDHelp" class="form-text">
          <p>
            該停車場代表編號<br />
            <span>
              ※如果為私有停車場自行提供的停車場資料，CarParkID
              代碼編碼方式，建議如下：<br />
              <span class="text-danger">"公司統一編號" + "-"+ {3碼流水號}</span><br />
              主要是為了避免與各業管機關上傳之停車場代碼重複。<br />
              例：28412550-001
            </span>
          </p>
        </div>
        <VField name="停車場代碼" id="CarParkID" v-model="ParkingServiceTimeList.CarParkID" type="text" rules="required"
          disabled />
        <ErrorMessage class="text-danger" name="停車場代碼" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="Zh_tw" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          停車場中文名稱
          <span class="text-danger">*</span>
        </label>
        <div id="Zh_twHelp" class="form-text">
          <p>範例值: 板橋大遠百購物中心停車場</p>
        </div>
        <VField name="停車場中文名稱" id="Zh_tw" v-model="ParkingServiceTimeList.Zh_tw" type="text" rules="required" disabled />
        <ErrorMessage class="text-danger" name="停車場中文名稱" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="En" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          停車場英文名稱 (選填)
        </label>
        <VField name="停車場英文名稱" id="En" v-model="ParkingServiceTimeList.En" type="text" disabled />
        <ErrorMessage class="text-danger" name="停車場英文名稱" />
      </div>

      <div class="mb-3 d-flex flex-column">
        <label for="ServiceTag" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          服務日標籤 (選填)
        </label>
        <div id="ServiceTagHelp" class="form-text">
          <p>服務日標籤，如：平日，假日，國定假日等自訂標籤名稱</p>
        </div>
        <VField name="服務日標籤" id="ServiceTag" v-model="ParkingServiceTimeList.ServiceTag" type="text" />
        <ErrorMessage class="text-danger" name="服務日標籤" />
      </div>

      <div class="mb-3 d-flex flex-column">
        <label for="ServiceDay" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          請勾選服務日
        </label>
        <div class="form-check" v-for="(day, index) in days" :key="day.day">
          <input class="form-check-input pe-3" type="checkbox" :id="day.day"
            :checked="ParkingServiceTimeList.ServiceDay[index] === '1'" v-model="ParkingServiceTimeList.ServiceDay[index]"
            @change="updateCheckboxValue(day, index)" />
          <label class="form-check-label" :for="day.day" @click="updateCheckboxValue(day, index)">
            {{ day.label }}
          </label>
        </div>
      </div>

      <div class="mb-3 d-flex flex-column">
        <label for="Zh_tw" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          時段名稱描述
          <span class="text-danger">*</span>
        </label>
        <div id="DescriptionHelp" class="form-text">
          <p>描述營業的時段</p>
        </div>
        <VField name="時段名稱描述" id="Description" v-model="ParkingServiceTimeList.Description" type="text"
          rules="required" />
        <ErrorMessage class="text-danger" name="時段名稱描述" />
      </div>

      <div class="mb-3 d-flex flex-column">
        <label for="Zh_tw" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          開始營業時間
          <span class="text-danger">*</span>
        </label>
        <VField name="開始營業時間" id="StartTime" v-model="ParkingServiceTimeList.StartTime" type="time"
          @change="validateTimeRange" rules="required" style="width: 120px;" />
        <ErrorMessage class="text-danger" name="開始營業時間" />
      </div>

      <div class="mb-3 d-flex flex-column">
        <label for="StartTime" class="form-label">
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          結束營業時間
          <span class="text-danger">*</span>
        </label>
        <VField name="結束營業時間" id="EndTime" v-model="ParkingServiceTimeList.EndTime" type="time"
          @change="validateTimeRange" rules="required" style="width: 120px;" />
        <ErrorMessage class="text-danger" name="結束營業時間" />
      </div>

      <div class="mb-3 d-flex flex-column">
        <label>
          <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon" />
          該時段是否免費
          <span class="text-danger">*</span>
        </label>
        <div class="text-danger" v-if="ParkingServiceTimeList.FreeOfCharge == ''">
          該時段是否免費 為必填
        </div>
        <div class="d-flex">
          <label>
            <input class="me-1" type="radio" value="1" v-model="ParkingServiceTimeList.FreeOfCharge" />
            是
          </label>
          <label class="ms-1">
            <input class="me-1" type="radio" value="0" v-model="ParkingServiceTimeList.FreeOfCharge" />
            否
          </label>
        </div>
      </div>

      <button class="btn btn-primary my-2" type="submit" :disabled="!meta.valid">
        儲存
      </button>
    </VForm>
  </div>
</template>

<script>
import { API } from "../../App.vue";
import router from "../../router";
export default {
  data() {
    return {
      CompanyId: "",
      CarParkID: "",
      mode: "",
      ParkingServiceTimeList: {
        CarParkID: "",
        Zh_tw: "",
        En: "",
        CityCode: "",
        ServiceTag: "",
        ServiceDay: [],
        Description: "",
        StartTime: "",
        EndTime: "",
        FreeOfCharge: "",
      },
      days: [
        { label: "星期一", day: "Monday", value: "1" },
        { label: "星期二", day: "Tuesday", value: "1" },
        { label: "星期三", day: "Wednesday", value: "1" },
        { label: "星期四", day: "Thursday", value: "1" },
        { label: "星期五", day: "Friday", value: "1" },
        { label: "星期六", day: "Saturday", value: "1" },
        { label: "星期日", day: "Sunday", value: "1" },
        { label: "國定假日", day: "NationalHolidays", value: "1" },
      ],
    };
  },
  methods: {
    decodeGlobalCompanyId() {
      // get CompanyId
      this.CarParkID = this.$route.params.CarParkID;
      this.CompanyId = this.$store.getters.getGlobalCompanyId;
      this.ParkingServiceTimeList.CarParkID = this.$route.params.CarParkID;
      this.ParkingServiceTimeList.CompanyId =
        this.$store.getters.getGlobalCompanyId;
    },
    checkMode() {
      this.getCarParkNames();
      this.mode = this.$route.params.mode;
      if (this.mode == "edit") {
        this.CarParkID = this.$route.params.CarParkID;
        this.ParkingServiceTimeList.CarParkID = this.$route.params.CarParkID;
        this.getParkingServiceTimeList();
      }
    },
    getCarParkNames() {
      const getCarParkListAPI = `${API}/main/search/CarParkList`;
      this.$http
        .post(getCarParkListAPI, {
          CompanyId: this.CompanyId,
          CarParkID: this.CarParkID,
        })
        .then((response) => {
          this.ParkingServiceTimeList.Zh_tw = response.data.data[0].Zh_tw;
          this.ParkingServiceTimeList.En = response.data.data[0].En;
          this.ParkingServiceTimeList.CityCode = response.data.data[0].CityCode;
        });
    },
    getParkingServiceTimeList() {
      const getParkingServiceTimeListAPI = `${API}/main/search/ParkingServiceTimeList`;
      this.$http
        .post(getParkingServiceTimeListAPI, {
          CompanyId: this.CompanyId,
          CarParkID: this.CarParkID,
        })
        .then((response) => {
          this.ParkingServiceTimeList = response.data.data[0];
          this.ParkingServiceTimeList.ServiceDay = response.data.data[0].ServiceDay.split(",");
        });
    },
    sendParkingServiceTimeList() {
      if (this.mode === "create") {
        const createParkingServiceTimeListAPI = `${API}/main/create/ParkingServiceTimeList`;
        this.$http
          .post(createParkingServiceTimeListAPI, this.ParkingServiceTimeList)
          .then((response) => {
            if (response.data.message == "新增成功") {
              alert("路外停車場營業時間資料 新增成功");
              router.push(`/carparks/${this.CarParkID}`);
            }
          });
      } else if (this.mode === "edit") {
        const updateParkingServiceTimeListAPI = `${API}/main/update/ParkingServiceTimeList/${this.ParkingServiceTimeList.id}`;
        this.$http
          .post(updateParkingServiceTimeListAPI, this.ParkingServiceTimeList)
          .then((response) => {
            if (response.data.message == "修改成功") {
              alert("路外停車場營業時間資料 修改成功");
              this.getParkingServiceTimeList();
              router.push(`/carparks/${this.CarParkID}`);
            }
          });
      }
    },
    updateCheckboxValue(day, index) {
      var checkbox = document.getElementById(day.day);
      var value = checkbox.checked ? "1" : "0";
      this.ParkingServiceTimeList.ServiceDay[index] = value;
    },
    validateTimeRange() {
      if (this.ParkingServiceTimeList.StartTime && this.ParkingServiceTimeList.EndTime && this.ParkingServiceTimeList.StartTime >= this.ParkingServiceTimeList.EndTime) {
        alert('結束時間不得早於或等於開始時間');
        this.ParkingServiceTimeList.StartTime = '';
        this.ParkingServiceTimeList.EndTime = '';
      }
    },
  },
  mounted() {
    this.decodeGlobalCompanyId();
    this.checkMode();
  },
};
</script>
