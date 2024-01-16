<template>
    <div>
        路外停車場車位數資料
    </div>
    <VForm v-slot="{ meta, handleSubmit }" @submit="sendParkingSpace()">
        <div class="mb-3 d-flex flex-column">
            <label for="CarParkID" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                業管機關訂定之停車場代碼
                <span class="text-danger">*</span>
            </label>
            <div id="CarParkIDHelp" class="form-text">
                <p>該停車場代表編號<br>
                    <span>
                        ※如果為私有停車場自行提供的停車場資料，CarParkID 代碼編碼方式，建議如下：<br>
                        <span class="text-danger">"公司統一編號" + "-"+ {3碼流水號}</span><br>
                        主要是為了避免與各業管機關上傳之停車場代碼重複。<br>
                        例：28412550-001
                    </span>
                </p>
            </div>
            <VField name="停車場代碼" id="CarParkID" v-model="ParkingSpace.CarParkID" type="text" rules="required" disabled />
            <ErrorMessage class="text-danger" name="停車場代碼" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="CarParkName" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場中文名稱
                <span class="text-danger">*</span>
            </label>
            <div id="CarParkNameHelp" class="form-text">
                <p>
                    範例值: 板橋大遠百購物中心停車場
                </p>
            </div>
            <VField name="停車場中文名稱" id="CarParkName" v-model="ParkingSpace.CarParkName" type="text" rules="required"
                disabled />
            <ErrorMessage class="text-danger" name="停車場中文名稱" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="CarParkName" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場英文名稱 (選填)
            </label>
            <VField name="停車場英文名稱" id="CarParkName" v-model="ParkingSpace.En" type="text" disabled />
            <ErrorMessage class="text-danger" name="停車場英文名稱" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="TotalSpaces" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車位總數
                <span class="text-danger">*</span>
            </label>
            <div id="TotalSpacesHelp" class="form-text">
                <p>
                    單位:車位數<br>
                    <span>請以半形數字填寫</span>
                </p>
            </div>
            <VField name="停車位總數" id="TotalSpaces" v-model="ParkingSpace.TotalSpaces" type="number" rules="required" />
            <ErrorMessage class="text-danger" name="停車位總數" />
        </div>

        <!-- ParkingAreas -->
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有分停車場區域
                <span class="text-danger">*</span>
            </label>
            <div id="hasParkingAreasHelp" class="form-text">
                <p>
                    可包絡多筆<br>
                    停車場區域可為平面位置上的區分多個停車場區域，亦可能是立體不同樓層的區分停車場區域
                </p>
            </div>
            <div class="text-danger" v-if="hasParkingAreas == null">是否有分停車場區域 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="true" v-model="hasParkingAreas" /> 是

                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="false" v-model="hasParkingAreas" /> 否
                </label>
            </div>
        </div>


        <div class="ParkingAreas" v-if="hasParkingAreas == 'true'">
            <h2 class="text-center">停車場區域資料</h2>
            <VForm v-slot="{ meta, handleSubmit }" @submit="sendParkingArea(index)">
                <div v-for="(ParkingArea, index) in ParkingAreas" :key="index">
                    <hr>
                    <div class="mb-3 d-flex flex-column">
                        <label for="ParkingAreaID" class="form-label">
                            <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                            停車場區域代碼
                            <span class="text-danger">*</span>
                        </label>
                        <div id="ParkingAreaIDHelp" class="form-text">
                            <p>停車場區域代碼<br>
                                <span>
                                    停車場區域可為平面位置上的區分多個停車場區域，亦可能是立體不同樓層的區分停車場區域
                                </span>
                            </p>
                        </div>
                        <VField :id="'ParkingAreaID_' + index" v-model="ParkingArea.ParkingAreaID" type="text"
                            :rules="{ required: true }" :name="'停車場區域代碼_' + index" />
                        <ErrorMessage :name="'停車場區域代碼_' + index" class="text-danger" />
                    </div>
                    <div class="mb-3 d-flex flex-column">
                        <label>
                            <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                            停車位類型
                            <span class="text-danger">*</span>
                        </label>
                        <div id="SpaceTypeHelp" class="form-text">
                            <p>停車位類型 </p>
                        </div>
                        <div class="text-danger" v-if="ParkingArea.SpaceType == ''">停車位類型 為必填</div>
                        <label class="preLine" v-for="(type) in SpaceTypes" :key="type.SpaceType">
                            <input class="me-1 my-2" type="radio" :value="type.SpaceType" v-model="ParkingArea.SpaceType"
                                rules="required" />
                            {{ type.typeDesc }}
                        </label>
                    </div>
                    <div class="mb-3 d-flex flex-column">
                        <label>
                            <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                            是否為機械車位
                            <span class="text-danger">*</span>
                        </label>
                        <div id="IsMechanicalHelp" class="form-text">
                            <p>是否為機械車位 </p>
                        </div>
                        <div class="text-danger" v-if="ParkingArea.IsMechanical == ''">是否為機械車位 為必填</div>
                        <div class="d-flex">
                            <label>
                                <input class="me-1" type="radio" value="1" v-model="ParkingArea.IsMechanical" /> 是
                            </label>
                            <label class="ms-1">
                                <input class="me-1" type="radio" value="0" v-model="ParkingArea.IsMechanical" /> 否
                            </label>
                        </div>
                    </div>
                    <div class="mb-3 d-flex flex-column">
                        <label>
                            <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                            是否附屬充電樁
                            <span class="text-danger">*</span>
                        </label>
                        <div id="HasChargingPointHelp" class="form-text">
                            <p>是否附屬充電樁 </p>
                        </div>
                        <div class="text-danger" v-if="ParkingArea.HasChargingPoint == ''">是否附屬充電樁 為必填</div>
                        <div class="d-flex">
                            <label>
                                <input class="me-1" type="radio" value="1" v-model="ParkingArea.HasChargingPoint" /> 是
                            </label>
                            <label class="ms-1">
                                <input class="me-1" type="radio" value="0" v-model="ParkingArea.HasChargingPoint" /> 否
                            </label>
                        </div>
                    </div>
                    <div class="mb-3 d-flex flex-column">
                        <label for="ParkingAreaID" class="form-label">
                            <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                            本區停車位數
                            <span class="text-danger">*</span>
                        </label>
                        <div id="NumberOfSpacesHelp" class="form-text">
                            <p>停車位數<br>
                                <span>
                                    單位：車位數 <br>
                                    (請以半形數字填寫)
                                </span>
                            </p>
                        </div>
                        <VField :id="'NumberOfSpaces_' + index" v-model="ParkingArea.NumberOfSpaces" type="text"
                            :rules="{ required: true }" :name="'本區停車位數_' + index" />
                        <ErrorMessage :name="'本區停車位數_' + index" class="text-danger" />
                    </div>
                    <div class="mb-3 d-flex flex-column">
                        <label>
                            <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                            停車停留類型
                            <span class="text-danger">*</span>
                        </label>
                        <div id="StayTypeHelp" class="form-text">
                            <p>停車停留類型 </p>
                        </div>
                        <div class="text-danger" v-if="ParkingArea.StayType == ''">停車停留類型 為必填</div>
                        <label v-for="(type) in StayTypes" :key="type.StayType">
                            <input class="me-1" type="radio" :value="type.StayType" v-model="ParkingArea.StayType"
                                rules="required" />
                            {{ type.typeDesc }}
                        </label>
                    </div>

                    <p class="text-warning bg-dark">
                        完成每筆區域資料後，<br>
                        請點擊<u><b>儲存區域資料</b></u>按鈕以保存
                    </p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-outline-danger" @click.prevent="removeParkingArea(index)">
                            移除第 {{ index + 1 }} 筆資料
                        </button>
                        <button :disabled="!meta.valid" class="btn btn-primary" @click.prevent="sendParkingArea(index)">
                            儲存區域資料
                        </button>
                    </div>
                </div>
            </VForm>
            <button class="btn btn-outline-primary mt-2" @click.prevent="addParkingArea()">加入停車場區域資料</button>
        </div>
        <!-- ParkingAreas end -->

        <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
            儲存
        </button>
    </VForm>
