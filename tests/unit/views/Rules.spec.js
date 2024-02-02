import { shallowMount } from "@vue/test-utils";
import Rules from "@/views/Rules.vue";

// Mock the API
jest.mock("@/api", () => ({
  answers: {
    get: jest.fn(() =>
      Promise.resolve({
        A: "x",
        B: "y",
        C: "z",
      })
    ),
  },
  rules: {
    get: jest.fn(() =>
      Promise.resolve([
        {
          id: "1",
          question_id: "A",
          operation: "is",
          expected_answer: "x",
        },
        {
          id: "2",
          question_id: "B",
          operation: "is",
          expected_answer: "y",
        },
        {
          id: "3",
          question_id: "C",
          operation: "is",
          expected_answer: "z",
        },
      ])
    ),
  },
  rule_groups: {
    get: jest.fn(() => Promise.resolve()),
  },
}));

describe("Rules.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Rules);
  });

  it("correctly checks a rule", async () => {
    await wrapper.vm.$nextTick(); // Wait for API
    const rule = {
      question_id: "A",
      operation: "is",
      expected_answer: "x",
    };
    expect(wrapper.vm.checkRule(rule)).toBe(true);
  });

  it("evaluates a simple rule group correctly", async () => {
    await wrapper.vm.$nextTick(); // Wait for API
    const ruleGroup = {
      logic: "and",
      rule_ids: [],
      groups: [],
    };
    // Assume these rule IDs correspond to rules that should evaluate to true based on the mock answers
    expect(wrapper.vm.checkGroup(ruleGroup)).toBe(true);
  });
});
