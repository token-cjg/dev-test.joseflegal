import Vue from "vue";
import actions from "@/store/actions_types";
import mutations from "@/store/mutations_types";
import api from "@/api";

const rules = {
  namespaced: true,
  state: {
    answers: {},
    rules: {},
    ruleGroups: {},
  },
  getters: {
    getAnswers: (state) => state.answers,
    getRules: (state) => state.rules,
    getRuleGroups: (state) => state.ruleGroups,
  },
  actions: {
    [actions.FETCH_ANSWERS]({ commit }) {
      return api.answers.get().then((answers) => {
        commit(mutations.SET_ANSWERS, answers);
      });
    },
    [actions.FETCH_RULES]({ commit }) {
      return api.rules.get().then((rules) => {
        commit(mutations.SET_RULES, rules);
      });
    },
    [actions.FETCH_RULE_GROUPS]({ commit }) {
      return api.rule_groups.get().then((ruleGroups) => {
        commit(mutations.SET_RULE_GROUPS, ruleGroups);
      });
    },
  },
  mutations: {
    [mutations.SET_ANSWERS](state, answers) {
      Vue.set(state, "answers", answers);
    },
    [mutations.SET_RULES](state, rules) {
      Vue.set(state, "rules", rules);
    },
    [mutations.SET_RULE_GROUPS](state, ruleGroups) {
      Vue.set(state, "ruleGroups", ruleGroups);
    },
  },
};

export default rules;
