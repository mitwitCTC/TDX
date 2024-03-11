import{_,A as c,r as m,M as u,N as f,a as y,o as r,c as d,b as k,d as t,t as i,F as C,e as I,f as h,g,n as P}from"./index-89194b29.js";const D={data(){return{isLoading:!1,CompanyId:"",CarParkID:"",CarParkName:"",formTypes:[{id:"",type:"CarParkList",form:"路外停車場基本資料",hasData:!1},{id:"",type:"ParkingSpaceList",form:"路外停車場車位數資料",hasData:!1},{id:"",type:"ParkingServiceTimeList",form:"路外停車場營業時間資料",hasData:!1}],myModal:null,deleteItem:null,deleteFormAPI:""}},methods:{decodeGlobalCompanyId(){this.CompanyId=this.$store.getters.getGlobalCompanyId},getCarParkID(){this.CarParkID=this.$route.params.CarParkID},async checkPark(){this.isLoading=!0;for(const e of this.formTypes)try{const s=`${c}/main/search/${e.type}`;await this.$http.post(s,{CompanyId:this.CompanyId,CarParkID:this.CarParkID}).then(n=>{n.data.message=="查詢成功"&&n.data.data.length>0?(e.hasData=!0,this.CarParkName=n.data.data[0].Zh_tw,this.isLoading=!1,e.id=n.data.data[0].id):(e.hasData=!1,this.isLoading=!1)})}catch(s){console.error(`Error fetching data for ${e}:`,s)}},goToForm(e){e.hasData==!0?m.push(`/${e.type}/edit/${this.CarParkID}`):m.push(`/${e.type}/create/${this.CarParkID}`)},openDeleteForm(e){this.myModal=new u(document.getElementById("myModal")),this.deleteFormAPI=`${c}/main/delete/${e.type}/${e.id}`,this.deleteItem=e.form,this.myModal.show()},deleteAll(){for(const e of this.formTypes)e.hasData&&e.type!=="CarParkList"&&(this.deleteFormAPI=`${c}/main/delete/${e.type}/${e.id}`,this.$http.post(this.deleteFormAPI).then(s=>{s.data.returnCode===0&&(alert("刪除成功"),this.myModal.hide())}))},deleteItemConfirmed(){this.$http.post(this.deleteFormAPI).then(e=>{e.data.returnCode===0?(this.deleteItem==="路外停車場基本資料"?(this.deleteAll(),this.$router.push({name:"stations"})):this.checkPark(),this.myModal.hide()):console.error("Error deleting item:",e.data.errorMessage)}).catch(e=>{console.error("Error making API request:",e)})}},mounted(){this.decodeGlobalCompanyId(),this.getCarParkID(),this.checkPark()},components:{NavBar:f}},$={class:"container"},v={class:"container"},L={class:"text-center"},A={class:"table table-light table-striped text-center"},F=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"內容"),t("th",{scope:"col"},"新增 / 編輯"),t("th",{scope:"col"},"刪除")])],-1),M={key:0},N=["disabled","onClick"],x={key:1},B=t("button",{class:"btn btn-info",type:"button",disabled:""},[t("span",{class:"spinner-border spinner-border-sm",role:"status"}),h(" Loading... ")],-1),T=[B],w=["disabled","onClick"],E={class:"modal fade","data-bs-backdrop":"static",id:"myModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},V={class:"modal-dialog"},G={class:"modal-content"},S=t("div",{class:"modal-header"},[t("h5",{class:"modal-title",id:"staticBackdropLabel"}," 請確認是否刪除表單 "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),q={class:"modal-body"},z={class:"text-decoration-underline fw-bold"},Z={key:0,class:"fw-light"},j={class:"modal-footer"},H=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function J(e,s,n,K,o,l){const p=y("NavBar");return r(),d("div",$,[k(p),t("div",v,[t("h3",L,i(o.CarParkName),1),t("table",A,[F,t("tbody",null,[(r(!0),d(C,null,I(o.formTypes,a=>(r(),d("tr",{key:a.type},[t("td",null,i(a.form),1),o.isLoading?(r(),d("td",x,T)):(r(),d("td",M,[t("button",{class:P(["btn",{"btn-info":a.hasData,"btn-outline-info":!a.hasData}]),disabled:o.isLoading,onClick:b=>l.goToForm(a)},i(a.hasData?"編輯":"新增"),11,N)])),t("td",null,[t("button",{disabled:!a.hasData,class:"btn btn-outline-danger",onClick:b=>l.openDeleteForm(a)}," 刪除 ",8,w)])]))),128))])]),t("div",E,[t("div",V,[t("div",G,[S,t("div",q,[h(" 即將刪除 "),t("span",z,i(o.deleteItem),1),h(" ，請確認 "),o.deleteItem==="路外停車場基本資料"?(r(),d("p",Z," 請注意，刪除基本資料將會連動刪除本場次的所有表單資料！ ")):g("",!0)]),t("div",j,[H,t("button",{type:"button",class:"btn btn-danger",onClick:s[0]||(s[0]=a=>l.deleteItemConfirmed())}," 確認刪除 ")])])])])])])}const Q=_(D,[["render",J]]);export{Q as default};