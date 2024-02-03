import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Rules from "@/views/Rules.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Rules.vue", () => {
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    getters = {
      getAnswers: () => ({
        A: "x",
        B: "y",
        C: "z",
      }),
      getRules: () => ({
        1: { question_id: "A", operation: "is", expected_answer: "x" },
        2: { question_id: "B", operation: "is", expected_answer: "y" },
        3: { question_id: "C", operation: "is", expected_answer: "h" },
      }),
      getRuleGroups: () => ({
        1: {
          logic: "any",
          rule_ids: ["1", "2", "3"],
          rule_group_ids: ["2"],
        },
        2: {
          logic: "all",
          rule_ids: ["1", "2", "3"],
          rule_group_ids: [],
        },
      }), // Provide an appropriate mock return value
    };
    actions = {
      FETCH_ANSWERS: jest.fn(),
      FETCH_RULES: jest.fn(),
      FETCH_RULE_GROUPS: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        rules: {
          namespaced: true,
          getters,
          actions,
        },
      },
    });
  });

  it("dispatches actions to fetch data on created hook", () => {
    shallowMount(Rules, { store, localVue });
    expect(actions["FETCH_ANSWERS"]).toHaveBeenCalled();
    expect(actions["FETCH_RULES"]).toHaveBeenCalled();
    expect(actions["FETCH_RULE_GROUPS"]).toHaveBeenCalled();
  });

  it("correctly checks a rule based on vuex state", () => {
    const wrapper = shallowMount(Rules, { store, localVue });
    const rule = { question_id: "A", operation: "is", expected_answer: "x" };
    expect(wrapper.vm.checkRule(rule)).toBe(true);
  });

  it("evaluates a simple rule group correctly", () => {
    const wrapper = shallowMount(Rules, { store, localVue });
    const ruleGroup = {
      logic: "any",
      rule_ids: ["1", "2", "3"],
      rule_group_ids: [],
    };
    expect(wrapper.vm.checkGroup(ruleGroup)).toBe(true);
  });
});
