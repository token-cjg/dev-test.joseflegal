import Vue from "vue";
import actions from "@/store/actions_types";
import mutations from "@/store/mutations_types";
import api from "@/api";

const files = {
  namespaced: true,
  state: {
    files: [],
  },
  getters: {
    getFiles: (state) => state.files,
  },
  actions: {
    [actions.FETCH_FILES]({ commit }) {
      return api.files.get().then((res) => {
        commit(mutations.SET_FILES, res);
        return res;
      });
    },
  },
  mutations: {
    [mutations.SET_FILES](state, files) {
      Vue.set(state, "files", files);
    },
  },
};

export default files;