</template>

<script>
export default {
    data() {
        return {
            ParkingSpace: {
                CarParkID: "28412550-001",
                CarParkName: "板橋大遠百購物中心停車場",
                En: "ban",
                TotalSpaces: "",
            },
            hasParkingAreas: null,
            ParkingAreas: [
                {
                    CompanyId: "",
                    CarParkID: "",
                    ParkingAreaID: "",
                    SpaceType: "",
                    IsMechanical: "0", // 否(平面車位) (預設)
                    HasChargingPoint: "0", // 否(預設)
                    NumberOfSpaces: "",
                    SpaceType: "",
                    IsMechanical: "0", // 否(平面車位) (預設)
                    HasChargingPoint: "0", // 0：否(預設)
                    NumberOfSpaces: "",
                    StayType: ""
                }
            ],
            SpaceTypes: [
                {
                    SpaceType: "1",
                    typeDesc: "All 所有停車位類型"
                },
                {
                    SpaceType: "2",
                    typeDesc: "Car/Automobile 自小客車位"
                },
                {
                    SpaceType: "3",
                    typeDesc: "Heavy Motorcycle 重型機車位"
                },
                {
                    SpaceType: "4",
                    typeDesc: "Bicycle 腳踏車位"
                },
                {
                    SpaceType: "5",
                    typeDesc: "Bus & Truck Container 大型車位-大巴士/大貨車/聯結車"
                },
                {
                    SpaceType: "6",
                    typeDesc: "MiniBus 小型巴士位"
                },
                {
                    SpaceType: "7",
                    typeDesc: "PregnantAndChild 孕婦及親子專用車位"
                },
                {
                    SpaceType: "8",
                    typeDesc: "Lady 婦女車位"
                },
                {
                    SpaceType: "9",
                    typeDesc: "DisabledParkingForCar 身心障礙汽車車位"
                },
                {
                    SpaceType: "10",
                    typeDesc: "DisabledParkingForScooter 身心障礙機車車位"
                },
                {
                    SpaceType: "11",
                    typeDesc: "EVRecgargeForCar 電動汽車車位"
                },
                {
                    SpaceType: "12",
                    typeDesc: "EVRechargeForScooter 電動機車車位"
                },
                {
                    SpaceType: "13",
                    typeDesc: "RehabilitationBus 復康巴士"
                },
                {
                    SpaceType: "14",
                    typeDesc: "MonthlyRentForScooter 月租機車位"
                },
                {
                    SpaceType: "15",
                    typeDesc: "MonthlyRentForCar 月租汽車位"
                },
                {
                    SpaceType: "16",
                    typeDesc: "QuarterlyRentForScooter 季租機車位"
                },
                {
                    SpaceType: "17",
                    typeDesc: "QuarterlyRentForCar 季租汽車位"
                },
                {
                    SpaceType: "18",
                    typeDesc: "SemiAnnualRentForScooter 半年租機車位"
                },
                {
                    SpaceType: "19",
                    typeDesc: "SemiAnnualRentForCar 半年租汽車位"
                },
                {
                    SpaceType: "20",
                    typeDesc: "AnnualRentForScooter 年租機車位"
                },
                {
                    SpaceType: "21",
                    typeDesc: "AnnualRentForCar 年租汽車位"
                },
                {
                    SpaceType: "22",
                    typeDesc: "RentForScooter 租賃機車位"
                },
                {
                    SpaceType: "23",
                    typeDesc: "RentForCar 租賃汽車位"
                },
                {
                    SpaceType: "24",
                    typeDesc: "Load/UnloadArea 卸貨車位"
                },
                {
                    SpaceType: "25",
                    typeDesc: "Taxi 計程車位"
                },
                {
                    SpaceType: "26",
                    typeDesc: "NightSafety 夜間安心停車位"
                },
                {
                    SpaceType: "27",
                    typeDesc: "TemporaryParking 臨時停車"
                },
                {
                    SpaceType: "28",
                    typeDesc: "ReservedParking 專用停車"
                },
                {
                    SpaceType: "29",
                    typeDesc: "ParkingReservation 預約停車"
                },
                {
                    SpaceType: "254",
                    typeDesc: "Other 其他"
                },
                {
                    SpaceType: "255",
                    typeDesc: "Unknown 未知"
                },
            ],
            StayTypes: [
                {
                    StayType: "1",
                    typeDesc: "KissAndRide(臨停接送)"
                },
                {
                    StayType: "2",
                    typeDesc: "ShortStay(短時間停車)"
                },
                {
                    StayType: "3",
                    typeDesc: "LongStay(長時間停車)"
                },
                {
                    StayType: "4",
                    typeDesc: "Unlimited(無限制停放)"
                },
                {
                    StayType: "5",
                    typeDesc: "Rent(租賃，包含月租、季租、年租等)"
                },
                {
                    StayType: "254",
                    typeDesc: "Other(其他)"
                },
                {
                    StayType: "255",
                    typeDesc: "Unknown(未知)"
                },
            ]
        }
    },
    methods: {
        sendParkingSpace() {
            console.log(this.ParkingSpace);
        },
        addParkingArea() {
            const newArea = {
                ParkingAreaID: "",
                SpaceType: "",
                IsMechanical: "0", // 否(平面車位) (預設)
                HasChargingPoint: "0", // 否(預設)
                NumberOfSpaces: "",
                SpaceType: "",
                IsMechanical: "0", // 否(平面車位) (預設)
                HasChargingPoint: "0", // 0：否(預設)
                NumberOfSpaces: "",
                StayType: ""
            };
            this.ParkingAreas.push(newArea);
        },
        removeParkingArea(index) {
            this.ParkingAreas.splice(index, 1);
        },
        sendParkingArea(index) {
            this.ParkingAreas[index].CarParkID = this.ParkingSpace.CarParkID;
            console.log(this.ParkingAreas[index]);
        },
    }
}
</script>

<style>
.ParkingAreas {
    border: 2px solid deepskyblue;
    padding: 10px;
    margin: 10px 0;
    min-width: fit-content
}
</style>