<template>
    <VForm v-slot="{ meta, handleSubmit }" @submit="sendCarParkList()">
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
            <VField name="停車場代碼" id="CarParkID" v-model="CarParkList.CarParkID" type="text" rules="required" />
            <ErrorMessage class="text-danger" name="停車場代碼" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="Zh_tw" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場中文名稱
                <span class="text-danger">*</span>
            </label>
            <div id="Zh_twHelp" class="form-text">
                <p>
                    範例值: 板橋大遠百購物中心停車場
                </p>
            </div>
            <VField name="停車場中文名稱" id="Zh_tw" v-model="CarParkList.Zh_tw" type="text" rules="required" />
            <ErrorMessage class="text-danger" name="停車場中文名稱" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="En" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場英文名稱 (選填)
            </label>
            <div id="EnHelp" class="form-text">
                <p>
                    範例值: mega city parking garage
                </p>
            </div>
            <VField name="停車場英文名稱" id="En" v-model="CarParkList.En" type="text" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="OperatorID" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                營運業者代碼
                <span class="text-danger">*</span>
            </label>
            <div id="OperatorIDHelp" class="form-text">
                <p>
                    由各來源自訂營運業者代碼，請填寫公司統一編號
                </p>
            </div>
            <VField name="營運業者代碼" id="OperatorID" v-model="CarParkList.OperatorID" type="number"
                rules="required|length:8" />
            <ErrorMessage class="text-danger" name="營運業者代碼" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="Description" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場綜合描述
                <span class="text-danger">*</span>
            </label>
            <div id="DescriptionHelp" class="form-text">
                <p>
                    描述該停車場更加詳細的資料<br>
                    <span>
                        如：立體式小型車 496 格(含身心障礙停車位 10 格)。
                    </span>
                </p>
            </div>
            <VField name="停車場綜合描述" id="Description" v-model="CarParkList.Description" type="text" as="textarea"
                rules="required" />
            <ErrorMessage class="text-danger" name="停車場綜合描述" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場類型
                <span class="text-danger">*</span>
            </label>
            <div id="CarParkTypeHelp" class="form-text">
                <p>立體停車塔屬標準的機械塔式停車場<br>
                    <span>
                        立體機械式屬簡易之機械式停車場
                    </span>
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.CarParkType == ''">停車場類型 為必填</div>
            <label v-for="carType in CarParkTypes" :key="carType.CarParkType">
                <input class="me-1" type="radio" :value="carType.CarParkType" v-model="CarParkList.CarParkType"
                    rules="required" />
                {{ carType.typeDesc }}
            </label>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車導引類型
                <span class="text-danger">*</span>
            </label>
            <div id="ParkingGuideTypeHelp" class="form-text">
                <p>
                    描述該停車場主要停車導引類型
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.ParkingGuideType == ''">停車場導引類型 為必填</div>
            <label v-for="ParkingGuideType in ParkingGuideTypes" :key="ParkingGuideType.ParkingGuideType">
                <input class="me-1" type="radio" :value="ParkingGuideType.ParkingGuideType"
                    v-model="CarParkList.ParkingGuideType" rules="required" />
                {{ ParkingGuideType.typeDesc }}
            </label>
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
                    <label for="ParkingAreaName" class="form-label">
                        <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                        停車場區域名稱
                        <span class="text-danger">*</span>
                    </label>
                    <div id="ParkingAreaNameHelp" class="form-text">
                        <p>停車場區域名稱<br>
                            <span>
                                如：高速公路有些服務區停車場，可能分多個停車區域
                                最簡單的是分北上停車場區域、南下停車場區域，也可分北上小型車停車廠區域、北上大型車場區域
                            </span>
                        </p>
                    </div>
                    <VField :id="'ParkingAreaName_' + index" v-model="ParkingArea.ParkingAreaName" type="text"
                        :rules="{ required: true }" :name="'停車場區域名稱_' + index" />
                    <ErrorMessage :name="'停車場區域名稱_' + index" class="text-danger" />
                </div>
                <div class="mb-3 d-flex flex-column">
                    <label>
                        <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                        停車類型
                        <span class="text-danger">*</span>
                    </label>
                    <div id="ParkingAreaParkingTypesHelp" class="form-text">
                        <p>建議至多填 3 種主要停車類型即可
                        </p>
                    </div>
                    <div v-if="ParkingArea.ParkingTypes.length <= 0" class="text-danger">停車類型 為必填</div>
                    <div v-for="(type, index) in ParkingTypes" :key="type.ParkingType">
                        <input class="me-1" :id="'parkingType_' + index + '_' + type.ParkingType" :value="type.ParkingType"
                            type="checkbox" :checked="ParkingArea.ParkingTypes.includes(type.ParkingType)"
                            @change="toggleAreaParkingType(ParkingArea, type.ParkingType)" />
                        <label :for="'parkingType_' + index + '_' + type.ParkingType">{{ type.typeDesc }}</label>
                    </div>
                    <!-- todo checkbox validation -->
                    <ErrorMessage :name="'停車類型' + index" class="text-danger" />
                </div>

                <p class="text-warning bg-dark">
                    完成每筆區域資料後，<br>
                    請點擊<u><b>儲存區域資料</b></u>按鈕以保存
                </p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-danger" @click.prevent="removeParkingArea(index)">
                        移除第 {{ index + 1 }} 筆資料
                    </button>
                    <button class="btn btn-primary" @click.prevent="sendParkingArea(index)">
                        儲存區域資料
                    </button>
                </div>
            </div>
            <button class="btn btn-outline-primary mt-2" @click.prevent="addParkingArea()">加入停車場區域資料</button>
        </div>
        <!-- ParkingAreas end -->

        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="" class="form-icon">
                停車類型
                <span class="text-danger">*</span>
            </label>
            <div id="ParkingTypesHelp" class="form-text">
                <p>
                    建議至多填 3 種主要類型即可
                </p>
            </div>
            <div v-if="CarParkList.ParkingTypes.length <= 0" class="text-danger">停車類型 為必填</div>
            <div v-for="(type, typeIndex) in ParkingTypes" :key="type.ParkingType">
                <input class="me-1" type="checkbox" :id="`parkingType_${typeIndex}`" :value="type.ParkingType"
                    :checked="ParkingTypes.includes(type.ParkingType)"
                    @change="toggleParkingType(typeIndex, type.ParkingType)" />
                <label :for="`parkingType_${typeIndex}`">
                    {{ type.typeDesc }}
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="" class="form-icon">
                停車場服務類型
                <span class="text-danger">*</span>
            </label>
            <div id="ParkingSiteTypesHelp" class="form-text">
                <p>
                    建議至多填 3 種主要類型即可
                </p>
            </div>
            <div v-if="CarParkList.ParkingSiteTypes.length <= 0" class="text-danger">停車場服務類型 為必填</div>
            <div v-for="(type, typeIndex) in ParkingSiteTypes" :key="type.ParkingSiteTypes">
                <input class="me-1" type="checkbox" :id="`ParkingSiteType_${typeIndex}`" :value="type.ParkingSiteType"
                    :checked="ParkingSiteTypes.includes(type.ParkingSiteType)"
                    @change="toggleParkingSiteTypes(typeIndex, type.ParkingSiteType)" />
                <label :for="`ParkingSiteType_${typeIndex}`">
                    {{ type.typeDesc }}
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="" class="form-icon">
                停車場收費方式
                <span class="text-danger">*</span>
            </label>
            <div id="ChargeTypesHelp" class="form-text">
                <p>
                    填列停車場主要收費方式
                </p>
            </div>
            <div v-if="this.CarParkList.ChargeTypes.length === 0" class="text-danger">停車場收費方式 為必填</div>
            <div v-for="(type, typeIndex) in ChargeTypes" :key="type.ChargeType">
                <input class="me-1" type="checkbox" :id="`ChargeType_${typeIndex}`" :value="type.ChargeType"
                    :checked="ChargeTypes.includes(type.ChargeType)" @change="toggleChargeTypes(typeIndex, type.ChargeType)"
                    :required="this.CarParkList.ChargeTypes.length === 0" />
                <label :for="`ChargeType_${typeIndex}`">
                    {{ type.typeDesc }}
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="Telephone" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場連絡電話 (選填)
            </label>
            <div id="TelephoneHelp" class="form-text">
                <p>
                    如：02-23955514
                </p>
            </div>
            <VField name="停車場連絡電話" id="Telephone" v-model="CarParkList.Telephone" type="text" />
            <ErrorMessage class="text-danger" name="停車場連絡電話" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="EmergencyPhone" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                緊急連絡電話 (選填)
            </label>
            <div id="EmergencyPhone" class="form-text">
                <p>
                    如：0912-345-678
                </p>
            </div>
            <VField name="緊急連絡電話" id="EmergencyPhone" v-model="CarParkList.EmergencyPhone" type="text" />
            <ErrorMessage class="text-danger" name="緊急連絡電話" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="PositionLat" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                位置緯度(WGS84)
                <span class="text-danger">*</span>
            </label>
            <div id="PositionLatHelp" class="form-text">
                <p>
                    坐標系統為 WGS84，如25.02516。(請填寫至小數點後五碼)
                </p>
            </div>
            <VField name="位置緯度(WGS84) " id="PositionLat" v-model="CarParkList.PositionLat" type="text" rules="required" />
            <ErrorMessage class="text-danger" name="位置緯度(WGS84) " />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="PositionLon" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                位置經度(WGS84)
                <span class="text-danger">*</span>
            </label>
            <div id="PositionLonHelp" class="form-text">
                <p>
                    該停車場所在位置代表點坐標<br>
                    坐標系統為 WGS84，如25.02516。(請填寫至小數點後五碼)
                </p>
            </div>
            <VField name="位置經度(WGS84) " id="PositionLon" v-model="CarParkList.PositionLon" type="text" rules="required" />
            <ErrorMessage class="text-danger" name="位置經度(WGS84) " />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="Email" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                電子信箱 (選填)
            </label>
            <div id="EmailHelp" class="form-text">
                <p>
                    請填寫有效的電子信箱
                </p>
            </div>
            <VField name="電子信箱 " id="Email" v-model="CarParkList.Email" type="email" />
            <ErrorMessage class="text-danger" name="電子信箱" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="Address" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場地址
                <span class="text-danger">*</span>
            </label>
            <div id="AddressHelp" class="form-text">
                <p>
                    請填寫停車場地址
                </p>
            </div>
            <VField name="停車場地址" id="Address" v-model="CarParkList.Address" type="text" rules="required" />
            <ErrorMessage class="text-danger" name="停車場地址" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="FareDescription" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                票價資訊文字描述
                <span class="text-danger">*</span>
            </label>
            <div id="FareDescriptionHelp" class="form-text">
                <p>
                    該停車場所提供各項票價詳細資訊，如：<br>
                    <span>
                        計時：20 元/時(8-18)，10 元/時(18-8)。<br>
                        每日(20-8)最高收費 50 元，全程以半小時計費。
                    </span>
                </p>
            </div>
            <VField name="票價資訊文字描述" type="text" as="textarea" id="FareDescription" v-model="CarParkList.FareDescription"
                rules="required" />
            <ErrorMessage class="text-danger" name="票價資訊文字描述" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否在營業時間外不收費
                <span class="text-danger">*</span>
            </label>
            <div id="IsFreeParkingOutOfHoursHelp" class="form-text">
                <p>
                    是否在營業時間外不收費
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.IsFreeParkingOutOfHours == ''">是否在營業時間外不收費 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.IsFreeParkingOutOfHours" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" checked="true"
                        v-model="CarParkList.IsFreeParkingOutOfHours" />
                    否(預設)
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否為公有停車場
                <span class="text-danger">*</span>
            </label>
            <div id="IsPublicHelp" class="form-text">
                <p>
                    是否為公有停車場
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.IsPublic == ''">是否為公有停車場 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.IsPublic" /> 公有停車場(預設)
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.IsPublic" /> 私人停車場
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                營運種類
                <span class="text-danger">*</span>
            </label>
            <div id="OperationTypeHelp" class="form-text">
                <p>
                    營運種類
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.OperationType == ''">營運種類 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.OperationType" /> 公辦民營
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="2" v-model="CarParkList.OperationType" /> 公辦公營
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="3" v-model="CarParkList.OperationType" /> 私有民營
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有提供動態剩餘車位資訊
                <span class="text-danger">*</span>
            </label>
            <div id="LiveOccupancyAvailableHelp" class="form-text">
                <p>
                    是否有提供動態剩餘車位資訊
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.LiveOccupancyAvailable == ''">是否有提供動態剩餘車位資訊 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.LiveOccupancyAvailable" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.LiveOccupancyAvailable" /> 否(預設)
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有電動車充電設施
                <span class="text-danger">*</span>
            </label>
            <div id="EVRechargingAvailableHelp" class="form-text">
                <p>
                    是否有電動車充電設施
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.EVRechargingAvailable == ''">是否有電動車充電設施 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.EVRechargingAvailable" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.EVRechargingAvailable" /> 否(預設)
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有提供月票服務
                <span class="text-danger">*</span>
            </label>
            <div id="MonthlyTicketAvailableHelp" class="form-text">
                <p>
                    是否有提供月票服務
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.MonthlyTicketAvailable == ''">是否有提供月票服務 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.MonthlyTicketAvailable" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.MonthlyTicketAvailable" /> 否(預設)
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有提供季票服務
                <span class="text-danger">*</span>
            </label>
            <div id="SeasonTicketAvailableHelp" class="form-text">
                <p>
                    是否有提供季票服務
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.SeasonTicketAvailable == ''">是否有提供季票服務 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.SeasonTicketAvailable" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.SeasonTicketAvailable" /> 否(預設)
                </label>
            </div>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有提供預約停車
                <span class="text-danger">*</span>
            </label>
            <div id="ReservationAvailableHelp" class="form-text">
                <p>
                    是否有提供預約停車
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.ReservationAvailable == ''">是否有提供預約停車 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.ReservationAvailable" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.ReservationAvailable" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有無障礙設施
                <span class="text-danger">*</span>
            </label>
            <div id="WheelchairAccessibleHelp" class="form-text">
                <p>
                    是否有無障礙設施
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.WheelchairAccessible == ''">是否有無障礙設施 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.WheelchairAccessible" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.WheelchairAccessible" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否允許停車過夜
                <span class="text-danger">*</span>
            </label>
            <div id="OvernightPermittedHelp" class="form-text">
                <p>
                    是否允許停車過夜
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.OvernightPermitted == ''">是否允許停車過夜 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.OvernightPermitted" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.OvernightPermitted" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有自動售票機
                <span class="text-danger">*</span>
            </label>
            <div id="TicketMachineHelp" class="form-text">
                <p>
                    是否有自動售票機
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.TicketMachine == ''">是否有自動售票機 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.TicketMachine" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.TicketMachine" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有廁所
                <span class="text-danger">*</span>
            </label>
            <div id="ToiletHelp" class="form-text">
                <p>
                    是否有廁所
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.Toilet == ''">是否有廁所 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.Toilet" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.Toilet" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有餐廳
                <span class="text-danger">*</span>
            </label>
            <div id="RestaurantHelp" class="form-text">
                <p>
                    是否有餐廳
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.Restaurant == ''">是否有餐廳 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.Restaurant" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.Restaurant" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有加油站
                <span class="text-danger">*</span>
            </label>
            <div id="GasStationHelp" class="form-text">
                <p>
                    是否有加油站
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.GasStation == ''">是否有加油站 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.GasStation" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.GasStation" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有商店
                <span class="text-danger">*</span>
            </label>
            <div id="ShopHelp" class="form-text">
                <p>
                    是否有商店
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.Shop == ''">是否有商店 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.Shop" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.Shop" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有閘口
                <span class="text-danger">*</span>
            </label>
            <div id="GatedHelp" class="form-text">
                <p>
                    是否有閘口
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.Gated == ''">是否有閘口 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.Gated" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.Gated" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有照明設施
                <span class="text-danger">*</span>
            </label>
            <div id="LightingHelp" class="form-text">
                <p>
                    是否有照明設施
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.Lighting == ''">是否有照明設施 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.Lighting" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.Lighting" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否停車安全有保障
                <span class="text-danger">*</span>
            </label>
            <div id="SecureParkingHelp" class="form-text">
                <p>
                    是否停車安全有保障<br>
                    <span>
                        停車場提供任何強化安全停車之設施或管理作為，<br>
                        如：進出口柵桿、監視器、保全/管理員...等。
                    </span>
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.SecureParking == ''">是否停車安全有保障 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.SecureParking" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.SecureParking" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有售票處
                <span class="text-danger">*</span>
            </label>
            <div id="TicketOfficeHelp" class="form-text">
                <p>
                    是否有售票處
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.TicketOffice == ''">是否有售票處 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.TicketOffice" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.TicketOffice" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否允許於停車場區域內裝卸危險物品
                <span class="text-danger">*</span>
            </label>
            <div id="ProhibitedForAnyHazardousMaterialLoadsHelp" class="form-text">
                <p>
                    是否允許於停車場區域內裝卸危險物品
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.ProhibitedForAnyHazardousMaterialLoads == ''">是否允許於停車場區域內裝卸危險物品 為必填
            </div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1"
                        v-model="CarParkList.ProhibitedForAnyHazardousMaterialLoads" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0"
                        v-model="CarParkList.ProhibitedForAnyHazardousMaterialLoads" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有管理人員
                <span class="text-danger">*</span>
            </label>
            <div id="SecurityGuardHelp" class="form-text">
                <p>
                    是否有管理人員
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.SecurityGuard == ''">是否有管理人員 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.SecurityGuard" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.SecurityGuard" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                是否有監視系統
                <span class="text-danger">*</span>
            </label>
            <div id="SupervisionHelp" class="form-text">
                <p>
                    是否有監視系統
                </p>
            </div>
            <div class="text-danger" v-if="CarParkList.Supervision == ''">是否有監視系統 為必填</div>
            <div class="d-flex">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.Supervision" /> 是
                </label>
                <label class="ms-1">
                    <input class="me-1" type="radio" value="0" v-model="CarParkList.Supervision" /> 否(預設)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label>
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                監視系統類型 (選填)
            </label>
            <div id="SupervisionTypeHelp" class="form-text">
                <p>
                    監視系統類型
                </p>
            </div>
            <div class="d-flex flex-column">
                <label>
                    <input class="me-1" type="radio" value="1" v-model="CarParkList.SupervisionType" />CCTV(預設)
                </label>
                <label>
                    <input class="me-1" type="radio" value="2" v-model="CarParkList.SupervisionType" />CCTV+IVA(Intelligent
                    Video Analytics 智慧影像分析)
                </label>
                <label>
                    <input class="me-1" type="radio" value="254" v-model="CarParkList.SupervisionType" />Other(其他)
                </label>
                <label>
                    <input class="me-1" type="radio" value="255" v-model="CarParkList.SupervisionType" />Unknown(未知)
                </label>
            </div>

        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="LandMark" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場附近的地標/地物 (選填)
            </label>
            <div id="LandMarkHelp" class="form-text">
                <p>
                    範例值：新北市政府
                </p>
            </div>
            <VField name="停車場附近的地標" id="LandMark" v-model="CarParkList.LandMark" type="text" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="BuildingName" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                停車場所在大樓名稱 (選填)
            </label>
            <div id="BuildingNameHelp" class="form-text">
                <p>
                    範例值：板橋大遠百購物中心
                </p>
            </div>
            <VField name="停車場所在大樓名稱 " id="BuildingName" v-model="CarParkList.BuildingName" type="text" />
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="City" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                所在城市
                <span class="text-danger">*</span>
            </label>
            <select v-model="CarParkList.City" @change="handleCityChange">
                <option disabled>請選擇所在城市</option>
                <option v-for="item in cities" :key="item.City" :value="item.City" selected>{{ item.City }}</option>
            </select>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="CityCode" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                所在城市簡碼
                <span class="text-danger">*</span>
            </label>
            <div id="CityCodeHelp" class="form-text">
                <p>
                    所在城市簡碼請勿自行更改
                </p>
            </div>
            <select v-model="CarParkList.CityCode">
                <option disabled>所在城市簡碼</option>
                <option disabled v-for="item in cities" :key="item.City" :value="item.CityCode" selected>{{ item.CityCode }}
                </option>
            </select>
        </div>

        <div class="mb-3 d-flex flex-column">
            <label for="TownName" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                區鄉鎮名稱
                <span class="text-danger">*</span>
            </label>
            <select v-model="CarParkList.TownName" @change="handleTownChange">
                <option disabled>請選擇區鄉鎮名稱</option>
                <option v-for="town in townOptions" :key="town" :value="town">{{ town }}</option>
            </select>
        </div>
        <div class="mb-3 d-flex flex-column">
            <label for="TownID" class="form-label">
                <img src="../../assets/images/robotic-hand.png" alt="form-icon" class="form-icon">
                區鄉鎮代碼
                <span class="text-danger">*</span>
            </label>
            <div id="TownIDHelp" class="form-text">
                <p>
                    區鄉鎮代碼請勿自行更改
                </p>
            </div>
            <select v-model="CarParkList.TownID">
                <option disabled>請選擇區鄉鎮代碼</option>
                <option disabled v-for="town in townOptions" :key="town" :value="townCodes[town]">{{ townCodes[town] }}
                </option>
            </select>
        </div>

        <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
            儲存
        </button>
    </VForm>
