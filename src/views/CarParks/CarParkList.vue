<template>
  <div class="container">
    <h1 class="pt-3 text-center">
      {{ mode == "create" ? "新增" : "編輯" }}路外停車場基本資料
    </h1>
    <VForm v-slot="{ meta }">
      <div class="mb-3 d-flex flex-column">
        <label for="CarParkID" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          業管機關訂定之停車場代碼
          <span class="text-danger">*</span>
        </label>
        <div id="CarParkIDHelp" class="form-text">
          <p>
            該停車場代表編號<br />
            <span>
              ※如果為私有停車場自行提供的停車場資料，CarParkID
              代碼編碼方式，建議如下：<br />
              <span class="text-danger">"公司統一編號" + "-"+ {3碼流水號}</span
              ><br />
              主要是為了避免與各業管機關上傳之停車場代碼重複。<br />
              例：28412550-001
            </span>
          </p>
        </div>
        <VField
          name="停車場代碼"
          id="CarParkID"
          v-model="CarParkList.CarParkID"
          type="text"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="停車場代碼" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="Zh_tw" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場中文名稱
          <span class="text-danger">*</span>
        </label>
        <div id="Zh_twHelp" class="form-text">
          <p>範例值: 板橋大遠百購物中心停車場</p>
        </div>
        <VField
          name="停車場中文名稱"
          id="Zh_tw"
          v-model="CarParkList.Zh_tw"
          type="text"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="停車場中文名稱" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="En" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場英文名稱 (選填)
        </label>
        <div id="EnHelp" class="form-text">
          <p>範例值: mega city parking garage</p>
        </div>
        <VField
          name="停車場英文名稱"
          id="En"
          v-model="CarParkList.En"
          type="text"
        />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="OperatorID" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          營運業者代碼
          <span class="text-danger">*</span>
        </label>
        <div id="OperatorIDHelp" class="form-text">
          <p>由各來源自訂營運業者代碼，請填寫公司統一編號</p>
        </div>
        <VField
          name="營運業者代碼"
          id="OperatorID"
          v-model="CarParkList.OperatorID"
          type="number"
          rules="required|length:8"
        />
        <ErrorMessage class="text-danger" name="營運業者代碼" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="Description" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場綜合描述
          <span class="text-danger">*</span>
        </label>
        <div id="DescriptionHelp" class="form-text">
          <p>
            描述該停車場更加詳細的資料<br />
            <span> 如：立體式小型車 496 格(含身心障礙停車位 10 格)。 </span>
          </p>
        </div>
        <VField
          name="停車場綜合描述"
          id="Description"
          v-model="CarParkList.Description"
          type="text"
          as="textarea"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="停車場綜合描述" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場類型
          <span class="text-danger">*</span>
        </label>
        <div id="CarParkTypeHelp" class="form-text">
          <p>
            立體停車塔屬標準的機械塔式停車場<br />
            <span> 立體機械式屬簡易之機械式停車場 </span>
          </p>
        </div>
        <div class="text-danger" v-if="CarParkList.CarParkType == ''">
          停車場類型 為必填
        </div>
        <label v-for="carType in CarParkTypes" :key="carType.CarParkType">
          <input
            class="me-1"
            type="radio"
            :value="carType.CarParkType"
            v-model="CarParkList.CarParkType"
            rules="required"
          />
          {{ carType.typeDesc }}
        </label>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車導引類型
          <span class="text-danger">*</span>
        </label>
        <div id="ParkingGuideTypeHelp" class="form-text">
          <p>描述該停車場主要停車導引類型</p>
        </div>
        <div class="text-danger" v-if="CarParkList.ParkingGuideType == ''">
          停車場導引類型 為必填
        </div>
        <label
          v-for="ParkingGuideType in ParkingGuideTypes"
          :key="ParkingGuideType.ParkingGuideType"
        >
          <input
            class="me-1"
            type="radio"
            :value="ParkingGuideType.ParkingGuideType"
            v-model="CarParkList.ParkingGuideType"
            rules="required"
          />
          {{ ParkingGuideType.typeDesc }}
        </label>
      </div>
      <!-- ParkingAreas -->
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有分停車場區域
          <span class="text-danger">*</span>
        </label>
        <div id="hasParkingAreasHelp" class="form-text">
          <p>
            可包絡多筆<br />
            停車場區域可為平面位置上的區分多個停車場區域，亦可能是立體不同樓層的區分停車場區域
          </p>
        </div>
        <div class="text-danger" v-if="hasParkingAreas == null">
          是否有分停車場區域 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="true"
              v-model="hasParkingAreas"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="false"
              v-model="hasParkingAreas"
            />
            否
          </label>
        </div>
      </div>

      <div class="ParkingAreas" v-if="hasParkingAreas == 'true'">
        <h2 class="text-center">停車場區域資料</h2>
        <div v-for="(ParkingArea, index) in ParkingAreas" :key="index">
          <hr />
          <div class="mb-3 d-flex flex-column">
            <label for="ParkingAreaID" class="form-label">
              <img
                src="../../assets/images/robotic-hand.png"
                alt="form-icon"
                class="form-icon"
              />
              停車場區域代碼
              <span class="text-danger">*</span>
            </label>
            <div id="ParkingAreaIDHelp" class="form-text">
              <p>
                停車場區域代碼<br />
                <span>
                  停車場區域可為平面位置上的區分多個停車場區域，亦可能是立體不同樓層的區分停車場區域
                </span>
              </p>
            </div>
            <VField
              :id="'ParkingAreaID_' + index"
              v-model="ParkingArea.ParkingAreaID"
              type="text"
              :rules="{ required: true }"
              :name="'停車場區域代碼_' + index"
            />
            <ErrorMessage
              :name="'停車場區域代碼_' + index"
              class="text-danger"
            />
          </div>
          <div class="mb-3 d-flex flex-column">
            <label for="ParkingAreaName" class="form-label">
              <img
                src="../../assets/images/robotic-hand.png"
                alt="form-icon"
                class="form-icon"
              />
              停車場區域名稱
              <span class="text-danger">*</span>
            </label>
            <div id="ParkingAreaNameHelp" class="form-text">
              <p>
                停車場區域名稱<br />
                <span>
                  如：高速公路有些服務區停車場，可能分多個停車區域
                  最簡單的是分北上停車場區域、南下停車場區域，也可分北上小型車停車廠區域、北上大型車場區域
                </span>
              </p>
            </div>
            <VField
              :id="'ParkingAreaName_' + index"
              v-model="ParkingArea.Zh_tw"
              type="text"
              :rules="{ required: true }"
              :name="'停車場區域名稱_' + index"
            />
            <ErrorMessage
              :name="'停車場區域名稱_' + index"
              class="text-danger"
            />
          </div>
          <div class="mb-3 d-flex flex-column">
            <label for="ParkingAreaNameEn" class="form-label">
              <img
                src="../../assets/images/robotic-hand.png"
                alt="form-icon"
                class="form-icon"
              />
              停車場區域英文名稱 (選填)
            </label>
            <div id="ParkingAreaNameEnHelp" class="form-text">
              <p>
                停車場區域英文名稱<br />
                <span> 如：SouthBound </span>
              </p>
            </div>
            <VField
              :id="'ParkingAreaNameEn_' + index"
              v-model="ParkingArea.En"
              type="text"
              :name="'停車場區域英文名稱_' + index"
            />
          </div>
          <div class="mb-3 d-flex flex-column">
            <label>
              <img
                src="../../assets/images/robotic-hand.png"
                alt="form-icon"
                class="form-icon"
              />
              停車類型
              <span class="text-danger">*</span>
            </label>
            <div id="ParkingAreaParkingTypesHelp" class="form-text">
              <p>建議至多填 3 種主要停車類型即可</p>
            </div>
            <div v-if="ParkingArea.ParkingType.length <= 0" class="text-danger">
              停車類型 為必填
            </div>
            <div v-for="(type, index) in ParkingTypes" :key="type.ParkingType">
              <input
                class="me-1"
                :id="'parkingType_' + index + '_' + type.ParkingType"
                :value="type.ParkingType"
                type="checkbox"
                :checked="ParkingArea.ParkingType.includes(type.ParkingType)"
                @change="toggleAreaParkingType(ParkingArea, type.ParkingType)"
              />
              <label
                @click.prevent="
                  toggleAreaParkingType(ParkingArea, type.ParkingType)
                "
                :for="'parkingType_' + index + '_' + type.ParkingType"
              >
                {{ type.typeDesc }}
              </label>
            </div>
            <!-- todo checkbox validation -->
            <ErrorMessage :name="'停車類型' + index" class="text-danger" />
          </div>

          <p class="text-warning bg-dark">
            完成每筆區域資料後，<br />
            請點擊<u><b>儲存區域資料</b></u
            >按鈕以保存
          </p>
          <div class="d-flex justify-content-between">
            <button
              class="btn btn-outline-danger"
              @click="removeParkingArea(index)"
            >
              移除
            </button>
            <button
              class="btn btn-primary"
              @click.prevent="sendParkingArea(index)"
            >
              儲存區域資料
            </button>
          </div>
        </div>
        <button
          class="btn btn-outline-primary mt-2"
          @click.prevent="addParkingArea()"
        >
          加入停車場區域資料
        </button>
      </div>
      <!-- ParkingAreas end -->

      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt=""
            class="form-icon"
          />
          停車類型
          <span class="text-danger">*</span>
        </label>
        <div id="ParkingTypesHelp" class="form-text">
          <p>建議至多填 3 種主要類型即可</p>
        </div>
        <div v-if="CarParkList.ParkingType.length <= 0" class="text-danger">
          停車類型 為必填
        </div>
        <div v-for="(type, typeIndex) in ParkingTypes" :key="type.ParkingType">
          <input
            class="me-1"
            type="checkbox"
            :id="`parkingType_${typeIndex}`"
            :value="type.ParkingType"
            v-model="CarParkList.ParkingType"
            :checked="ParkingTypes.includes(type.ParkingType)"
          />
          <label :for="`parkingType_${typeIndex}`">
            {{ type.typeDesc }}
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt=""
            class="form-icon"
          />
          停車場服務類型
          <span class="text-danger">*</span>
        </label>
        <div id="ParkingSiteTypesHelp" class="form-text">
          <p>建議至多填 3 種主要類型即可</p>
        </div>
        <div v-if="CarParkList.ParkingSiteType.length <= 0" class="text-danger">
          停車場服務類型 為必填
        </div>
        <div
          v-for="(type, typeIndex) in ParkingSiteTypes"
          :key="type.ParkingSiteType"
        >
          <input
            class="me-1"
            type="checkbox"
            :id="`ParkingSiteType_${typeIndex}`"
            :value="type.ParkingSiteType"
            v-model="CarParkList.ParkingSiteType"
            :checked="ParkingSiteTypes.includes(type.ParkingSiteType)"
          />
          <label :for="`ParkingSiteType_${typeIndex}`">
            {{ type.typeDesc }}
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt=""
            class="form-icon"
          />
          停車場收費方式
          <span class="text-danger">*</span>
        </label>
        <div id="ChargeTypesHelp" class="form-text">
          <p>填列停車場主要收費方式</p>
        </div>
        <div
          v-if="this.CarParkList.ChargeType.length === 0"
          class="text-danger"
        >
          停車場收費方式 為必填
        </div>
        <div v-for="(type, typeIndex) in ChargeTypes" :key="type.ChargeType">
          <input
            class="me-1"
            type="checkbox"
            :id="`ChargeType_${typeIndex}`"
            :value="type.ChargeType"
            v-model="CarParkList.ChargeType"
            :checked="ChargeTypes.includes(type.ChargeType)"
            :required="this.CarParkList.ChargeType.length === 0"
          />
          <label :for="`ChargeType_${typeIndex}`">
            {{ type.typeDesc }}
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="Telephone" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場連絡電話 (選填)
        </label>
        <div id="TelephoneHelp" class="form-text">
          <p>如：02-23955514</p>
        </div>
        <VField
          name="停車場連絡電話"
          id="Telephone"
          v-model="CarParkList.Telephone"
          type="text"
        />
        <ErrorMessage class="text-danger" name="停車場連絡電話" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="EmergencyPhone" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          緊急連絡電話 (選填)
        </label>
        <div id="EmergencyPhone" class="form-text">
          <p>如：0912-345-678</p>
        </div>
        <VField
          name="緊急連絡電話"
          id="EmergencyPhone"
          v-model="CarParkList.EmergencyPhone"
          type="text"
        />
        <ErrorMessage class="text-danger" name="緊急連絡電話" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="PositionLat" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          位置緯度(WGS84)
          <span class="text-danger">*</span>
        </label>
        <div id="PositionLatHelp" class="form-text">
          <p>坐標系統為 WGS84，如25.02516。(請填寫至小數點後五碼)</p>
        </div>
        <VField
          name="位置緯度(WGS84) "
          id="PositionLat"
          v-model="CarParkList.PositionLat"
          type="text"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="位置緯度(WGS84) " />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="PositionLon" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          位置經度(WGS84)
          <span class="text-danger">*</span>
        </label>
        <div id="PositionLonHelp" class="form-text">
          <p>
            該停車場所在位置代表點坐標<br />
            坐標系統為 WGS84，如25.02516。(請填寫至小數點後五碼)
          </p>
        </div>
        <VField
          name="位置經度(WGS84) "
          id="PositionLon"
          v-model="CarParkList.PositionLon"
          type="text"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="位置經度(WGS84) " />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="Email" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          電子信箱 (選填)
        </label>
        <div id="EmailHelp" class="form-text">
          <p>請填寫有效的電子信箱</p>
        </div>
        <VField
          name="電子信箱 "
          id="Email"
          v-model="CarParkList.Email"
          type="email"
        />
        <ErrorMessage class="text-danger" name="電子信箱" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="Address" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場地址
          <span class="text-danger">*</span>
        </label>
        <div id="AddressHelp" class="form-text">
          <p>請填寫停車場地址</p>
        </div>
        <VField
          name="停車場地址"
          id="Address"
          v-model="CarParkList.Address"
          type="text"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="停車場地址" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="FareDescription" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          票價資訊文字描述
          <span class="text-danger">*</span>
        </label>
        <div id="FareDescriptionHelp" class="form-text">
          <p>
            該停車場所提供各項票價詳細資訊，如：<br />
            <span>
              計時：20 元/時(8-18)，10 元/時(18-8)。<br />
              每日(20-8)最高收費 50 元，全程以半小時計費。
            </span>
          </p>
        </div>
        <VField
          name="票價資訊文字描述"
          type="text"
          as="textarea"
          id="FareDescription"
          v-model="CarParkList.FareDescription"
          rules="required"
        />
        <ErrorMessage class="text-danger" name="票價資訊文字描述" />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否在營業時間外不收費
          <span class="text-danger">*</span>
        </label>
        <div id="IsFreeParkingOutOfHoursHelp" class="form-text">
          <p>是否在營業時間外不收費</p>
        </div>
        <div
          class="text-danger"
          v-if="CarParkList.IsFreeParkingOutOfHours == ''"
        >
          是否在營業時間外不收費 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.IsFreeParkingOutOfHours"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              checked="true"
              v-model="CarParkList.IsFreeParkingOutOfHours"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否為公有停車場
          <span class="text-danger">*</span>
        </label>
        <div id="IsPublicHelp" class="form-text">
          <p>是否為公有停車場</p>
        </div>
        <div class="text-danger" v-if="CarParkList.IsPublic == ''">
          是否為公有停車場 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.IsPublic"
            />
            公有停車場(預設)
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.IsPublic"
            />
            私人停車場
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          營運種類
          <span class="text-danger">*</span>
        </label>
        <div id="OperationTypeHelp" class="form-text">
          <p>營運種類</p>
        </div>
        <div class="text-danger" v-if="CarParkList.OperationType == ''">
          營運種類 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.OperationType"
            />
            公辦民營
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="2"
              v-model="CarParkList.OperationType"
            />
            公辦公營
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="3"
              v-model="CarParkList.OperationType"
            />
            私有民營
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有提供動態剩餘車位資訊
          <span class="text-danger">*</span>
        </label>
        <div id="LiveOccupancyAvailableHelp" class="form-text">
          <p>是否有提供動態剩餘車位資訊</p>
        </div>
        <div
          class="text-danger"
          v-if="CarParkList.LiveOccupancyAvailable == ''"
        >
          是否有提供動態剩餘車位資訊 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.LiveOccupancyAvailable"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.LiveOccupancyAvailable"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有電動車充電設施
          <span class="text-danger">*</span>
        </label>
        <div id="EVRechargingAvailableHelp" class="form-text">
          <p>是否有電動車充電設施</p>
        </div>
        <div class="text-danger" v-if="CarParkList.EVRechargingAvailable == ''">
          是否有電動車充電設施 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.EVRechargingAvailable"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.EVRechargingAvailable"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有提供月票服務
          <span class="text-danger">*</span>
        </label>
        <div id="MonthlyTicketAvailableHelp" class="form-text">
          <p>是否有提供月票服務</p>
        </div>
        <div
          class="text-danger"
          v-if="CarParkList.MonthlyTicketAvailable == ''"
        >
          是否有提供月票服務 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.MonthlyTicketAvailable"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.MonthlyTicketAvailable"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有提供季票服務
          <span class="text-danger">*</span>
        </label>
        <div id="SeasonTicketAvailableHelp" class="form-text">
          <p>是否有提供季票服務</p>
        </div>
        <div class="text-danger" v-if="CarParkList.SeasonTicketAvailable == ''">
          是否有提供季票服務 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.SeasonTicketAvailable"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.SeasonTicketAvailable"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有提供預約停車
          <span class="text-danger">*</span>
        </label>
        <div id="ReservationAvailableHelp" class="form-text">
          <p>是否有提供預約停車</p>
        </div>
        <div class="text-danger" v-if="CarParkList.ReservationAvailable == ''">
          是否有提供預約停車 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.ReservationAvailable"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.ReservationAvailable"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有無障礙設施
          <span class="text-danger">*</span>
        </label>
        <div id="WheelchairAccessibleHelp" class="form-text">
          <p>是否有無障礙設施</p>
        </div>
        <div class="text-danger" v-if="CarParkList.WheelchairAccessible == ''">
          是否有無障礙設施 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.WheelchairAccessible"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.WheelchairAccessible"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否允許停車過夜
          <span class="text-danger">*</span>
        </label>
        <div id="OvernightPermittedHelp" class="form-text">
          <p>是否允許停車過夜</p>
        </div>
        <div class="text-danger" v-if="CarParkList.OvernightPermitted == ''">
          是否允許停車過夜 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.OvernightPermitted"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.OvernightPermitted"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有自動售票機
          <span class="text-danger">*</span>
        </label>
        <div id="TicketMachineHelp" class="form-text">
          <p>是否有自動售票機</p>
        </div>
        <div class="text-danger" v-if="CarParkList.TicketMachine == ''">
          是否有自動售票機 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.TicketMachine"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.TicketMachine"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有廁所
          <span class="text-danger">*</span>
        </label>
        <div id="ToiletHelp" class="form-text">
          <p>是否有廁所</p>
        </div>
        <div class="text-danger" v-if="CarParkList.Toilet == ''">
          是否有廁所 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.Toilet"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.Toilet"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有餐廳
          <span class="text-danger">*</span>
        </label>
        <div id="RestaurantHelp" class="form-text">
          <p>是否有餐廳</p>
        </div>
        <div class="text-danger" v-if="CarParkList.Restaurant == ''">
          是否有餐廳 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.Restaurant"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.Restaurant"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有加油站
          <span class="text-danger">*</span>
        </label>
        <div id="GasStationHelp" class="form-text">
          <p>是否有加油站</p>
        </div>
        <div class="text-danger" v-if="CarParkList.GasStation == ''">
          是否有加油站 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.GasStation"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.GasStation"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有商店
          <span class="text-danger">*</span>
        </label>
        <div id="ShopHelp" class="form-text">
          <p>是否有商店</p>
        </div>
        <div class="text-danger" v-if="CarParkList.Shop == ''">
          是否有商店 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.Shop"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.Shop"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有閘口
          <span class="text-danger">*</span>
        </label>
        <div id="GatedHelp" class="form-text">
          <p>是否有閘口</p>
        </div>
        <div class="text-danger" v-if="CarParkList.Gated == ''">
          是否有閘口 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.Gated"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.Gated"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有照明設施
          <span class="text-danger">*</span>
        </label>
        <div id="LightingHelp" class="form-text">
          <p>是否有照明設施</p>
        </div>
        <div class="text-danger" v-if="CarParkList.Lighting == ''">
          是否有照明設施 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.Lighting"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.Lighting"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否停車安全有保障
          <span class="text-danger">*</span>
        </label>
        <div id="SecureParkingHelp" class="form-text">
          <p>
            是否停車安全有保障<br />
            <span>
              停車場提供任何強化安全停車之設施或管理作為，<br />
              如：進出口柵桿、監視器、保全/管理員...等。
            </span>
          </p>
        </div>
        <div class="text-danger" v-if="CarParkList.SecureParking == ''">
          是否停車安全有保障 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.SecureParking"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.SecureParking"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有售票處
          <span class="text-danger">*</span>
        </label>
        <div id="TicketOfficeHelp" class="form-text">
          <p>是否有售票處</p>
        </div>
        <div class="text-danger" v-if="CarParkList.TicketOffice == ''">
          是否有售票處 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.TicketOffice"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.TicketOffice"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否允許於停車場區域內裝卸危險物品
          <span class="text-danger">*</span>
        </label>
        <div id="ProhibitedForAnyHazardousMaterialLoadsHelp" class="form-text">
          <p>是否允許於停車場區域內裝卸危險物品</p>
        </div>
        <div
          class="text-danger"
          v-if="CarParkList.ProhibitedForAnyHazardousMaterialLoads == ''"
        >
          是否允許於停車場區域內裝卸危險物品 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.ProhibitedForAnyHazardousMaterialLoads"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.ProhibitedForAnyHazardousMaterialLoads"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有管理人員
          <span class="text-danger">*</span>
        </label>
        <div id="SecurityGuardHelp" class="form-text">
          <p>是否有管理人員</p>
        </div>
        <div class="text-danger" v-if="CarParkList.SecurityGuard == ''">
          是否有管理人員 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.SecurityGuard"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.SecurityGuard"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          是否有監視系統
          <span class="text-danger">*</span>
        </label>
        <div id="SupervisionHelp" class="form-text">
          <p>是否有監視系統</p>
        </div>
        <div class="text-danger" v-if="CarParkList.Supervision == ''">
          是否有監視系統 為必填
        </div>
        <div class="d-flex">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.Supervision"
            />
            是
          </label>
          <label class="ms-1">
            <input
              class="me-1"
              type="radio"
              value="0"
              v-model="CarParkList.Supervision"
            />
            否(預設)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label>
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          監視系統類型 (選填)
        </label>
        <div id="SupervisionTypeHelp" class="form-text">
          <p>監視系統類型</p>
        </div>
        <div class="d-flex flex-column">
          <label>
            <input
              class="me-1"
              type="radio"
              value="1"
              v-model="CarParkList.SupervisionType"
            />CCTV(預設)
          </label>
          <label>
            <input
              class="me-1"
              type="radio"
              value="2"
              v-model="CarParkList.SupervisionType"
            />CCTV+IVA(Intelligent Video Analytics 智慧影像分析)
          </label>
          <label>
            <input
              class="me-1"
              type="radio"
              value="254"
              v-model="CarParkList.SupervisionType"
            />Other(其他)
          </label>
          <label>
            <input
              class="me-1"
              type="radio"
              value="255"
              v-model="CarParkList.SupervisionType"
            />Unknown(未知)
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="LandMark" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場附近的地標/地物 (選填)
        </label>
        <div id="LandMarkHelp" class="form-text">
          <p>範例值：新北市政府</p>
        </div>
        <VField
          name="停車場附近的地標"
          id="LandMark"
          v-model="CarParkList.LandMark"
          type="text"
        />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="BuildingName" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          停車場所在大樓名稱 (選填)
        </label>
        <div id="BuildingNameHelp" class="form-text">
          <p>範例值：板橋大遠百購物中心</p>
        </div>
        <VField
          name="停車場所在大樓名稱 "
          id="BuildingName"
          v-model="CarParkList.BuildingName"
          type="text"
        />
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="City" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          所在城市
          <span class="text-danger">*</span>
        </label>
        <select v-model="CarParkList.City" @change="handleCityChange">
          <option disabled>請選擇所在城市</option>
          <option v-for="item in cities" :key="item.City" :value="item.City">
            {{ item.City }}
          </option>
        </select>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="CityCode" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          所在城市簡碼
          <span class="text-danger">*</span>
        </label>
        <div id="CityCodeHelp" class="form-text">
          <p>所在城市簡碼請勿自行更改</p>
        </div>
        <select v-model="CarParkList.CityCode">
          <option disabled>所在城市簡碼</option>
          <option
            disabled
            v-for="item in cities"
            :key="item.City"
            :value="item.CityCode"
          >
            {{ item.CityCode }}
          </option>
        </select>
      </div>

      <div class="mb-3 d-flex flex-column">
        <label for="TownName" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          區鄉鎮名稱
          <span class="text-danger">*</span>
        </label>
        <select v-model="CarParkList.TownName" @change="handleTownChange">
          <option disabled>請選擇區鄉鎮名稱</option>
          <option
            v-for="town in townOptions"
            :key="town"
            :value="town.TownName"
          >
            {{ town.TownName }}
          </option>
        </select>
      </div>
      <div class="mb-3 d-flex flex-column">
        <label for="TownID" class="form-label">
          <img
            src="../../assets/images/robotic-hand.png"
            alt="form-icon"
            class="form-icon"
          />
          區鄉鎮代碼
          <span class="text-danger">*</span>
        </label>
        <div id="TownIDHelp" class="form-text">
          <p>區鄉鎮代碼請勿自行更改</p>
        </div>
        <select v-model="CarParkList.TownID">
          <option disabled>請選擇區鄉鎮代碼</option>
          <option
            disabled
            v-for="town in townOptions"
            :key="town.TownID"
            :value="town.TownID"
          >
            {{ town.TownID }}
          </option>
        </select>
      </div>

      <button
        class="btn btn-primary my-2"
        type="submit"
        :disabled="!meta.valid"
        @click.prevent="sendCarParkList()"
      >
        儲存
      </button>
    </VForm>
  </div>
