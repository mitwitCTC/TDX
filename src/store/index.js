import { createStore } from 'vuex';

const store = createStore({
  state: {
    formData: {}, // 在這裡保存表單數據
  },
  mutations: {
    updateFormData(state, payload) {
      state.formData = { ...state.formData, ...payload };
    },
  },
});

export default store;