</template>

<script>
export default {
    data() {
        return {
            CarParkList: {
                CarParkID: "",
                Zh_tw: "",
                En: "",
                OperatorID: "",
                Description: "",
                CarParkType: [],
                ParkingGuideType: [],
                ParkingTypes: [],
                ParkingSiteTypes: [],
                ChargeTypes: [],
                Telephone: "",
                EmergencyPhone: "",
                PositionLat: "",
                PositionLon: "",
                FareDescription: "",
                IsFreeParkingOutOfHours: "0",
                IsPublic: "1",
                OperationType: "",
                LiveOccupancyAvailable: "0",
                EVRechargingAvailable: "0",
                MonthlyTicketAvailable: "0",
                SeasonTicketAvailable: "0",
                ReservationAvailable: "0",
                WheelchairAccessible: "0",
                OvernightPermitted: "0",
                TicketMachine: "0",
                Toilet: "0",
                Restaurant: "0",
                GasStation: "0",
                Shop: "0",
                Gated: "0",
                Lighting: "0",
                SecureParking: "0",
                TicketOffice: "0",
                ProhibitedForAnyHazardousMaterialLoads: "0",
                SecurityGuard: "0",
                Supervision: "0",
                SupervisionType: "1",
                LandMark: "",
                BuildingName: "",
                City: "",
                CityCode: "",
                TownName: "",
                TownID: ""
            },
            ParkingAreas: [
                {
                    CompanyId: "",
                    CarParkID: "",
                    ParkingAreaID: "",
                    ParkingAreaName: "",
                    ParkingTypes: []
                },
            ],
            hasParkingAreas: null,
            CarParkTypes: [
                {
                    CarParkType: 1,
                    typeDesc: "Surface/Open space(平面)"
                },
                {
                    CarParkType: 2,
                    typeDesc: "Multi-storey(立體)"
                },
                {
                    CarParkType: 3,
                    typeDesc: "Underground(地下)"
                },
                {
                    CarParkType: 4,
                    typeDesc: "ParkingTower(立體停車塔)"
                },
                {
                    CarParkType: 5,
                    typeDesc: "Multi-level Mechanical(立體機械式)"
                },
                {
                    CarParkType: 6,
                    typeDesc: "Mixed 混合型(同時涵蓋 2 種以上)"
                },
                {
                    CarParkType: 254,
                    typeDesc: "Other(其他);"
                },
                {
                    CarParkType: 255,
                    typeDesc: "Unknown(未知)"
                },
            ],
            ParkingGuideTypes: [
                {
                    ParkingGuideType: 1,
                    typeDesc: "Self-guides to space 自行找尋停車位(預設)"
                },
                {
                    ParkingGuideType: 2,
                    typeDesc: "Automatic Parking Guidance 有導引輔助設施協助尋找停車位"
                },
                {
                    ParkingGuideType: 3,
                    typeDesc: "Staff Guides to Space 人工導引停找車位"
                },
                {
                    ParkingGuideType: 4,
                    typeDesc: "Valet Parking 代客泊車"
                },
                {
                    ParkingGuideType: 5,
                    typeDesc: "Mixed 混合型(同時涵蓋 2 種以上)"
                },
                {
                    ParkingGuideType: 254,
                    typeDesc: "Other(其他)"
                },
                {
                    ParkingGuideType: 2255,
                    typeDesc: "Unknown(未知)"
                },
            ],
            ParkingTypes: [
                {
                    ParkingType: 1,
                    typeDesc: "Park-and-Ride 停車轉乘公共運輸"
                },
                {
                    ParkingType: 2,
                    typeDesc: "Kiss-and-Ride 臨時停車接送"
                },
                {
                    ParkingType: 3,
                    typeDesc: "Park-And-Cycle 停車後轉使用公共自行車"
                },
                {
                    ParkingType: 4,
                    typeDesc: "Park-And-Walk 停車後步行"
                },
                {
                    ParkingType: 5,
                    typeDesc: "Event Parking 活動專用停車場"
                },
                {
                    ParkingType: 6,
                    typeDesc: "Rest Area 休息站專用停車場"
                },
                {
                    ParkingType: 7,
                    typeDesc: "Service Area 服務區專用停車場"
                },
                {
                    ParkingType: 8,
                    typeDesc: "Truck & Large Vehicle Parking 貨車及大型車停車場(當然其他類型車輛也能停)"
                },
                {
                    ParkingType: 9,
                    typeDesc: "Car Sharing 共享汽車租用服務停車場"
                },
                {
                    ParkingType: 10,
                    typeDesc: "Lift Sharing 共乘服務停車場"
                },
                {
                    ParkingType: 254,
                    typeDesc: "Other 其他"
                },
                {
                    ParkingType: 255,
                    typeDesc: "Unknown 未知"
                },
            ],
            ParkingSiteTypes: [
                {
                    ParkingSiteType: 1,
                    typeDesc: "Railway Terminal 軌道場站"
                },
                {
                    ParkingSiteType: 2,
                    typeDesc: "Airport Terminal 機場場站"
                },
                {
                    ParkingSiteType: 3,
                    typeDesc: "Ferry Terminal 船舶場站"
                },
                {
                    ParkingSiteType: 4,
                    typeDesc: "Shopping Area 商圈"
                },
                {
                    ParkingSiteType: 5,
                    typeDesc: "Restaurants 餐廳"
                },
                {
                    ParkingSiteType: 6,
                    typeDesc: "Stadiums 運動場"
                },
                {
                    ParkingSiteType: 7,
                    typeDesc: "Hotels 飯店"
                },
                {
                    ParkingSiteType: 8,
                    typeDesc: "Landmarks and POIs 觀光地標"
                },
                {
                    ParkingSiteType: 9,
                    typeDesc: "Theaters 電影院"
                },
                {
                    ParkingSiteType: 10,
                    typeDesc: "Scenic Spots 觀光景點"
                },
                {
                    ParkingSiteType: 11,
                    typeDesc: "Schools 學校"
                },
                {
                    ParkingSiteType: 12,
                    typeDesc: "Art Galleries and Museums美術博物館"
                },
                {
                    ParkingSiteType: 13,
                    typeDesc: "Exhibition Center 展覽中心"
                },
                {
                    ParkingSiteType: 14,
                    typeDesc: "Convention Center 會議中心"
                },
                {
                    ParkingSiteType: 15,
                    typeDesc: "Religious Center 宗教機構"
                },
                {
                    ParkingSiteType: 16,
                    typeDesc: "Retail and Market 賣場"
                },
                {
                    ParkingSiteType: 17,
                    typeDesc: "Zoo 動物園"
                },
                {
                    ParkingSiteType: 18,
                    typeDesc: "Freeway 高速公路"
                },
                {
                    ParkingSiteType: 19,
                    typeDesc: "Government Office 政府部門"
                },
                {
                    ParkingSiteType: 20,
                    typeDesc: "Residential Area 住宅區"
                },
                {
                    ParkingSiteType: 21,
                    typeDesc: "NightMarket 夜市"
                },
                {
                    ParkingSiteType: 22,
                    typeDesc: "Market 市場"
                },
                {
                    ParkingSiteType: 23,
                    typeDesc: "Park 公園"
                },
                {
                    ParkingSiteType: 254,
                    typeDesc: "Other 其他"
                },
                {
                    ParkingSiteType: 255,
                    typeDesc: "Unknown 未知"
                },
            ],
            ChargeTypes: [
                {
                    ChargeType: 1,
                    typeDesc: "計時"
                },
                {
                    ChargeType: 2,
                    typeDesc: "計次"
                },
                {
                    ChargeType: 3,
                    typeDesc: "月租"
                },
                {
                    ChargeType: 4,
                    typeDesc: "免費"
                },
                {
                    ChargeType: 254,
                    typeDesc: "其他"
                },
                {
                    ChargeType: 255,
                    typeDesc: "Unknown 未知"
                },
            ],
            cities: [
                {
                    City: "臺北市",
                    CityCode: "TPE"
                },
                {
                    City: "高雄市",
                    CityCode: "KHH"
                },
                {
                    City: "新北市",
                    CityCode: "NWT"
                },
                {
                    City: "臺中市",
                    CityCode: "TXG"
                },
                {
                    City: "臺南市",
                    CityCode: "TNN"
                },
                {
                    City: "桃園市",
                    CityCode: "TAO"
                },
                {
                    City: "宜蘭縣",
                    CityCode: "ILA"
                },
                {
                    City: "新竹縣",
                    CityCode: "HSQ"
                },
                {
                    City: "苗栗縣",
                    CityCode: "MIA"
                },
                {
                    City: "彰化縣",
                    CityCode: "CHA"
                },
                {
                    City: "南投縣",
                    CityCode: "NAN"
                },
                {
                    City: "雲林縣",
                    CityCode: "YUN"
                },
                {
                    City: "嘉義縣",
                    CityCode: "CYQ"
                },
                {
                    City: "屏東縣",
                    CityCode: "PIF"
                },
                {
                    City: "臺東縣",
                    CityCode: "TTT"
                },
                {
                    City: "花蓮縣",
                    CityCode: "HUA"
                },
                {
                    City: "澎湖縣",
                    CityCode: "PEN"
                },
                {
                    City: "基隆市",
                    CityCode: "KEE"
                },
                {
                    City: "新竹市",
                    CityCode: "HSZ"
                },
                {
                    City: "嘉義市",
                    CityCode: "CYI"
                },
                {
                    City: "金門縣",
                    CityCode: "KIN"
                },
                {
                    City: "連江縣",
                    CityCode: "LIE"
                },
            ],
            towns: {
                "臺北市": ["松山區", "信義區", "大安區", "中山區", "中正區", "大同區", "萬華區", "文山區", "南港區", "內湖區", "士林區", "北投區"],
                "高雄市": [
                    "鹽埕區",
                    "鼓山區",
                    "左營區",
                    "楠梓區",
                    "三民區",
                    "新興區",
                    "前金區",
                    "苓雅區",
                    "前鎮區",
                    "旗津區",
                    "小港區",
                    "鳳山區",
                    "林園區",
                    "大寮區",
                    "大樹區",
                    "大社區",
                    "仁武區",
                    "鳥松區",
                    "岡山區",
                    "橋頭區",
                    "燕巢區",
                    "田寮區",
                    "阿蓮區",
                    "路竹區",
                    "湖內區",
                    "茄萣區",
                    "永安區",
                    "彌陀區",
                    "梓官區",
                    "旗山區",
                    "美濃區",
                    "六龜區",
                    "甲仙區",
                    "杉林區",
                    "內門區",
                    "茂林區",
                    "桃源區",
                    "那瑪夏區",
                ],
                "新北市": [
                    "板橋區",
                    "三重區",
                    "中和區",
                    "永和區",
                    "新莊區",
                    "新店區",
                    "樹林區",
                    "鶯歌區",
                    "三峽區",
                    "淡水區",
                    "汐止區",
                    "瑞芳區",
                    "土城區",
                    "蘆洲區",
                    "五股區",
                    "泰山區",
                    "林口區",
                    "深坑區",
                    "石碇區",
                    "坪林區",
                    "三芝區",
                    "石門區",
                    "八里區",
                    "平溪區",
                    "雙溪區",
                    "貢寮區",
                    "金山區",
                    "萬里區",
                    "烏來區",
                ],
                "臺中市": [
                    "中區",
                    "東區",
                    "南區",
                    "西區",
                    "北區",
                    "西屯區",
                    "南屯區",
                    "北屯區",
                    "豐原區",
                    "東勢區",
                    "大甲區",
                    "清水區",
                    "沙鹿區",
                    "梧棲區",
                    "后里區",
                    "神岡區",
                    "潭子區",
                    "大雅區",
                    "新社區",
                    "石岡區",
                    "外埔區",
                    "大安區",
                    "烏日區",
                    "大肚區",
                    "龍井區",
                    "霧峰區",
                    "太平區",
                    "大里區",
                    "和平區"
                ],
                "臺南市": [
                    "新營區",
                    "鹽水區",
                    "白河區",
                    "柳營區",
                    "後壁區",
                    "東山區",
                    "麻豆區",
                    "下營區",
                    "六甲區",
                    "官田區",
                    "大內區",
                    "佳里區",
                    "學甲區",
                    "西港區",
                    "七股區",
                    "將軍區",
                    "北門區",
                    "新化區",
                    "善化區",
                    "新市區",
                    "安定區",
                    "山上區",
                    "玉井區",
                    "楠西區",
                    "南化區",
                    "左鎮區",
                    "仁德區",
                    "歸仁區",
                    "關廟區",
                    "龍崎區",
                    "永康區",
                    "東區",
                    "南區",
                    "北區",
                    "安南區",
                    "安平區",
                    "中西區",
                ],
                "桃園市": [
                    "桃園區",
                    "中壢區",
                    "大溪區",
                    "楊梅區",
                    "蘆竹區",
                    "大園區",
                    "龜山區",
                    "八德區",
                    "龍潭區",
                    "平鎮區",
                    "新屋區",
                    "觀音區",
                    "復興區",
                ],
                "宜蘭縣": [
                    "宜蘭市",
                    "羅東鎮",
                    "蘇澳鎮",
                    "頭城鎮",
                    "礁溪鄉",
                    "壯圍鄉",
                    "員山鄉",
                    "冬山鄉",
                    "五結鄉",
                    "三星鄉",
                    "大同鄉",
                    "南澳鄉",
                ],
                "新竹縣": [
                    "竹北市",
                    "竹東鎮",
                    "新埔鎮",
                    "關西鎮",
                    "湖口鄉",
                    "新豐鄉",
                    "芎林鄉",
                    "橫山鄉",
                    "北埔鄉",
                    "寶山鄉",
                    "峨眉鄉",
                    "尖石鄉",
                    "五峰鄉",
                ],
                "苗栗縣": [
                    "苗栗市",
                    "苑裡鎮",
                    "通霄鎮",
                    "竹南鎮",
                    "頭份市",
                    "後龍鎮",
                    "卓蘭鎮",
                    "大湖鄉",
                    "公館鄉",
                    "銅鑼鄉",
                    "南庄鄉",
                    "頭屋鄉",
                    "三義鄉",
                    "西湖鄉",
                    "造橋鄉",
                    "三灣鄉",
                    "獅潭鄉",
                    "泰安鄉",
                ],
                "彰化縣": [
                    "彰化市",
                    "鹿港鎮",
                    "和美鎮",
                    "線西鄉",
                    "伸港鄉",
                    "福興鄉",
                    "秀水鄉",
                    "花壇鄉",
                    "芬園鄉",
                    "員林市",
                    "溪湖鎮",
                    "田中鎮",
                    "大村鄉",
                    "埔鹽鄉",
                    "埔心鄉",
                    "永靖鄉",
                    "社頭鄉",
                    "二水鄉",
                    "北斗鎮",
                    "二林鎮",
                    "田尾鄉",
                    "埤頭鄉",
                    "芳苑鄉",
                    "大城鄉",
                    "竹塘鄉",
                    "溪州鄉",
                ],
                "南投縣": [
                    "南投市",
                    "埔里鎮",
                    "草屯鎮",
                    "竹山鎮",
                    "集集鎮",
                    "名間鄉",
                    "鹿谷鄉",
                    "中寮鄉",
                    "魚池鄉",
                    "國姓鄉",
                    "水里鄉",
                    "信義鄉",
                    "仁愛鄉",
                ],
                "雲林縣": [
                    "斗六市",
                    "斗南鎮",
                    "虎尾鎮",
                    "西螺鎮",
                    "土庫鎮",
                    "北港鎮",
                    "古坑鄉",
                    "大埤鄉",
                    "莿桐鄉",
                    "林內鄉",
                    "二崙鄉",
                    "崙背鄉",
                    "麥寮鄉",
                    "東勢鄉",
                    "褒忠鄉",
                    "臺西鄉",
                    "元長鄉",
                    "四湖鄉",
                    "口湖鄉",
                    "水林鄉"
                ],
                "嘉義縣": [
                    "太保市",
                    "朴子市",
                    "布袋鎮",
                    "大林鎮",
                    "民雄鄉",
                    "溪口鄉",
                    "新港鄉",
                    "六腳鄉",
                    "東石鄉",
                    "義竹鄉",
                    "鹿草鄉",
                    "水上鄉",
                    "中埔鄉",
                    "竹崎鄉",
                    "梅山鄉",
                    "番路鄉",
                    "大埔鄉",
                    "阿里山鄉",
                ],
                "屏東縣": [
                    "屏東市",
                    "潮州鎮",
                    "東港鎮",
                    "恆春鎮",
                    "萬丹鄉",
                    "長治鄉",
                    "麟洛鄉",
                    "九如鄉",
                    "里港鄉",
                    "鹽埔鄉",
                    "高樹鄉",
                    "萬巒鄉",
                    "內埔鄉",
                    "竹田鄉",
                    "新埤鄉",
                    "枋寮鄉",
                    "新園鄉",
                    "崁頂鄉",
                    "林邊鄉",
                    "南州鄉",
                    "佳冬鄉",
                    "琉球鄉",
                    "車城鄉",
                    "滿州鄉",
                    "枋山鄉",
                    "三地門鄉",
                    "霧臺鄉",
                    "瑪家鄉",
                    "泰武鄉",
                    "來義鄉",
                    "春日鄉",
                    "獅子鄉",
                    "牡丹鄉"
                ],
                "臺東縣": [
                    "臺東市",
                    "成功鎮",
                    "關山鎮",
                    "卑南鄉",
                    "鹿野鄉",
                    "池上鄉",
                    "東河鄉",
                    "長濱鄉",
                    "太麻里鄉",
                    "大武鄉",
                    "綠島鄉",
                    "海端鄉",
                    "延平鄉",
                    "金峰鄉",
                    "達仁鄉",
                    "蘭嶼鄉",
                ],
                "花蓮縣": [
                    "花蓮市",
                    "鳳林鎮",
                    "玉里鎮",
                    "新城鄉",
                    "吉安鄉",
                    "壽豐鄉",
                    "光復鄉",
                    "豐濱鄉",
                    "瑞穗鄉",
                    "富里鄉",
                    "秀林鄉",
                    "萬榮鄉",
                    "卓溪鄉",
                ],
                "澎湖縣": [
                    "馬公市",
                    "湖西鄉",
                    "白沙鄉",
                    "西嶼鄉",
                    "望安鄉",
                    "七美鄉",
                ],
                "基隆市": [
                    "中正區",
                    "七堵區",
                    "暖暖區",
                    "仁愛區",
                    "中山區",
                    "安樂區",
                    "信義區",
                ],
                "新竹市": [
                    "東區",
                    "北區",
                    "香山區",
                ],
                "嘉義市": [
                    "東區",
                    "西區",
                ],
                "連江縣": [
                    "南竿鄉",
                    "北竿鄉",
                    "莒光鄉",
                    "東引鄉",
                ],
                "金門縣": [
                    "金城鎮",
                    "金沙鎮",
                    "金湖鎮",
                    "金寧鄉",
                    "烈嶼鄉",
                    "烏坵鄉",
                ]
            },
            townCodes: {
                // 臺北市
                "松山區": "63000010",
                "信義區": "63000020",
                "大安區": "63000030",
                "中山區": "63000040",
                "中正區": "63000050",
                "大同區": "63000060",
                "萬華區": "63000070",
                "文山區": "63000080",
                "南港區": "63000090",
                "內湖區": "63000100",
                "士林區": "63000110",
                "北投區": "63000120",
                // 高雄市
                "鹽埕區": "64000010",
                "鼓山區": "64000020",
                "左營區": "64000030",
                "楠梓區": "64000040",
                "三民區": "64000050",
                "新興區": "64000060",
                "前金區": "64000070",
                "苓雅區": "64000080",
                "前鎮區": "64000090",
                "旗津區": "64000100",
                "小港區": "64000110",
                "鳳山區": "64000120",
                "林園區": "64000130",
                "大寮區": "64000140",
                "大樹區": "64000150",
                "大社區": "64000160",
                "仁武區": "64000170",
                "鳥松區": "64000180",
                "岡山區": "64000190",
                "橋頭區": "64000200",
                "燕巢區": "64000210",
                "田寮區": "64000220",
                "阿蓮區": "64000230 ",
                "路竹區": "64000240",
                "湖內區": "64000250",
                "茄萣區": "64000260",
                "永安區": "64000270",
                "彌陀區": "64000280",
                "梓官區": "64000290",
                "旗山區": "64000300",
                "美濃區": "64000310",
                "六龜區": "64000320",
                "甲仙區": "64000330",
                "杉林區": "64000340",
                "內門區": "64000350",
                "茂林區": "64000360",
                "桃源區": "64000370",
                "那瑪夏區": "64000380",
                // 新北市
                "板橋區": "65000010",
                "三重區": "65000020",
                "中和區": "65000030",
                "永和區": "65000040",
                "新莊區": "65000050",
                "新店區": "65000060",
                "樹林區": "65000070",
                "鶯歌區": "65000080",
                "三峽區": "65000090",
                "淡水區": "65000100",
                "汐止區": "65000110",
                "瑞芳區": "65000120",
                "土城區": "65000130",
                "蘆洲區": "65000140",
                "五股區": "65000150",
                "泰山區": "65000160",
                "林口區": "65000170",
                "深坑區": "65000180",
                "石碇區": "65000190",
                "坪林區": "65000200",
                "三芝區": "65000210",
                "石門區": "65000220",
                "八里區": "65000230",
                "平溪區": "65000240",
                "雙溪區": "65000250",
                "貢寮區": "65000260",
                "金山區": "65000270",
                "萬里區": "65000280",
                "烏來區": "65000290",
                // 臺中市
                "中區": "66000010",
                "東區": "66000020",
                "南區": "66000030",
                "西區": "66000040",
                "北區": "66000050",
                "西屯區": "66000060",
                "南屯區": "66000070",
                "北屯區": "66000080",
                "豐原區": "66000090",
                "東勢區": "66000100",
                "大甲區": "66000110",
                "清水區": "66000120",
                "沙鹿區": "66000130",
                "梧棲區": "66000140",
                "后里區": "66000150",
                "神岡區": "66000160",
                "潭子區": "66000170",
                "大雅區": "66000180",
                "新社區": "66000190",
                "石岡區": "66000200",
                "外埔區": "66000210",
                "大安區": "66000220",
                "烏日區": "66000230",
                "大肚區": "66000240",
                "龍井區": "66000250",
                "霧峰區": "66000260",
                "太平區": "66000270",
                "大里區": "66000280",
                "和平區": "66000290",
                // 臺南市
                "新營區": "67000010",
                "鹽水區": "67000020",
                "白河區": "67000030",
                "柳營區": "67000040",
                "後壁區": "67000050",
                "東山區": "67000060",
                "麻豆區": "67000070",
                "下營區": "67000080",
                "六甲區": "67000090",
                "官田區": "67000100",
                "大內區": "67000110",
                "佳里區": "67000120",
                "學甲區": "67000130",
                "西港區": "67000140",
                "七股區": "67000150",
                "將軍區": "67000160",
                "北門區": "67000170",
                "新化區": "67000180",
                "善化區": "67000190",
                "新市區": "67000200",
                "安定區": "67000210",
                "山上區": "67000220",
                "玉井區": "67000230",
                "楠西區": "67000240",
                "南化區": "67000250",
                "左鎮區": "67000260",
                "仁德區": "67000270",
                "歸仁區": "67000280",
                "關廟區": "67000290",
                "龍崎區": "67000300",
                "永康區": "67000310",
                "東區": "67000320",
                "南區": "67000330",
                "北區": "67000340",
                "安南區": "67000350",
                "安平區": "67000360",
                "中西區": "67000370",
                // 桃園市
                "桃園區": "68000010",
                "中壢區": "68000020",
                "大溪區": "68000030",
                "楊梅區": "68000040",
                "蘆竹區": "68000050",
                "大園區": "68000060",
                "龜山區": "68000070",
                "八德區": "68000080",
                "龍潭區": "68000090",
                "平鎮區": "68000100",
                "新屋區": "68000110",
                "觀音區": "68000120",
                "復興區": "68000130",
                // 宜蘭縣
                "宜蘭市": "10002010",
                "羅東鎮": "10002020",
                "蘇澳鎮": "10002030",
                "頭城鎮": "10002040",
                "礁溪鄉": "10002050",
                "壯圍鄉": "10002060",
                "員山鄉": "10002070",
                "冬山鄉": "10002080",
                "五結鄉": "10002090",
                "三星鄉": "10002100",
                "大同鄉": "10002110",
                "南澳鄉": "10002120",
                // 新竹縣
                "竹北市": "10004010",
                "竹東鎮": "10004020",
                "新埔鎮": "10004030",
                "關西鎮": "10004040",
                "湖口鄉": "10004050",
                "新豐鄉": "10004060",
                "芎林鄉": "10004070",
                "橫山鄉": "10004080",
                "北埔鄉": "10004090",
                "寶山鄉": "10004100",
                "峨眉鄉": "10004110",
                "尖石鄉": "10004120",
                "五峰鄉": "10004130",
                // 苗栗縣
                "苗栗市": "10005010",
                "苑裡鎮": "10005020",
                "通霄鎮": "10005030",
                "竹南鎮": "10005040",
                "頭份市": "10005050",
                "後龍鎮": "10005060",
                "卓蘭鎮": "10005070",
                "大湖鄉": "10005080",
                "公館鄉": "10005090",
                "銅鑼鄉": "10005100",
                "南庄鄉": "10005110",
                "頭屋鄉": "10005120",
                "三義鄉": "10005130",
                "西湖鄉": "10005140",
                "造橋鄉": "10005150",
                "三灣鄉": "10005160",
                "獅潭鄉": "10005170",
                "泰安鄉": "10005180",
                // 彰化縣
                "彰化市": "10007010",
                "鹿港鎮": "10007020",
                "和美鎮": "10007030",
                "線西鄉": "10007040",
                "伸港鄉": "10007050",
                "福興鄉": "10007060",
                "秀水鄉": "10007070",
                "花壇鄉": "10007080",
                "芬園鄉": "10007090",
                "員林市": "10007100",
                "溪湖鎮": "10007110",
                "田中鎮": "10007120",
                "大村鄉": "10007130",
                "埔鹽鄉": "10007140",
                "埔心鄉": "10007150",
                "永靖鄉": "10007160",
                "社頭鄉": "10007170",
                "二水鄉": "10007180",
                "北斗鎮": "10007190",
                "二林鎮": "10007200",
                "田尾鄉": "10007210",
                "埤頭鄉": "10007220",
                "芳苑鄉": "10007230",
                "大城鄉": "10007240",
                "竹塘鄉": "10007250",
                "溪州鄉": "10007260",
                // 南投縣
                "南投市": "10008010",
                "埔里鎮": "10008020",
                "草屯鎮": "10008030",
                "竹山鎮": "10008040",
                "集集鎮": "10008050",
                "名間鄉": "10008060",
                "鹿谷鄉": "10008070",
                "中寮鄉": "10008080",
                "魚池鄉": "10008090",
                "國姓鄉": "10008100",
                "水里鄉": "10008110",
                "信義鄉": "10008120",
                "仁愛鄉": "10008130",
                // 雲林縣
                "斗六市": "10009010",
                "斗南鎮": "10009020",
                "虎尾鎮": "10009030",
                "西螺鎮": "10009040",
                "土庫鎮": "10009050",
                "北港鎮": "10009060",
                "古坑鄉": "10009070",
                "大埤鄉": "10009080",
                "莿桐鄉": "10009090",
                "林內鄉": "10009100",
                "二崙鄉": "10009110",
                "崙背鄉": "10009120",
                "麥寮鄉": "10009130",
                "東勢鄉": "10009140",
                "褒忠鄉": "10009150",
                "臺西鄉": "10009160",
                "元長鄉": "10009170",
                "四湖鄉": "10009180",
                "口湖鄉": "10009190",
                "水林鄉": "10009200",
                // 嘉義縣
                "太保市": "10010010",
                "朴子市": "10010020",
                "布袋鎮": "10010030",
                "大林鎮": "10010040",
                "民雄鄉": "10010050",
                "溪口鄉": "10010060",
                "新港鄉": "10010070",
                "六腳鄉": "10010080",
                "東石鄉": "10010090",
                "義竹鄉": "10010100",
                "鹿草鄉": "10010110",
                "水上鄉": "10010120",
                "中埔鄉": "10010130",
                "竹崎鄉": "10010140",
                "梅山鄉": "10010150",
                "番路鄉": "10010160",
                "大埔鄉": "10010170",
                "阿里山鄉": "10010180",
                // 屏東縣
                "屏東市": "10013010",
                "潮州鎮": "10013020",
                "東港鎮": "10013030",
                "恆春鎮": "10013040",
                "萬丹鄉": "10013050",
                "長治鄉": "10013060",
                "麟洛鄉": "10013070",
                "九如鄉": "10013080",
                "里港鄉": "10013090",
                "鹽埔鄉": "10013100",
                "高樹鄉": "10013110",
                "萬巒鄉": "10013120",
                "內埔鄉": "10013130",
                "竹田鄉": "10013140",
                "新埤鄉": "10013150",
                "枋寮鄉": "10013160",
                "新園鄉": "10013170",
                "崁頂鄉": "10013180",
                "林邊鄉": "10013190",
                "南州鄉": "10013200",
                "佳冬鄉": "10013210",
                "琉球鄉": "10013220",
                "車城鄉": "10013230",
                "滿州鄉": "10013240",
                "枋山鄉": "10013250",
                "三地門鄉": "10013260",
                "霧臺鄉": "10013270",
                "瑪家鄉": "10013280",
                "泰武鄉": "10013290",
                "來義鄉": "10013300",
                "春日鄉": "10013310",
                "獅子鄉": "10013320",
                "牡丹鄉": "10013330",
                // 臺東縣
                "臺東市": "10014010",
                "成功鎮": "10014020",
                "關山鎮": "10014030",
                "卑南鄉": "10014040",
                "鹿野鄉": "10014050",
                "池上鄉": "10014060",
                "東河鄉": "10014070",
                "長濱鄉": "10014080",
                "太麻里鄉": "10014090",
                "大武鄉": "10014100",
                "綠島鄉": "10014110",
                "海端鄉": "10014120",
                "延平鄉": "10014130",
                "金峰鄉": "10014140",
                "達仁鄉": "10014150",
                "蘭嶼鄉": "10014160",
                // 花蓮縣
                "花蓮市": "10015010",
                "鳳林鎮": "10015020",
                "玉里鎮": "10015030",
                "新城鄉": "10015040",
                "吉安鄉": "10015050",
                "壽豐鄉": "10015060",
                "光復鄉": "10015070",
                "豐濱鄉": "10015080",
                "瑞穗鄉": "10015090",
                "富里鄉": "10015100",
                "秀林鄉": "10015110",
                "萬榮鄉": "10015120",
                "卓溪鄉": "10015130",
                // 澎湖縣
                "馬公市": "10016010",
                "湖西鄉": "10016020",
                "白沙鄉": "10016030",
                "西嶼鄉": "10016040",
                "望安鄉": "10016050",
                "七美鄉": "10016060",
                // 基隆市
                "中正區": "10017010",
                "七堵區": "10017020",
                "暖暖區": "10017030",
                "仁愛區": "10017040",
                "中山區": "10017050",
                "安樂區": "10017060",
                "信義區": "10017070",
                // 新竹市
                "東區": "10018010",
                "北區": "10018020",
                "香山區": "10018030",
                // 嘉義市
                "東區": "10020010",
                "西區": "10020020",
                // 連江縣
                "南竿鄉": "09007010",
                "北竿鄉": "09007020",
                "莒光鄉": "09007030",
                "東引鄉": "09007040",
                // 金門縣
                "金城鎮": "09020010",
                "金沙鎮": "09020020",
                "金湖鎮": "09020030",
                "金寧鄉": "09020040",
                "烈嶼鄉": "09020050",
                "烏坵鄉": "09020060",
            },
            townOptions: []
        }
    },
    methods: {
        sendCarParkList() {
            console.log(this.CarParkList);
        },
        addParkingArea() {
            const newArea = {
                CompanyId: "",
                CarParkID: "",
                ParkingAreaID: "",
                ParkingAreaName: "",
                ParkingTypes: []
            };
            this.ParkingAreas.push(newArea);
        },
        removeParkingArea(index) {
            this.ParkingAreas.splice(index, 1);
        },
        sendParkingArea(index) {
            this.ParkingAreas[index].CarParkID = this.CarParkList.CarParkID;
            console.log(this.ParkingAreas[index]);
        },
        toggleAreaParkingType(ParkingArea, parkingType) {
            const typeIndex = ParkingArea.ParkingTypes.indexOf(parkingType);
            if (typeIndex === -1) {
                ParkingArea.ParkingTypes.push(parkingType);
            } else {
                ParkingArea.ParkingTypes.splice(typeIndex, 1);
            }
        },
        toggleParkingType(typeIndex, ParkingType) {
            const index = this.CarParkList.ParkingTypes.indexOf(ParkingType);
            if (index != -1) {
                this.CarParkList.ParkingTypes.splice(index, 1);
            } else {
                this.CarParkList.ParkingTypes.push(this.ParkingTypes[typeIndex].ParkingType);
            }
        },
        toggleParkingSiteTypes(typeIndex, ParkingSiteType) {
            const index = this.CarParkList.ParkingSiteTypes.indexOf(ParkingSiteType);
            if (index != -1) {
                this.CarParkList.ParkingSiteTypes.splice(index, 1);
            } else {
                this.CarParkList.ParkingSiteTypes.push(this.ParkingSiteTypes[typeIndex].ParkingSiteType);
            }
        },
        toggleChargeTypes(typeIndex, ChargeType) {
            const index = this.CarParkList.ChargeTypes.indexOf(ChargeType);
            if (index != -1) {
                this.CarParkList.ChargeTypes.splice(index, 1);
            } else {
                this.CarParkList.ChargeTypes.push(this.ChargeTypes[typeIndex].ChargeType);
            }
        },
        handleCityChange() {
            const selectedCity = this.cities.find(item => item.City === this.CarParkList.City);
            if (selectedCity) {
                const City = selectedCity.City
                this.CarParkList.CityCode = selectedCity.CityCode;
                this.townOptions = this.towns[City];
                // 自動選擇第一個區鄉鎮
                if (this.townOptions.length > 0) {
                    this.CarParkList.TownName = this.townOptions[0];
                    this.CarParkList.TownID = this.townCodes[this.townOptions[0]];
                } else {
                    this.CarParkList.TownName = '';
                    this.CarParkList.TownID = '';
                }
            }
        },
        handleTownChange() {
            const selectedTown = this.CarParkList.TownName;
            if (selectedTown) {
                this.CarParkList.TownID = this.townCodes[selectedTown];
            } else {
                this.CarParkList.TownID = '';
            }
        },
    }
}
</script>

<style>
.form-icon {
    width: 20px;
    vertical-align: middle;
}

.ParkingAreas {
    border: 2px solid deepskyblue;
    padding: 10px;
    margin: 10px 0;
}

label {
    font-size: 16px;
}
</style>