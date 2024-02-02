import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Layout from "@/views/Layout.vue";
import FileItem from "@/components/FileItem.vue";

// Create a local Vue instance and install Vuex
const localVue = createLocalVue();
localVue.use(Vuex);

describe("Layout.vue", () => {
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    actions = {
      "files/FETCH_FILES": jest.fn(),
    };
    getters = {
      "files/getFiles": () => [
        {
          id: "1",
          description: "a fluffy kitten",
          mimetype: "image/jpeg",
          filename: "kitten.jpg",
          tags: "kitten",
          date: "2021-07-01T14:00:00.000+00:00",
          src: "http://placekitten.com/200/300",
        },
        {
          id: "2",
          description: "a tiny puppy",
          mimetype: "image/jpeg",
          filename: "puppy.jpg",
          tags: "puppy",
          date: "2021-08-01T14:00:00.000+00:00",
          src: "http://placepuppy.com/200/300",
        },
      ],
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it("fetches files on created hook and filters for kittens", async () => {
    const wrapper = shallowMount(Layout, { store, localVue });
    await wrapper.vm.$nextTick();

    // The component should only render FileItem for files tagged with "kitten"
    expect(wrapper.findAllComponents(FileItem).length).toBe(1);
    expect(actions["files/FETCH_FILES"]).toHaveBeenCalled();
  });

  it('renders a FileItem for each file with tag "kitten"', async () => {
    const wrapper = shallowMount(Layout, { store, localVue });
    await wrapper.vm.$nextTick();

    const fileItems = wrapper.findAllComponents(FileItem);
    expect(fileItems.wrappers[0].props().file).toMatchObject({
      description: "a fluffy kitten",
      tags: "kitten",
    });
  });
});
