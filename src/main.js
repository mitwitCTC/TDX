import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store/index.js';


// 引入 VeeValidate 元件跟功能
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
// 引入 VeeValidate 的驗證規則
import AllRules from '@vee-validate/rules/dist/vee-validate-rules.js';
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios)
app.use(store);
// 掛載 Global 的 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');