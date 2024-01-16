<template>
    <div class="d-flex justify-content-around my-3 ">
        <h1 class="text-center">新北市 TDX上傳平台</h1>
    </div>
    <div class="container">
        <ul class="nav nav-tabs my-2" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <router-link to="carParks" class="td-n">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" type="button"
                        role="tab" aria-controls="home" aria-selected="true">路外停車場資料
                    </button>
                </router-link>
            </li>
        </ul>
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
            stationList: [
                {
                    stationId: 396,
                    stationName: "正心"
                },
                {
                    stationId: 432,
                    stationName: "萬華西園"
                }
            ],
            stationId: "",
            result: []
        }
    },
    methods: {
        save() {
            console.log(this.stationId);
        }
    },
    components: {
        RouterView,
        RouterLink,
    },
}
</script>