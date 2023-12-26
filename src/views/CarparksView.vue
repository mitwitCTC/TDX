<template>
  <div class="container d-flex row">
    <div class="sideBar col-4">
      <div class="d-flex align-items-start">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
            type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">路外停車場基本資料</button>
          <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile"
            type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">路外停車場車位數資料</button>
          <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages"
            type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">路外停車場營業時間資料</button>
        </div>
      </div>
    </div>
    <div class="content col-8">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
          <CarParkList></CarParkList>
        </div>
        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          <ParkingSpaceList></ParkingSpaceList>
        </div>
        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          <ParkingServiceTimeList></ParkingServiceTimeList>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import router from '../router';
import CarParkList from '../views/CarParks/CarParkList.vue';
import ParkingSpaceList from '../views/CarParks/ParkingSpaceList.vue';
import ParkingServiceTimeList from '../views/CarParks/ParkingServiceTimeList.vue';

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
    CarParkList,
    ParkingSpaceList,
    ParkingServiceTimeList
  },
}
</script>

<style></style>