</template>

<script>
import { API } from "../../App.vue";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import router from "../../router";

export default {
  data() {
    return {
      mode: "", // create or edit
      CarParkID: "", // if this is edit mode, there must have a CarParkId
      CarParkList: {
        CompanyId: "",
        CarParkID: "",
        Zh_tw: "",
        En: "",
        OperatorID: "",
        Description: "",
        CarParkType: "",
        ParkingGuideType: [],
        ParkingType: [],
        ParkingSiteType: [],
        ChargeType: [],
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
        SupervisionType: "",
        LandMark: "",
        BuildingName: "",
        City: "",
        CityCode: "",
        TownName: "",
        TownID: "",
      },
      ParkingAreas: [
        {
          id: "",
          CompanyId: "",
          CarParkID: "",
          ParkingAreaID: "",
          Zh_tw: "",
          En: "",
          ParkingType: [],
        },
      ],
      hasParkingAreas: null,
      CarParkTypes: [
        {
          CarParkType: 1,
          typeDesc: "Surface/Open space(平面)",
        },
        {
          CarParkType: 2,
          typeDesc: "Multi-storey(立體)",
        },
        {
          CarParkType: 3,
          typeDesc: "Underground(地下)",
        },
        {
          CarParkType: 4,
          typeDesc: "ParkingTower(立體停車塔)",
        },
        {
          CarParkType: 5,
          typeDesc: "Multi-level Mechanical(立體機械式)",
        },
        {
          CarParkType: 6,
          typeDesc: "Mixed 混合型(同時涵蓋 2 種以上)",
        },
        {
          CarParkType: 254,
          typeDesc: "Other(其他);",
        },
        {
          CarParkType: 255,
          typeDesc: "Unknown(未知)",
        },
      ],
      ParkingGuideTypes: [
        {
          ParkingGuideType: 1,
          typeDesc: "Self-guides to space 自行找尋停車位(預設)",
        },
        {
          ParkingGuideType: 2,
          typeDesc: "Automatic Parking Guidance 有導引輔助設施協助尋找停車位",
        },
        {
          ParkingGuideType: 3,
          typeDesc: "Staff Guides to Space 人工導引停找車位",
        },
        {
          ParkingGuideType: 4,
          typeDesc: "Valet Parking 代客泊車",
        },
        {
          ParkingGuideType: 5,
          typeDesc: "Mixed 混合型(同時涵蓋 2 種以上)",
        },
        {
          ParkingGuideType: 254,
          typeDesc: "Other(其他)",
        },
        {
          ParkingGuideType: 2255,
          typeDesc: "Unknown(未知)",
        },
      ],
      ParkingTypes: [
        {
          ParkingType: "1",
          typeDesc: "Park-and-Ride 停車轉乘公共運輸",
        },
        {
          ParkingType: "2",
          typeDesc: "Kiss-and-Ride 臨時停車接送",
        },
        {
          ParkingType: "3",
          typeDesc: "Park-And-Cycle 停車後轉使用公共自行車",
        },
        {
          ParkingType: "4",
          typeDesc: "Park-And-Walk 停車後步行",
        },
        {
          ParkingType: "5",
          typeDesc: "Event Parking 活動專用停車場",
        },
        {
          ParkingType: "6",
          typeDesc: "Rest Area 休息站專用停車場",
        },
        {
          ParkingType: "7",
          typeDesc: "Service Area 服務區專用停車場",
        },
        {
          ParkingType: "8",
          typeDesc:
            "Truck & Large Vehicle Parking 貨車及大型車停車場(當然其他類型車輛也能停)",
        },
        {
          ParkingType: "9",
          typeDesc: "Car Sharing 共享汽車租用服務停車場",
        },
        {
          ParkingType: "10",
          typeDesc: "Lift Sharing 共乘服務停車場",
        },
        {
          ParkingType: "254",
          typeDesc: "Other 其他",
        },
        {
          ParkingType: "255",
          typeDesc: "Unknown 未知",
        },
      ],
      ParkingSiteTypes: [
        {
          ParkingSiteType: "1",
          typeDesc: "Railway Terminal 軌道場站",
        },
        {
          ParkingSiteType: "2",
          typeDesc: "Airport Terminal 機場場站",
        },
        {
          ParkingSiteType: "3",
          typeDesc: "Ferry Terminal 船舶場站",
        },
        {
          ParkingSiteType: "4",
          typeDesc: "Shopping Area 商圈",
        },
        {
          ParkingSiteType: "5",
          typeDesc: "Restaurants 餐廳",
        },
        {
          ParkingSiteType: "6",
          typeDesc: "Stadiums 運動場",
        },
        {
          ParkingSiteType: "7",
          typeDesc: "Hotels 飯店",
        },
        {
          ParkingSiteType: "8",
          typeDesc: "Landmarks and POIs 觀光地標",
        },
        {
          ParkingSiteType: "9",
          typeDesc: "Theaters 電影院",
        },
        {
          ParkingSiteType: "10",
          typeDesc: "Scenic Spots 觀光景點",
        },
        {
          ParkingSiteType: "11",
          typeDesc: "Schools 學校",
        },
        {
          ParkingSiteType: "12",
          typeDesc: "Art Galleries and Museums美術博物館",
        },
        {
          ParkingSiteType: "13",
          typeDesc: "Exhibition Center 展覽中心",
        },
        {
          ParkingSiteType: "14",
          typeDesc: "Convention Center 會議中心",
        },
        {
          ParkingSiteType: "15",
          typeDesc: "Religious Center 宗教機構",
        },
        {
          ParkingSiteType: "16",
          typeDesc: "Retail and Market 賣場",
        },
        {
          ParkingSiteType: "17",
          typeDesc: "Zoo 動物園",
        },
        {
          ParkingSiteType: "18",
          typeDesc: "Freeway 高速公路",
        },
        {
          ParkingSiteType: "19",
          typeDesc: "Government Office 政府部門",
        },
        {
          ParkingSiteType: "20",
          typeDesc: "Residential Area 住宅區",
        },
        {
          ParkingSiteType: "21",
          typeDesc: "NightMarket 夜市",
        },
        {
          ParkingSiteType: "22",
          typeDesc: "Market 市場",
        },
        {
          ParkingSiteType: "23",
          typeDesc: "Park 公園",
        },
        {
          ParkingSiteType: "254",
          typeDesc: "Other 其他",
        },
        {
          ParkingSiteType: "255",
          typeDesc: "Unknown 未知",
        },
      ],
      ChargeTypes: [
        {
          ChargeType: "1",
          typeDesc: "計時",
        },
        {
          ChargeType: "2",
          typeDesc: "計次",
        },
        {
          ChargeType: "3",
          typeDesc: "月租",
        },
        {
          ChargeType: "4",
          typeDesc: "免費",
        },
        {
          ChargeType: "254",
          typeDesc: "其他",
        },
        {
          ChargeType: "255",
          typeDesc: "Unknown 未知",
        },
      ],
      cities: [
        {
          City: "臺北市",
          CityCode: "TPE",
        },
        {
          City: "高雄市",
          CityCode: "KHH",
        },
        {
          City: "新北市",
          CityCode: "NWT",
        },
        {
          City: "臺中市",
          CityCode: "TXG",
        },
        {
          City: "臺南市",
          CityCode: "TNN",
        },
        {
          City: "桃園市",
          CityCode: "TAO",
        },
        {
          City: "宜蘭縣",
          CityCode: "ILA",
        },
        {
          City: "新竹縣",
          CityCode: "HSQ",
        },
        {
          City: "苗栗縣",
          CityCode: "MIA",
        },
        {
          City: "彰化縣",
          CityCode: "CHA",
        },
        {
          City: "南投縣",
          CityCode: "NAN",
        },
        {
          City: "雲林縣",
          CityCode: "YUN",
        },
        {
          City: "嘉義縣",
          CityCode: "CYQ",
        },
        {
          City: "屏東縣",
          CityCode: "PIF",
        },
        {
          City: "臺東縣",
          CityCode: "TTT",
        },
        {
          City: "花蓮縣",
          CityCode: "HUA",
        },
        {
          City: "澎湖縣",
          CityCode: "PEN",
        },
        {
          City: "基隆市",
          CityCode: "KEE",
        },
        {
          City: "新竹市",
          CityCode: "HSZ",
        },
        {
          City: "嘉義市",
          CityCode: "CYI",
        },
        {
          City: "金門縣",
          CityCode: "KIN",
        },
        {
          City: "連江縣",
          CityCode: "LIE",
        },
      ],
      towns: {
        臺北市: [
          { TownName: "松山區", TownID: "63000010" },
          { TownName: "信義區", TownID: "63000020" },
          { TownName: "大安區", TownID: "63000030" },
          { TownName: "中山區", TownID: "63000040" },
          { TownName: "中正區", TownID: "63000050" },
          { TownName: "大同區", TownID: "63000060" },
          { TownName: "萬華區", TownID: "63000070" },
          { TownName: "文山區", TownID: "63000080" },
          { TownName: "南港區", TownID: "63000090" },
          { TownName: "內湖區", TownID: "63000100" },
          { TownName: "士林區", TownID: "63000110" },
          { TownName: "北投區", TownID: "63000120" },
        ],
        高雄市: [
          { TownName: "鹽埕區", TownID: "64000010" },
          { TownName: "鼓山區", TownID: "64000020" },
          { TownName: "左營區", TownID: "64000030" },
          { TownName: "楠梓區", TownID: "64000040" },
          { TownName: "三民區", TownID: "64000050" },
          { TownName: "新興區", TownID: "64000060" },
          { TownName: "前金區", TownID: "64000070" },
          { TownName: "苓雅區", TownID: "64000080" },
          { TownName: "前鎮區", TownID: "64000090" },
          { TownName: "旗津區", TownID: "64000100" },
          { TownName: "小港區", TownID: "64000110" },
          { TownName: "鳳山區", TownID: "64000120" },
          { TownName: "林園區", TownID: "64000130" },
          { TownName: "大寮區", TownID: "64000140" },
          { TownName: "大樹區", TownID: "64000150" },
          { TownName: "大社區", TownID: "64000160" },
          { TownName: "仁武區", TownID: "64000170" },
          { TownName: "鳥松區", TownID: "64000180" },
          { TownName: "岡山區", TownID: "64000190" },
          { TownName: "橋頭區", TownID: "64000200" },
          { TownName: "燕巢區", TownID: "64000210" },
          { TownName: "田寮區", TownID: "64000220" },
          { TownName: "阿蓮區", TownID: "64000230 " },
          { TownName: "路竹區", TownID: "64000240" },
          { TownName: "湖內區", TownID: "64000250" },
          { TownName: "茄萣區", TownID: "64000260" },
          { TownName: "永安區", TownID: "64000270" },
          { TownName: "彌陀區", TownID: "64000280" },
          { TownName: "梓官區", TownID: "64000290" },
          { TownName: "旗山區", TownID: "64000300" },
          { TownName: "美濃區", TownID: "64000310" },
          { TownName: "六龜區", TownID: "64000320" },
          { TownName: "甲仙區", TownID: "64000330" },
          { TownName: "杉林區", TownID: "64000340" },
          { TownName: "內門區", TownID: "64000350" },
          { TownName: "茂林區", TownID: "64000360" },
          { TownName: "桃源區", TownID: "64000370" },
          { TownName: "那瑪夏區", TownID: "64000380" },
        ],
        新北市: [
          { TownName: "板橋區", TownID: "65000010" },
          { TownName: "三重區", TownID: "65000020" },
          { TownName: "中和區", TownID: "65000030" },
          { TownName: "永和區", TownID: "65000040" },
          { TownName: "新莊區", TownID: "65000050" },
          { TownName: "新店區", TownID: "65000060" },
          { TownName: "樹林區", TownID: "65000070" },
          { TownName: "鶯歌區", TownID: "65000080" },
          { TownName: "三峽區", TownID: "65000090" },
          { TownName: "淡水區", TownID: "65000100" },
          { TownName: "汐止區", TownID: "65000110" },
          { TownName: "瑞芳區", TownID: "65000120" },
          { TownName: "土城區", TownID: "65000130" },
          { TownName: "蘆洲區", TownID: "65000140" },
          { TownName: "五股區", TownID: "65000150" },
          { TownName: "泰山區", TownID: "65000160" },
          { TownName: "林口區", TownID: "65000170" },
          { TownName: "深坑區", TownID: "65000180" },
          { TownName: "石碇區", TownID: "65000190" },
          { TownName: "坪林區", TownID: "65000200" },
          { TownName: "三芝區", TownID: "65000210" },
          { TownName: "石門區", TownID: "65000220" },
          { TownName: "八里區", TownID: "65000230" },
          { TownName: "平溪區", TownID: "65000240" },
          { TownName: "雙溪區", TownID: "65000250" },
          { TownName: "貢寮區", TownID: "65000260" },
          { TownName: "金山區", TownID: "65000270" },
          { TownName: "萬里區", TownID: "65000280" },
          { TownName: "烏來區", TownID: "65000290" },
        ],
        臺中市: [
          { TownName: "中區", TownID: "66000010" },
          { TownName: "東區", TownID: "66000020" },
          { TownName: "南區", TownID: "66000030" },
          { TownName: "西區", TownID: "66000040" },
          { TownName: "北區", TownID: "66000050" },
          { TownName: "西屯區", TownID: "66000060" },
          { TownName: "南屯區", TownID: "66000070" },
          { TownName: "北屯區", TownID: "66000080" },
          { TownName: "豐原區", TownID: "66000090" },
          { TownName: "東勢區", TownID: "66000100" },
          { TownName: "大甲區", TownID: "66000110" },
          { TownName: "清水區", TownID: "66000120" },
          { TownName: "沙鹿區", TownID: "66000130" },
          { TownName: "梧棲區", TownID: "66000140" },
          { TownName: "后里區", TownID: "66000150" },
          { TownName: "神岡區", TownID: "66000160" },
          { TownName: "潭子區", TownID: "66000170" },
          { TownName: "大雅區", TownID: "66000180" },
          { TownName: "新社區", TownID: "66000190" },
          { TownName: "石岡區", TownID: "66000200" },
          { TownName: "外埔區", TownID: "66000210" },
          { TownName: "大安區", TownID: "66000220" },
          { TownName: "烏日區", TownID: "66000230" },
          { TownName: "大肚區", TownID: "66000240" },
          { TownName: "龍井區", TownID: "66000250" },
          { TownName: "霧峰區", TownID: "66000260" },
          { TownName: "太平區", TownID: "66000270" },
          { TownName: "大里區", TownID: "66000280" },
          { TownName: "和平區", TownID: "66000290" },
        ],
        臺南市: [
          { TownName: "新營區", TownID: "67000010" },
          { TownName: "鹽水區", TownID: "67000020" },
          { TownName: "白河區", TownID: "67000030" },
          { TownName: "柳營區", TownID: "67000040" },
          { TownName: "後壁區", TownID: "67000050" },
          { TownName: "東山區", TownID: "67000060" },
          { TownName: "麻豆區", TownID: "67000070" },
          { TownName: "下營區", TownID: "67000080" },
          { TownName: "六甲區", TownID: "67000090" },
          { TownName: "官田區", TownID: "67000100" },
          { TownName: "大內區", TownID: "67000110" },
          { TownName: "佳里區", TownID: "67000120" },
          { TownName: "學甲區", TownID: "67000130" },
          { TownName: "西港區", TownID: "67000140" },
          { TownName: "七股區", TownID: "67000150" },
          { TownName: "將軍區", TownID: "67000160" },
          { TownName: "北門區", TownID: "67000170" },
          { TownName: "新化區", TownID: "67000180" },
          { TownName: "善化區", TownID: "67000190" },
          { TownName: "新市區", TownID: "67000200" },
          { TownName: "安定區", TownID: "67000210" },
          { TownName: "山上區", TownID: "67000220" },
          { TownName: "玉井區", TownID: "67000230" },
          { TownName: "楠西區", TownID: "67000240" },
          { TownName: "南化區", TownID: "67000250" },
          { TownName: "左鎮區", TownID: "67000260" },
          { TownName: "仁德區", TownID: "67000270" },
          { TownName: "歸仁區", TownID: "67000280" },
          { TownName: "關廟區", TownID: "67000290" },
          { TownName: "龍崎區", TownID: "67000300" },
          { TownName: "永康區", TownID: "67000310" },
          { TownName: "東區", TownID: "67000320" },
          { TownName: "南區", TownID: "67000330" },
          { TownName: "北區", TownID: "67000340" },
          { TownName: "安南區", TownID: "67000350" },
          { TownName: "安平區", TownID: "67000360" },
          { TownName: "中西區", TownID: "67000370" },
        ],
        桃園市: [
          { TownName: "桃園區", TownID: "68000010" },
          { TownName: "中壢區", TownID: "68000020" },
          { TownName: "大溪區", TownID: "68000030" },
          { TownName: "楊梅區", TownID: "68000040" },
          { TownName: "蘆竹區", TownID: "68000050" },
          { TownName: "大園區", TownID: "68000060" },
          { TownName: "龜山區", TownID: "68000070" },
          { TownName: "八德區", TownID: "68000080" },
          { TownName: "龍潭區", TownID: "68000090" },
          { TownName: "平鎮區", TownID: "68000100" },
          { TownName: "新屋區", TownID: "68000110" },
          { TownName: "觀音區", TownID: "68000120" },
          { TownName: "復興區", TownID: "68000130" },
        ],
        宜蘭縣: [
          { TownName: "宜蘭市", TownID: "10002010" },
          { TownName: "羅東鎮", TownID: "10002020" },
          { TownName: "蘇澳鎮", TownID: "10002030" },
          { TownName: "頭城鎮", TownID: "10002040" },
          { TownName: "礁溪鄉", TownID: "10002050" },
          { TownName: "壯圍鄉", TownID: "10002060" },
          { TownName: "員山鄉", TownID: "10002070" },
          { TownName: "冬山鄉", TownID: "10002080" },
          { TownName: "五結鄉", TownID: "10002090" },
          { TownName: "三星鄉", TownID: "10002100" },
          { TownName: "大同鄉", TownID: "10002110" },
          { TownName: "南澳鄉", TownID: "10002120" },
        ],
        新竹縣: [
          { TownName: "竹北市", TownID: "10004010" },
          { TownName: "竹東鎮", TownID: "10004020" },
          { TownName: "新埔鎮", TownID: "10004030" },
          { TownName: "關西鎮", TownID: "10004040" },
          { TownName: "湖口鄉", TownID: "10004050" },
          { TownName: "新豐鄉", TownID: "10004060" },
          { TownName: "芎林鄉", TownID: "10004070" },
          { TownName: "橫山鄉", TownID: "10004080" },
          { TownName: "北埔鄉", TownID: "10004090" },
          { TownName: "寶山鄉", TownID: "10004100" },
          { TownName: "峨眉鄉", TownID: "10004110" },
          { TownName: "尖石鄉", TownID: "10004120" },
          { TownName: "五峰鄉", TownID: "10004130" },
        ],
        苗栗縣: [
          { TownName: "苗栗市", TownID: "10005010" },
          { TownName: "苑裡鎮", TownID: "10005020" },
          { TownName: "通霄鎮", TownID: "10005030" },
          { TownName: "竹南鎮", TownID: "10005040" },
          { TownName: "頭份市", TownID: "10005050" },
          { TownName: "後龍鎮", TownID: "10005060" },
          { TownName: "卓蘭鎮", TownID: "10005070" },
          { TownName: "大湖鄉", TownID: "10005080" },
          { TownName: "公館鄉", TownID: "10005090" },
          { TownName: "銅鑼鄉", TownID: "10005100" },
          { TownName: "南庄鄉", TownID: "10005110" },
          { TownName: "頭屋鄉", TownID: "10005120" },
          { TownName: "三義鄉", TownID: "10005130" },
          { TownName: "西湖鄉", TownID: "10005140" },
          { TownName: "造橋鄉", TownID: "10005150" },
          { TownName: "三灣鄉", TownID: "10005160" },
          { TownName: "獅潭鄉", TownID: "10005170" },
          { TownName: "泰安鄉", TownID: "10005180" },
        ],
        彰化縣: [
          { TownName: "彰化市", TownID: "10007010" },
          { TownName: "鹿港鎮", TownID: "10007020" },
          { TownName: "和美鎮", TownID: "10007030" },
          { TownName: "線西鄉", TownID: "10007040" },
          { TownName: "伸港鄉", TownID: "10007050" },
          { TownName: "福興鄉", TownID: "10007060" },
          { TownName: "秀水鄉", TownID: "10007070" },
          { TownName: "花壇鄉", TownID: "10007080" },
          { TownName: "芬園鄉", TownID: "10007090" },
          { TownName: "員林市", TownID: "10007100" },
          { TownName: "溪湖鎮", TownID: "10007110" },
          { TownName: "田中鎮", TownID: "10007120" },
          { TownName: "大村鄉", TownID: "10007130" },
          { TownName: "埔鹽鄉", TownID: "10007140" },
          { TownName: "埔心鄉", TownID: "10007150" },
          { TownName: "永靖鄉", TownID: "10007160" },
          { TownName: "社頭鄉", TownID: "10007170" },
          { TownName: "二水鄉", TownID: "10007180" },
          { TownName: "北斗鎮", TownID: "10007190" },
          { TownName: "二林鎮", TownID: "10007200" },
          { TownName: "田尾鄉", TownID: "10007210" },
          { TownName: "埤頭鄉", TownID: "10007220" },
          { TownName: "芳苑鄉", TownID: "10007230" },
          { TownName: "大城鄉", TownID: "10007240" },
          { TownName: "竹塘鄉", TownID: "10007250" },
          { TownName: "溪州鄉", TownID: "10007260" },
        ],
        南投縣: [
          { TownName: "南投市", TownID: "10008010" },
          { TownName: "埔里鎮", TownID: "10008020" },
          { TownName: "草屯鎮", TownID: "10008030" },
          { TownName: "竹山鎮", TownID: "10008040" },
          { TownName: "集集鎮", TownID: "10008050" },
          { TownName: "名間鄉", TownID: "10008060" },
          { TownName: "鹿谷鄉", TownID: "10008070" },
          { TownName: "中寮鄉", TownID: "10008080" },
          { TownName: "魚池鄉", TownID: "10008090" },
          { TownName: "國姓鄉", TownID: "10008100" },
          { TownName: "水里鄉", TownID: "10008110" },
          { TownName: "信義鄉", TownID: "10008120" },
          { TownName: "仁愛鄉", TownID: "10008130" },
        ],
        雲林縣: [
          { TownName: "斗六市", TownID: "10009010" },
          { TownName: "斗南鎮", TownID: "10009020" },
          { TownName: "虎尾鎮", TownID: "10009030" },
          { TownName: "西螺鎮", TownID: "10009040" },
          { TownName: "土庫鎮", TownID: "10009050" },
          { TownName: "北港鎮", TownID: "10009060" },
          { TownName: "古坑鄉", TownID: "10009070" },
          { TownName: "大埤鄉", TownID: "10009080" },
          { TownName: "莿桐鄉", TownID: "10009090" },
          { TownName: "林內鄉", TownID: "10009100" },
          { TownName: "二崙鄉", TownID: "10009110" },
          { TownName: "崙背鄉", TownID: "10009120" },
          { TownName: "麥寮鄉", TownID: "10009130" },
          { TownName: "東勢鄉", TownID: "10009140" },
          { TownName: "褒忠鄉", TownID: "10009150" },
          { TownName: "臺西鄉", TownID: "10009160" },
          { TownName: "元長鄉", TownID: "10009170" },
          { TownName: "四湖鄉", TownID: "10009180" },
          { TownName: "口湖鄉", TownID: "10009190" },
          { TownName: "水林鄉", TownID: "10009200" },
        ],
        嘉義縣: [
          { TownName: "太保市", TownID: "10010010" },
          { TownName: "朴子市", TownID: "10010020" },
          { TownName: "布袋鎮", TownID: "10010030" },
          { TownName: "大林鎮", TownID: "10010040" },
          { TownName: "民雄鄉", TownID: "10010050" },
          { TownName: "溪口鄉", TownID: "10010060" },
          { TownName: "新港鄉", TownID: "10010070" },
          { TownName: "六腳鄉", TownID: "10010080" },
          { TownName: "東石鄉", TownID: "10010090" },
          { TownName: "義竹鄉", TownID: "10010100" },
          { TownName: "鹿草鄉", TownID: "10010110" },
          { TownName: "水上鄉", TownID: "10010120" },
          { TownName: "中埔鄉", TownID: "10010130" },
          { TownName: "竹崎鄉", TownID: "10010140" },
          { TownName: "梅山鄉", TownID: "10010150" },
          { TownName: "番路鄉", TownID: "10010160" },
          { TownName: "大埔鄉", TownID: "10010170" },
          { TownName: "阿里山鄉", TownID: "10010180" },
        ],
        屏東縣: [
          { TownName: "屏東市", TownID: "10013010" },
          { TownName: "潮州鎮", TownID: "10013020" },
          { TownName: "東港鎮", TownID: "10013030" },
          { TownName: "恆春鎮", TownID: "10013040" },
          { TownName: "萬丹鄉", TownID: "10013050" },
          { TownName: "長治鄉", TownID: "10013060" },
          { TownName: "麟洛鄉", TownID: "10013070" },
          { TownName: "九如鄉", TownID: "10013080" },
          { TownName: "里港鄉", TownID: "10013090" },
          { TownName: "鹽埔鄉", TownID: "10013100" },
          { TownName: "高樹鄉", TownID: "10013110" },
          { TownName: "萬巒鄉", TownID: "10013120" },
          { TownName: "內埔鄉", TownID: "10013130" },
          { TownName: "竹田鄉", TownID: "10013140" },
          { TownName: "新埤鄉", TownID: "10013150" },
          { TownName: "枋寮鄉", TownID: "10013160" },
          { TownName: "新園鄉", TownID: "10013170" },
          { TownName: "崁頂鄉", TownID: "10013180" },
          { TownName: "林邊鄉", TownID: "10013190" },
          { TownName: "南州鄉", TownID: "10013200" },
          { TownName: "佳冬鄉", TownID: "10013210" },
          { TownName: "琉球鄉", TownID: "10013220" },
          { TownName: "車城鄉", TownID: "10013230" },
          { TownName: "滿州鄉", TownID: "10013240" },
          { TownName: "枋山鄉", TownID: "10013250" },
          { TownName: "三地門鄉", TownID: "10013260" },
          { TownName: "霧臺鄉", TownID: "10013270" },
          { TownName: "瑪家鄉", TownID: "10013280" },
          { TownName: "泰武鄉", TownID: "10013290" },
          { TownName: "來義鄉", TownID: "10013300" },
          { TownName: "春日鄉", TownID: "10013310" },
          { TownName: "獅子鄉", TownID: "10013320" },
          { TownName: "牡丹鄉", TownID: "10013330" },
        ],
        臺東縣: [
          { TownName: "臺東市", TownID: "10014010" },
          { TownName: "成功鎮", TownID: "10014020" },
          { TownName: "關山鎮", TownID: "10014030" },
          { TownName: "卑南鄉", TownID: "10014040" },
          { TownName: "鹿野鄉", TownID: "10014050" },
          { TownName: "池上鄉", TownID: "10014060" },
          { TownName: "東河鄉", TownID: "10014070" },
          { TownName: "長濱鄉", TownID: "10014080" },
          { TownName: "太麻里鄉", TownID: "10014090" },
          { TownName: "大武鄉", TownID: "10014100" },
          { TownName: "綠島鄉", TownID: "10014110" },
          { TownName: "海端鄉", TownID: "10014120" },
          { TownName: "延平鄉", TownID: "10014130" },
          { TownName: "金峰鄉", TownID: "10014140" },
          { TownName: "達仁鄉", TownID: "10014150" },
          { TownName: "蘭嶼鄉", TownID: "10014160" },
        ],
        花蓮縣: [
          { TownName: "花蓮市", TownID: "10015010" },
          { TownName: "鳳林鎮", TownID: "10015020" },
          { TownName: "玉里鎮", TownID: "10015030" },
          { TownName: "新城鄉", TownID: "10015040" },
          { TownName: "吉安鄉", TownID: "10015050" },
          { TownName: "壽豐鄉", TownID: "10015060" },
          { TownName: "光復鄉", TownID: "10015070" },
          { TownName: "豐濱鄉", TownID: "10015080" },
          { TownName: "瑞穗鄉", TownID: "10015090" },
          { TownName: "富里鄉", TownID: "10015100" },
          { TownName: "秀林鄉", TownID: "10015110" },
          { TownName: "萬榮鄉", TownID: "10015120" },
          { TownName: "卓溪鄉", TownID: "10015130" },
        ],
        澎湖縣: [
          { TownName: "馬公市", TownID: "10016010" },
          { TownName: "湖西鄉", TownID: "10016020" },
          { TownName: "白沙鄉", TownID: "10016030" },
          { TownName: "西嶼鄉", TownID: "10016040" },
          { TownName: "望安鄉", TownID: "10016050" },
          { TownName: "七美鄉", TownID: "10016060" },
        ],
        基隆市: [
          { TownName: "中正區", TownID: "10017010" },
          { TownName: "七堵區", TownID: "10017020" },
          { TownName: "暖暖區", TownID: "10017030" },
          { TownName: "仁愛區", TownID: "10017040" },
          { TownName: "中山區", TownID: "10017050" },
          { TownName: "安樂區", TownID: "10017060" },
          { TownName: "信義區", TownID: "10017070" },
        ],
        新竹市: [
          { TownName: "東區", TownID: "10018010" },
          { TownName: "北區", TownID: "10018020" },
          { TownName: "香山區", TownID: "10018030" },
        ],
        嘉義市: [
          { TownName: "東區", TownID: "10020010" },
          { TownName: "西區", TownID: "10020020" },
        ],
        連江縣: [
          { TownName: "南竿鄉", TownID: "09007010" },
          { TownName: "北竿鄉", TownID: "09007020" },
          { TownName: "莒光鄉", TownID: "09007030" },
          { TownName: "東引鄉", TownID: "09007040" },
        ],
        金門縣: [
          { TownName: "金城鎮", TownID: "09020010" },
          { TownName: "金沙鎮", TownID: "09020020" },
          { TownName: "金湖鎮", TownID: "09020030" },
          { TownName: "金寧鄉", TownID: "09020040" },
          { TownName: "烈嶼鄉", TownID: "09020050" },
          { TownName: "烏坵鄉", TownID: "09020060" },
        ],
      },
      townOptions: [],
    };
  },
  methods: {
    decodeGlobalCompanyId() {
      // get CompanyId
      this.CompanyId = this.$store.getters.getGlobalCompanyId;
      this.CarParkList.CompanyId = this.CompanyId;
    },
    checkMode() {
      this.mode = this.$route.params.mode;
      if (this.mode == "edit") {
        this.CarParkID = this.$route.params.CarParkID;
        this.CarParkList.CarParkID = this.$route.params.CarParkID;
        this.getCarParkList();
        this.getParkingAreas();
      }
    },
    getCarParkList() {
      const getCarParkListAPI = `${API}/main/search/CarParkList`;
      this.$http
        .post(getCarParkListAPI, {
          CompanyId: this.CompanyId,
          CarParkID: this.CarParkID,
        })
        .then((response) => {
          this.CarParkList = response.data.data[0];
          // Process data into array format
          this.CarParkList.ParkingSiteType =
            response.data.data[0].ParkingSiteType.split(",");
          this.CarParkList.ParkingType =
            response.data.data[0].ParkingType.split(",");
          this.CarParkList.ChargeType =
            response.data.data[0].ChargeType.split(",");
          this.handleCityChange();
          this.handleTownChange();
        });
    },
    sendCarParkList() {
      if (this.mode === "create") {
        const createCarParkListAPI = `${API}/main/create/CarParkList`;
        this.$http
          .post(createCarParkListAPI, this.CarParkList)
          .then((response) => {
            if (response.data.returnCode == 0) {
              alert("路外停車場基本資料 新增成功");
              router.push(`/carparks/${this.CarParkList.CarParkID}`);
            }
          });
      } else if (this.mode === "edit") {
        const updateCarParkListAPI = `${API}/main/update/CarParkList/${this.CarParkList.id}`;
        this.$http
          .post(updateCarParkListAPI, this.CarParkList)
          .then((response) => {
            if (response.data.message == "修改成功") {
              alert("修改路外停車場基本資料 成功");
              this.getCarParkList();
              router.push(`/carparks/${this.CarParkID}`);
            }
          });
      }
    },
    getParkingAreas() {
      const getParkingAreasAPI = `${API}/main/search/ParkingArea`;
      this.$http
        .post(getParkingAreasAPI, {
          CompanyId: this.CompanyId,
          CarParkID: this.CarParkList.CarParkID,
        })
        .then((response) => {
          this.ParkingAreas = response.data.data;
          if (this.ParkingAreas.length > 0) {
            this.hasParkingAreas = "true";
            this.ParkingAreas = response.data.data.map((item) => {
              return {
                ...item,
                ParkingType: item.ParkingType.split(",").map((type) =>
                  type.trim()
                ),
              };
            });
          } else {
            this.hasParkingAreas = "false";
          }
        });
    },
    addParkingArea() {
      const newArea = {
        id: "",
        CompanyId: this.CompanyId,
        CarParkID: this.CarParkID,
        ParkingAreaID: "",
        ParkingAreaName: "",
        ParkingType: [],
      };
      this.ParkingAreas.push(newArea);
      // 找到新增的元素
      const newElement =
        this.$refs["parkingArea_" + (this.ParkingAreas.length - 1)];

      // 捲動到新增元素的位置
      if (newElement) {
        newElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    removeParkingArea(index) {
      const removeParkingAreaAPI = `${API}/main/delete/ParkingArea/${this.ParkingAreas[index].id}`;
      this.$http.post(removeParkingAreaAPI).then((response) => {
        if (response.data.returnCode == 0) {
          alert("區域資料 刪除成功");
          this.getParkingAreas();
        }
      });
    },
    sendParkingArea(index) {
      this.ParkingAreas[index].CarParkID = this.CarParkList.CarParkID;
      this.ParkingAreas[index].CompanyId = this.CompanyId;
      // createParkingArea
      if (this.ParkingAreas[index].id == "") {
        const createParkingAreaAPI = `${API}/main/create/ParkingArea`;
        this.$http
          .post(createParkingAreaAPI, this.ParkingAreas[index])
          .then((response) => {
            if (response.data.returnCode === 0) {
              alert("區域資料 新增成功");
              this.isNewArea = false;
              this.getParkingAreas();
            }
          });
      } else {
        // editParkingArea
        const editParkingAreaAPI = `${API}/main/update/ParkingArea/${this.ParkingAreas[index].id}`;
        this.$http
          .post(editParkingAreaAPI, this.ParkingAreas[index])
          .then((response) => {
            if (response.data.returnCode === 0) {
              alert("區域資料 修改成功");
              this.getParkingAreas();
            }
          });
      }
    },
    toggleAreaParkingType(ParkingArea, parkingType) {
      const typeIndex = ParkingArea.ParkingType.indexOf(parkingType);
      if (typeIndex === -1) {
        ParkingArea.ParkingType.push(parkingType);
      } else {
        ParkingArea.ParkingType.splice(typeIndex, 1);
      }
    },
    handleCityChange() {
      const selectedCity = this.cities.find(
        (item) => item.City === this.CarParkList.City
      );
      if (selectedCity) {
        const City = selectedCity.City;
        this.CarParkList.CityCode = selectedCity.CityCode;
        this.townOptions = this.towns[City];
        if (this.mode === "create") {
          // 自動選擇第一個區鄉鎮
          if (this.townOptions.length > 0) {
            this.CarParkList.TownName = this.townOptions[0].TownName;
            this.CarParkList.TownID = this.townOptions[0].TownID;
          }
        }
      }
    },
    handleTownChange() {
      this.CarParkList.TownID = this.townOptions.filter(
        (town) => town.TownName === this.CarParkList.TownName
      )[0].TownID;
    },
  },
  created() {
    this.decodeGlobalCompanyId();
    this.checkMode();
  },
};
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
