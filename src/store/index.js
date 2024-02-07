import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
const ls = new SecureLS({
  isCompression: false, // 關閉壓縮
  encryptionSecret: 'your-secret-key', // 替換為你的密鑰
  encryptionNamespace: 'c' // 替換為你的命名空間
});

export default createStore({
  state: {
    GlobalCompanyId: null
  },
  mutations: {
    setGlobalCompanyId(state, GlobalCompanyId) {
      state.GlobalCompanyId = GlobalCompanyId;
    },
    clearGlobalCompanyId(state) {
      state.GlobalCompanyId = null;
    }
  },
  getters: {
    getGlobalCompanyId: state => state.GlobalCompanyId
  },
  plugins: [
    createPersistedState({
      // 將指定的 state 屬性持久化到 localStorage，並使用 secure-ls 進行加密
      paths: ['GlobalCompanyId'],
      // 使用 secure-ls 替換 localStorage
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
});