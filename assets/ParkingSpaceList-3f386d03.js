import{_ as w,r as U,A as u,a as D,o as c,c as p,d as e,t as f,b as i,w as F,g as k,h,v as y,f as t,F as I,e as T,i as v}from"./index-c97f25f3.js";import{_ as d}from"./robotic-hand-dcc645d3.js";const H={data(){return{CompanyId:"",CarParkID:"",mode:"",ParkingSpace:{CityCode:"",CarParkID:"",Zh_tw:"",En:"",TotalSpaces:""},hasParkingAreas:null,ParkingAreas:[{id:"",CompanyId:"",CarParkID:"",ParkingAreaID:"",SpaceType:"",IsMechanical:"0",HasChargingPoint:"0",NumberOfSpaces:"",StayType:""}],SpaceTypes:[{SpaceType:"1",typeDesc:"Car/Automobile 自小客車位"},{SpaceType:"2",typeDesc:"Scooter/Motorcycle(機車位)"},{SpaceType:"3",typeDesc:"Heavy Motorcycle 重型機車位"},{SpaceType:"4",typeDesc:"Bicycle 腳踏車位"},{SpaceType:"5",typeDesc:"Bus & Truck Container 大型車位-大巴士/大貨車/聯結車"},{SpaceType:"6",typeDesc:"MiniBus 小型巴士位"},{SpaceType:"7",typeDesc:"PregnantAndChild 孕婦及親子專用車位"},{SpaceType:"8",typeDesc:"Lady 婦女車位"},{SpaceType:"9",typeDesc:"DisabledParkingForCar 身心障礙汽車車位"},{SpaceType:"10",typeDesc:"DisabledParkingForScooter 身心障礙機車車位"},{SpaceType:"11",typeDesc:"EVRecgargeForCar 電動汽車車位"},{SpaceType:"12",typeDesc:"EVRechargeForScooter 電動機車車位"},{SpaceType:"13",typeDesc:"RehabilitationBus 復康巴士"},{SpaceType:"14",typeDesc:"MonthlyRentForScooter 月租機車位"},{SpaceType:"15",typeDesc:"MonthlyRentForCar 月租汽車位"},{SpaceType:"16",typeDesc:"QuarterlyRentForScooter 季租機車位"},{SpaceType:"17",typeDesc:"QuarterlyRentForCar 季租汽車位"},{SpaceType:"18",typeDesc:"SemiAnnualRentForScooter 半年租機車位"},{SpaceType:"19",typeDesc:"SemiAnnualRentForCar 半年租汽車位"},{SpaceType:"20",typeDesc:"AnnualRentForScooter 年租機車位"},{SpaceType:"21",typeDesc:"AnnualRentForCar 年租汽車位"},{SpaceType:"22",typeDesc:"RentForScooter 租賃機車位"},{SpaceType:"23",typeDesc:"RentForCar 租賃汽車位"},{SpaceType:"24",typeDesc:"Load/UnloadArea 卸貨車位"},{SpaceType:"25",typeDesc:"Taxi 計程車位"},{SpaceType:"26",typeDesc:"NightSafety 夜間安心停車位"},{SpaceType:"27",typeDesc:"TemporaryParking 臨時停車"},{SpaceType:"28",typeDesc:"ReservedParking 專用停車"},{SpaceType:"29",typeDesc:"ParkingReservation 預約停車"},{SpaceType:"254",typeDesc:"Other 其他"},{SpaceType:"255",typeDesc:"Unknown 未知"}],StayTypes:[{StayType:"1",typeDesc:"KissAndRide(臨停接送)"},{StayType:"2",typeDesc:"ShortStay(短時間停車)"},{StayType:"3",typeDesc:"LongStay(長時間停車)"},{StayType:"4",typeDesc:"Unlimited(無限制停放)"},{StayType:"5",typeDesc:"Rent(租賃，包含月租、季租、年租等)"},{StayType:"254",typeDesc:"Other(其他)"},{StayType:"255",typeDesc:"Unknown(未知)"}]}},methods:{decodeGlobalCompanyId(){this.CarParkID=this.$route.params.CarParkID,this.CompanyId=this.$store.getters.getGlobalCompanyId,this.ParkingSpace.CarParkID=this.$route.params.CarParkID,this.ParkingSpace.CompanyId=this.$store.getters.getGlobalCompanyId},checkMode(){this.getCarParkNames(),this.mode=this.$route.params.mode,this.mode=="edit"&&(this.CarParkID=this.$route.params.CarParkID,this.ParkingSpace.CarParkID=this.$route.params.CarParkID,this.getParkingSpaceList(),this.getParkingAreas())},getCarParkNames(){const s=`${u}/main/search/CarParkList`;this.$http.post(s,{CompanyId:this.CompanyId,CarParkID:this.CarParkID}).then(a=>{this.ParkingSpace.Zh_tw=a.data.data[0].Zh_tw,this.ParkingSpace.En=a.data.data[0].En,this.ParkingSpace.CityCode=a.data.data[0].CityCode})},getParkingSpaceList(){const s=`${u}/main/search/ParkingSpaceList`;this.$http.post(s,{CompanyId:this.CompanyId,CarParkID:this.CarParkID}).then(a=>{this.ParkingSpace=a.data.data[0]})},sendParkingSpace(){if(this.mode==="create"){const s=`${u}/main/create/ParkingSpaceList`;this.$http.post(s,this.ParkingSpace).then(a=>{a.data.message=="新增成功"&&(alert("路外停車場車位數資料 新增成功"),U.push(`/carparks/${this.CarParkID}`))})}else if(this.mode==="edit"){const s=`${u}/main/update/ParkingSpaceList/${this.ParkingSpace.id}`;this.$http.post(s,this.ParkingSpace).then(a=>{a.data.message=="修改成功"&&(alert("路外停車場車位數資料 修改成功"),this.getParkingSpaceList(),U.push(`/carparks/${this.CarParkID}`))})}},getParkingAreas(){const s=`${u}/main/search/AreaSpace`;this.$http.post(s,{CompanyId:this.CompanyId,CarParkID:this.CarParkID}).then(a=>{a.data.message=="查詢成功"?(this.ParkingAreas=a.data.data,this.ParkingAreas.length>0?this.hasParkingAreas="true":this.hasParkingAreas="false"):console.warn(a.data.message)})},addParkingArea(){const s={id:"",ParkingAreaID:"",SpaceType:"",IsMechanical:"0",HasChargingPoint:"0",NumberOfSpaces:"",StayType:""};this.ParkingAreas.push(s)},removeParkingArea(s){const a=this.ParkingAreas[s].id,g=`${u}/main/delete/AreaSpace/${a}`;this.$http.post(g).then(x=>{x.data.returnCode==0&&(alert("區域資料 刪除成功"),this.getParkingAreas())})},sendParkingArea(s){if(this.ParkingAreas[s].CarParkID=this.ParkingSpace.CarParkID,this.ParkingAreas[s].CompanyId=this.CompanyId,this.ParkingAreas[s].id==""){const a=`${u}/main/create/AreaSpace`;this.$http.post(a,this.ParkingAreas[s]).then(g=>{g.data.returnCode===0&&(alert("區域資料 新增成功"),this.isNewArea=!1,this.getParkingAreas())})}else{const a=`${u}/main/update/AreaSpace/${this.ParkingAreas[s].id}`;this.$http.post(a,this.ParkingAreas[s]).then(g=>{g.data.returnCode===0&&(alert("區域資料 修改成功"),this.getParkingAreas())})}}},mounted(){this.decodeGlobalCompanyId(),this.checkMode()}},M={class:"container"},R={class:"pt-3 text-center"},L={class:"mb-3 d-flex flex-column"},N=e("label",{for:"CarParkID",class:"form-label"},[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 業管機關訂定之停車場代碼 "),e("span",{class:"text-danger"},"*")],-1),$=e("div",{id:"CarParkIDHelp",class:"form-text"},[e("p",null,[t(" 該停車場代表編號"),e("br"),e("span",null,[t(" ※如果為私有停車場自行提供的停車場資料，CarParkID 代碼編碼方式，建議如下："),e("br"),e("span",{class:"text-danger"},'"公司統一編號" + "-"+ {3碼流水號}'),e("br"),t(" 主要是為了避免與各業管機關上傳之停車場代碼重複。"),e("br"),t(" 例：28412550-001 ")])])],-1),E={class:"mb-3 d-flex flex-column"},O=e("label",{for:"Zh_tw",class:"form-label"},[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 停車場中文名稱 "),e("span",{class:"text-danger"},"*")],-1),Z=e("div",{id:"Zh_twHelp",class:"form-text"},[e("p",null,"範例值: 板橋大遠百購物中心停車場")],-1),q={class:"mb-3 d-flex flex-column"},B=e("label",{for:"En",class:"form-label"},[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 停車場英文名稱 (選填) ")],-1),G={class:"mb-3 d-flex flex-column"},Q=e("label",{for:"TotalSpaces",class:"form-label"},[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 停車位總數 "),e("span",{class:"text-danger"},"*")],-1),j=e("div",{id:"TotalSpacesHelp",class:"form-text"},[e("p",null,[t(" 單位:車位數"),e("br"),e("span",null,"請以半形數字填寫")])],-1),K={class:"mb-3 d-flex flex-column"},z=e("label",null,[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 是否有分停車場區域 "),e("span",{class:"text-danger"},"*")],-1),J=e("div",{id:"hasParkingAreasHelp",class:"form-text"},[e("p",null,[t(" 可包絡多筆"),e("br"),t(" 停車場區域可為平面位置上的區分多個停車場區域，亦可能是立體不同樓層的區分停車場區域 ")])],-1),W={key:0,class:"text-danger"},X={class:"d-flex"},Y={class:"ms-1"},ee={key:0,class:"ParkingAreas"},ae=e("h2",{class:"text-center"},"停車場區域資料",-1),te=e("hr",null,null,-1),se={class:"mb-3 d-flex flex-column"},ne=e("label",{for:"ParkingAreaID",class:"form-label"},[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 停車場區域代碼 "),e("span",{class:"text-danger"},"*")],-1),le=e("div",{id:"ParkingAreaIDHelp",class:"form-text"},[e("p",null,[t(" 停車場區域代碼"),e("br"),e("span",null," 停車場區域可為平面位置上的區分多個停車場區域，亦可能是立體不同樓層的區分停車場區域 ")])],-1),re={class:"mb-3 d-flex flex-column"},oe=e("label",null,[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 停車位類型 "),e("span",{class:"text-danger"},"*")],-1),ie=e("div",{id:"SpaceTypeHelp",class:"form-text"},[e("p",null,"停車位類型")],-1),ce={key:0,class:"text-danger"},pe=["value","onUpdate:modelValue"],de={class:"mb-3 d-flex flex-column"},me=e("label",null,[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 是否為機械車位 "),e("span",{class:"text-danger"},"*")],-1),ue=e("div",{id:"IsMechanicalHelp",class:"form-text"},[e("p",null,"是否為機械車位")],-1),he={key:0,class:"text-danger"},ye={class:"d-flex"},ge=["onUpdate:modelValue"],_e={class:"ms-1"},Se=["onUpdate:modelValue"],ke={class:"mb-3 d-flex flex-column"},Pe=e("label",null,[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 是否附屬充電樁 "),e("span",{class:"text-danger"},"*")],-1),fe=e("div",{id:"HasChargingPointHelp",class:"form-text"},[e("p",null,"是否附屬充電樁")],-1),be={key:0,class:"text-danger"},Ce={class:"d-flex"},De=["onUpdate:modelValue"],Ie={class:"ms-1"},Te=["onUpdate:modelValue"],ve={class:"mb-3 d-flex flex-column"},xe=e("label",{for:"ParkingAreaID",class:"form-label"},[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 本區停車位數 "),e("span",{class:"text-danger"},"*")],-1),Ae=e("div",{id:"NumberOfSpacesHelp",class:"form-text"},[e("p",null,[t(" 停車位數"),e("br"),e("span",null,[t(" 單位：車位數 "),e("br"),t(" (請以半形數字填寫) ")])])],-1),Ve={class:"mb-3 d-flex flex-column"},Ue=e("label",null,[e("img",{src:d,alt:"form-icon",class:"form-icon"}),t(" 停車停留類型 "),e("span",{class:"text-danger"},"*")],-1),Fe=e("div",{id:"StayTypeHelp",class:"form-text"},[e("p",null,"停車停留類型")],-1),we={key:0,class:"text-danger"},He=["value","onUpdate:modelValue"],Me=e("p",{class:"text-warning bg-dark"},[t(" 完成每筆區域資料後，"),e("br"),t(" 請點擊"),e("u",null,[e("b",null,"儲存區域資料")]),t("按鈕以保存 ")],-1),Re={class:"d-flex justify-content-between"},Le=["onClick"],Ne=["disabled","onClick"],$e=["disabled"];function Ee(s,a,g,x,r,P){const _=D("VField"),S=D("ErrorMessage"),A=D("VForm");return c(),p("div",M,[e("h1",R,f(r.mode=="create"?"新增":"編輯")+"路外停車場車位數資料 ",1),i(A,{onSubmit:a[8]||(a[8]=V=>P.sendParkingSpace())},{default:F(({meta:V})=>[e("div",L,[N,$,i(_,{name:"停車場代碼",id:"CarParkID",modelValue:r.ParkingSpace.CarParkID,"onUpdate:modelValue":a[0]||(a[0]=o=>r.ParkingSpace.CarParkID=o),type:"text",rules:"required",disabled:""},null,8,["modelValue"]),i(S,{class:"text-danger",name:"停車場代碼"})]),e("div",E,[O,Z,i(_,{name:"停車場中文名稱",id:"Zh_tw",modelValue:r.ParkingSpace.Zh_tw,"onUpdate:modelValue":a[1]||(a[1]=o=>r.ParkingSpace.Zh_tw=o),type:"text",rules:"required",disabled:""},null,8,["modelValue"]),i(S,{class:"text-danger",name:"停車場中文名稱"})]),e("div",q,[B,i(_,{name:"停車場英文名稱",id:"En",modelValue:r.ParkingSpace.En,"onUpdate:modelValue":a[2]||(a[2]=o=>r.ParkingSpace.En=o),type:"text",disabled:""},null,8,["modelValue"]),i(S,{class:"text-danger",name:"停車場英文名稱"})]),e("div",G,[Q,j,i(_,{name:"停車位總數",id:"TotalSpaces",modelValue:r.ParkingSpace.TotalSpaces,"onUpdate:modelValue":a[3]||(a[3]=o=>r.ParkingSpace.TotalSpaces=o),type:"number",rules:"required"},null,8,["modelValue"]),i(S,{class:"text-danger",name:"停車位總數"})]),e("div",K,[z,J,r.hasParkingAreas==null?(c(),p("div",W," 是否有分停車場區域 為必填 ")):k("",!0),e("div",X,[e("label",null,[h(e("input",{class:"me-1",type:"radio",value:"true","onUpdate:modelValue":a[4]||(a[4]=o=>r.hasParkingAreas=o)},null,512),[[y,r.hasParkingAreas]]),t(" 是 ")]),e("label",Y,[h(e("input",{class:"me-1",type:"radio",value:"false","onUpdate:modelValue":a[5]||(a[5]=o=>r.hasParkingAreas=o)},null,512),[[y,r.hasParkingAreas]]),t(" 否 ")])])]),r.hasParkingAreas=="true"?(c(),p("div",ee,[ae,i(A,{onSubmit:a[6]||(a[6]=o=>P.sendParkingArea(s.index))},{default:F(({meta:o})=>[(c(!0),p(I,null,T(r.ParkingAreas,(n,m)=>(c(),p("div",{key:m},[te,e("div",se,[ne,le,i(_,{id:"ParkingAreaID_"+m,modelValue:n.ParkingAreaID,"onUpdate:modelValue":l=>n.ParkingAreaID=l,type:"text",rules:{required:!0},name:"停車場區域代碼_"+m},null,8,["id","modelValue","onUpdate:modelValue","name"]),i(S,{name:"停車場區域代碼_"+m,class:"text-danger"},null,8,["name"])]),e("div",re,[oe,ie,n.SpaceType==""?(c(),p("div",ce," 停車位類型 為必填 ")):k("",!0),(c(!0),p(I,null,T(r.SpaceTypes,(l,b)=>(c(),p("div",{key:b},[e("label",null,[h(e("input",{class:"me-1 my-2",type:"radio",value:l.SpaceType,"onUpdate:modelValue":C=>n.SpaceType=C,rules:"required"},null,8,pe),[[y,n.SpaceType]]),t(" "+f(l.typeDesc),1)])]))),128))]),e("div",de,[me,ue,n.IsMechanical==""?(c(),p("div",he," 是否為機械車位 為必填 ")):k("",!0),e("div",ye,[e("label",null,[h(e("input",{class:"me-1",type:"radio",value:"1","onUpdate:modelValue":l=>n.IsMechanical=l},null,8,ge),[[y,n.IsMechanical]]),t(" 是 ")]),e("label",_e,[h(e("input",{class:"me-1",type:"radio",value:"0","onUpdate:modelValue":l=>n.IsMechanical=l},null,8,Se),[[y,n.IsMechanical]]),t(" 否 ")])])]),e("div",ke,[Pe,fe,n.HasChargingPoint==""?(c(),p("div",be," 是否附屬充電樁 為必填 ")):k("",!0),e("div",Ce,[e("label",null,[h(e("input",{class:"me-1",type:"radio",value:"1","onUpdate:modelValue":l=>n.HasChargingPoint=l},null,8,De),[[y,n.HasChargingPoint]]),t(" 是 ")]),e("label",Ie,[h(e("input",{class:"me-1",type:"radio",value:"0","onUpdate:modelValue":l=>n.HasChargingPoint=l},null,8,Te),[[y,n.HasChargingPoint]]),t(" 否 ")])])]),e("div",ve,[xe,Ae,i(_,{id:"NumberOfSpaces_"+m,modelValue:n.NumberOfSpaces,"onUpdate:modelValue":l=>n.NumberOfSpaces=l,type:"text",rules:{required:!0},name:"本區停車位數_"+m},null,8,["id","modelValue","onUpdate:modelValue","name"]),i(S,{name:"本區停車位數_"+m,class:"text-danger"},null,8,["name"])]),e("div",Ve,[Ue,Fe,n.StayType==""?(c(),p("div",we," 停車停留類型 為必填 ")):k("",!0),(c(!0),p(I,null,T(r.StayTypes,(l,b)=>(c(),p("label",{key:b},[h(e("input",{class:"me-1",type:"radio",value:l.StayType,"onUpdate:modelValue":C=>n.StayType=C,rules:"required"},null,8,He),[[y,n.StayType]]),t(" "+f(l.typeDesc),1)]))),128))]),Me,e("div",Re,[e("button",{class:"btn btn-outline-danger",onClick:v(l=>P.removeParkingArea(m),["prevent"])}," 移除第 "+f(m+1)+" 筆資料 ",9,Le),e("button",{disabled:!o.valid,class:"btn btn-primary",onClick:v(l=>P.sendParkingArea(m),["prevent"])}," 儲存區域資料 ",8,Ne)])]))),128))]),_:2},1024),e("button",{class:"btn btn-outline-primary mt-2",onClick:a[7]||(a[7]=v(o=>P.addParkingArea(),["prevent"]))}," 加入停車場區域資料 ")])):k("",!0),e("button",{class:"btn btn-primary my-2",type:"submit",disabled:!V.valid}," 儲存 ",8,$e)]),_:1})])}const qe=w(H,[["render",Ee]]);export{qe as default};
